import { Router } from "express";
import uploader from "../../utils/uploader.js";
import PetController from "../../controllers/pets.controller.js";

const petsController = new PetController();
const petsRouter = Router();



petsRouter.get("/", petsController.getAllPets);



petsRouter.get("/:pid", petsController.getOneById);
petsRouter.post ("/mocks", petsController.createPetMock);
petsRouter.post("/", petsController.createPet);
petsRouter.post("/withimage", uploader.single("image"), petsController.createPetWithImage);
petsRouter.put("/update/:pid", petsController.updateOneById);
petsRouter.delete("/:pid", petsController.deleteOneById);

export default petsRouter;
