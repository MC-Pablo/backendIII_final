import { Router } from "express";
import { generateUsersMock } from "../mocks/user.mock.js";
import UserServices from "../services/user.services.js";
import PetServices from "../services/pet.services.js";
import { generatePetsMock } from "../mocks/pet.mock.js";

const userServices = new UserServices();
const usersMocksRouter = Router();

usersMocksRouter.post("/mockingusers", async (req, res, next) => {
  try {
    const users = await generateUsersMock(5);
    const response = await userServices.insertMany(users)

    res.status(201).json({ status: "ok", payload: response });
  } catch (error) {
    error.path = "[GET] api/mocks/mockingusers";
    next(error);
  }
});

export default usersMocksRouter;

const petServices = new PetServices();
const petsMocksRouter = Router();

petsMocksRouter.post("/mockingpets", async (req, res, next) => {
  try {
    const pets = await generatePetsMock(5);
    const response = await petServices.insertMany(pets);
    res.status(201).json({ status: "ok", payload: response });
  } catch (error) {
    next(error);
  }
});
