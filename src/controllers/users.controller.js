import UserServices from "../services/user.services.js";

export default class UserControllers {
  constructor() {
    this.userServices = new UserServices();
  }

  createUserMock = async (req, res) => {
    const users = await this.userServices.createMocks();

    res.status(201).json({ status: "ok", users });
  };

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userServices.getAll(req.params);
      res.send({ status: "success", payload: users });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const userId = req.params.uid;

      const user = await this.userServices.findOneById(userId);

      res.send({ status: "success", payload: user });
    } catch (error) {
      console.log(`Error: ${error.message}`);
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const updateBody = req.body;
      const userId = req.params.uid;
      const user = await this.userServices.findOneById(userId);
      if (!user)
        return res
          .status(404)
          .send({ status: "error", error: "User not found" });

      const result = await this.userServices.updateOneById(userId, updateBody);
      res.send({ status: "success", message: "User updated" });
    } catch (error) {
      next(error);
    }
  };
  deleteUser = async (req, res) => {
    const userId = req.params.uid;
    const result = await this.userServices.remove(userId);
    res.send({ status: "success", message: "User deleted" });
  };

  createUser = async (req, res, next) => {
    try {
      const newUser = req.body;
      const user = await this.userServices.createUser(req.body);
      if (!user) throw new Error("Faltan datos");
      res.send({ status: "success", message: "User created" });
    } catch (error) {
      next(error);
    }
  };
}
