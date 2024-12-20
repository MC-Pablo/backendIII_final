import { createHash, isValidPassword } from "../utils/security.js";
import jwt from "jsonwebtoken";
import { UserDTO } from "../dtos/user.dto.js";
import UserServices from "../services/user.services.js";

export default class SessionsController {
  constructor() {
    this.userServices = new UserServices();
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.unprotectedCurrent = this.unprotectedCurrent.bind(this);
    this.unprotectedLogin = this.unprotectedLogin.bind(this);
    
  }

  register = async (req, res, next) => {
    try {
      
      const { name, surname, email, password } = req.body;
      
      if (!name || !surname || !email || !password)
        return res
          .status(400)
          .send({ status: "error", error: "Incomplete values" });
      
      const hashedPassword = await createHash(password);
      const user = {
        name,
        surname,
        email,
        password: hashedPassword,
      };
     
      let result = await this.userServices.createUser(user);
      res.send({ status: "success", payload: result });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res
          .status(400)
          .send({ status: "error", error: "Incomplete values" });
      const user = await this.userServices.findOneByEmailAndPassword(
        email,
        password
      );
      if (!user)
        return res
          .status(404)
          .send({ status: "error", error: "User doesn't exist" });
      const validPassword = await isValidPassword(user, password);
      if (!validPassword)
        return res
          .status(400)
          .send({ status: "error", error: "Incorrect password" });
      const userDto = UserDTO.getUserTokenFrom(user);
      const token = jwt.sign(userDto, "tokenSecretJWT", { expiresIn: "1h" });
      res
        .cookie("coderCookie", token, { maxAge: 3600000 })
        .send({ status: "success", message: "Logged in" });
    } catch (error) {
      next(error);
    }
  };

  current = async (req, res, next) => {
    try {
      const cookie = req.cookies["coderCookie"];
      const user = jwt.verify(cookie, "tokenSecretJWT");
      if (user) return res.send({ status: "success", payload: user });
    } catch (error) {
      next(error);
    }
  };

  unprotectedLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res
          .status(400)
          .send({ status: "error", error: "Incomplete values" });
      const user = await this.userServices.findOneByEmailAndPassword(email);
      if (!user)
        return res
          .status(404)
          .send({ status: "error", error: "User doesn't exist" });
      const validPassword = await isValidPassword(user, password);
      if (validPassword)
        return res
          .status(400)
          .send({ status: "error", error: "Incorrect password" });
      const token = jwt.sign(user, "tokenSecretJWT", { expiresIn: "1h" });
      res
        .cookie("unprotectedCookie", token, { maxAge: 3600000 })
        .send({ status: "success", message: "Unprotected Logged in" });
    } catch (error) {
      next(error);
    }
  };

  unprotectedCurrent = async (req, res, next) => {
    try {
      const cookie = req.cookies["unprotectedCookie"];
      const user = jwt.verify(cookie, "tokenSecretJWT");
      if (user) return res.send({ status: "success", payload: user });
    } catch (error) {
      next(error);
    }
  };
}