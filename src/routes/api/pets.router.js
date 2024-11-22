import { Router } from "express";
import uploader from "../../utils/uploader.js";
import PetController from "../../controllers/pets.controller.js";

const petsController = new PetController();
const petsRouter = Router();

console.log("PetController instance in routes:", petsController);

petsRouter.get("/",  (req, res, next) => {
    console.log("Route hit: GET /pets");
    next();
  }, petsController.getAllPets);



petsRouter.get("/", petsController.getOneById);
petsRouter.post("/", petsController.createPet);
petsRouter.post("/withimage", uploader.single("image"), petsController.createPetWithImage);
petsRouter.put("/update/:pid", petsController.updateOneById);
petsRouter.delete("/:pid", petsController.deleteOneById);

export default petsRouter;
