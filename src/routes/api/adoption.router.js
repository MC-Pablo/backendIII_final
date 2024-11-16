import { Router } from "express";
import AdoptionController from "../../controllers/adoption.controller.js";



const adoptionRouter = Router ();
const adoptionController = new AdoptionController();

adoptionRouter.get ("/", adoptionController.getAll);
adoptionRouter.get("/:aid", adoptionController.getOneById);
adoptionRouter.post("/",adoptionController.createAdoption);
adoptionRouter.delete ("/:aid", adoptionController.deleteOneById);

export default adoptionRouter;




