import { Router } from "express";
import { generateUsersMock } from "../mocks/user.mock.js";
import UserServices from "../services/user.services.js";
import { PetServices } from "../services/pet.services.js";
import { generatePetsMock } from "../mocks/pet.mock.js";

const userServices = new UserServices();
const usersMocksRouter = Router();

usersMocksRouter.get("/mockingusers", async (req, res, next) => {
  try {
    const users = generateUsersMock(50);
    const response = await userServices.createMany(users);

    res.status(201).json({ status: "ok", payload: response });
  } catch (error) {
    error.path = "[GET] api/mocks/mockingusers";
    next(error);
  }
});

export default usersMocksRouter;

const petServices = new PetServices();
const petsMocksRouter = Router();

petsMocksRouter.get("/mockingpets", async (req, res, next) => {
  try {
    const pets = generatePetsMock(50);
    const response = await petServices.createMany(pets);
    res.status(201).json({ status: "ok", payload: response });
  } catch (error) {
    next(error);
  }
});
