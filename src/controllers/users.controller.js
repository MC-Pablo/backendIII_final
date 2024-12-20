import UserService from "../services/user.services.js";
import { generateUsersMock } from "../mocks/user.mock.js";

export default class UserControllers {
  #userService;
  constructor() {
    this.#userService = new UserService();
  }

  createUserMock = async (req, res, next) => {
    try {
      const manyUsers = await generateUsersMock(5);
      const mocksUsers = await this.#userService.insertMany(manyUsers);
      res.status(201).send({ status: "success", payload: mocksUsers });
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.#userService.getAll(req.params);
      res.status(200).send({ status: "success", payload: users });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req, res) => {
    try {
      const userId = req.params.uid;
      const user = await this.#userService.findOneById(userId);

      res.status(200).send({ status: "success", payload: user });
    } catch (error) {
      res.status(404).send({ status: "id not found" });
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const updateBody = req.body;
      const userId = req.params.uid;
      const user = await this.#userService.findOneById(userId);
      if (!user)
        return res
          .status(404)
          .send({ status: "error", error: "User not found" });

      const result = await this.#userService.updateOneById(userId, updateBody);
      res.send({ status: "success", payload: result, message: "User updated" });
    } catch (error) {
      next(error);
    }
  };
  deleteUser = async (req, res, next) => {
    try {
      const userId = req.params.uid;
      const result = await this.#userService.deleteOneById(userId);
      res
        .status(200)
        .send({ status: "success", payload: result, message: "User deleted" });
    } catch (error) {
      next(error);
    }
  };
  createUser = async (req, res, next) => {
    try {
      const user = await this.#userService.createUser(req.body);
      if (!user) throw new Error("Faltan datos");
      res
        .status(201)
        .send({ status: "success", payload: user, message: "User created" });
    } catch (error) {
      next(error);
    }
  };
}
