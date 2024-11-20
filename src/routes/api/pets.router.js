import { Router } from "express";
import  PetController  from "../../controllers/pets.controller.js"
import uploader from "../../utils/uploader.js";

const petsController = new PetController();
const petsRouter = Router();

petsRouter.get("/", petsController.getAll);
petsRouter.get("/pid", petsController.getOneById);
petsRouter.post("/", petsController.createPet);
petsRouter.post("/withimage", uploader.single("image"), petsController.createPetWithImage);
petsRouter.put("/:pid", petsController.updateOneById);
petsRouter.delete("/:pid", petsController.deleteOneById);

export default petsRouter;
