import { Router } from "express";
import  UserControllers from "../../controllers/users.controller.js";

const usersController = new UserControllers();
const usersRouter = Router();

usersRouter.get("/", usersController.getAllUsers);
usersRouter.post("/mock", usersController.createUserMock);
usersRouter.post ("/", usersController.createUser);
usersRouter.get("/:uid", usersController.getUserById);
usersRouter.put("/update/:uid", usersController.updateUser);
usersRouter.delete("/:uid", usersController.deleteUser);

export default usersRouter;