import { PetDTO } from "../dtos/pet.dto.js";
import __dirname from "../utils/index.js";
import { PetServices } from "../services/pet.services.js";

export default class PetController {
  petServices;
  constructor() {
    console.log("Controller: Instantiating PetController");
    this.petServices = new PetServices();
    console.log("Controller: PetServices instantiated:", this.petServices); 
  }

  async getAllPets(req, res, next) {
   
    console.log("Controller: Entering getAll method in PetController");
    console.log("Controller: Calling PetServices.getAll with params:", req.params);
    try {
      const pets = await this.petServices.getAll(req.params);
      console.log("Controller: Pets fetched from service:", pets);
      res.status(200).send({ status: "success", payload: pets });
     
    } catch (error) {
      console.error("Controller: Error in getAll method", error);
      next(error);
    }
  }

  async createPet(req, res, next) {
    try {
      const pet = await this.petServices.createPet(req.body);
      res
        .status(201)
        .send({ status: "success", payload: pet, message: "Pet created" });
    } catch (error) {
      next(error);
    }
  }

  async getOneById(req, res, next) {
    try {
      const petId = req.params.pid;
      const pet = await this.petServices.findOneById(petId);
      res.status(200).send({ status: "success", payload: pet });
    } catch (error) {
      next(error);
    }
  }

  async updateOneById(req, res, next) {
    try {
      const petId = req.params.pid;
      const pet = await this.petServices.updateOneById(petId);
      res.status(201).send({ status: "success", payload: pet });
    } catch (error) {
      next(error);
    }
  }

  async deleteOneById(req, res, next) {
    try {
      const petId = req.params.pid;
      const response = await this.petServices.deleteOneById(petId);
      res.sendSuccess200(response);
      res.status(200).send({ status: "success", payload: response });
    } catch (error) {
      next(error);
    }
  }

  createPetWithImage = async (req, res, next) => {
    try {
      const file = req.file;
      const { name, specie, birthDate } = req.body;
      if (!name || !specie || !birthDate)
        return res
          .status(400)
          .send({ status: "error", error: "Incomplete values" });
      console.log(file);
      const pet = PetDTO.getPetInputFrom({
        name,
        specie,
        birthDate,
        image: `${__dirname}/../public/img/${file.filename}`,
      });
      console.log(pet);
      const result = await this.petServices.createPet(pet);
      res.status(201).send({ status: "success", payload: result });
    } catch (error) {
      next(error);
    }
  };
}
