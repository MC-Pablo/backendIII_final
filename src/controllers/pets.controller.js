import { PetDTO } from "../dtos/pet.dto.js";
import __dirname from "../utils/index.js";
import PetServices from "../services/pet.services.js";

export default class PetController {
  #petServices;
  constructor() {
   
    this.#petServices = new PetServices();
    this.getAllPets = this.getAllPets.bind(this); this.createPet = this.createPet.bind(this); this.getOneById = this.getOneById.bind(this); this.updateOneById = this.updateOneById.bind(this); this.deleteOneById = this.deleteOneById.bind(this); this.createPetWithImage = this.createPetWithImage.bind(this)
    
  }

  async getAllPets(req, res, next) {
  
    try {
      const pets = await this.#petServices.getAll(req.params);
     
     
      res.status(200).send({ status: "success", payload: pets });
     
    } catch (error) {
  
      next(error);
    }
  }

  async createPet(req, res, next) {
    try {
      const pet = await this.#petServices.createPet(req.body);
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
      const pet = await this.#petServices.findOneById(petId);
      res.status(200).send({ status: "success", payload: pet });
    } catch (error) {
      next(error);
    }
  }

  async updateOneById(req, res, next) {
    try {
      const petId = req.params.pid;
      const pet = await this.#petServices.updateOneById(petId, req.body);
      res.status(201).send({ status: "success", payload: pet });
    } catch (error) {
      next(error);
    }
  }

  async deleteOneById(req, res, next) {
    try {
      const petId = req.params.pid;
      const response = await this.#petServices.deleteOneById(petId);
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
     
      const pet = PetDTO.getPetInputFrom({
        name,
        specie,
        birthDate,
        image: `${__dirname}/../public/img/${file.filename}`,
      });
      
      const result = await this.#petServices.createPet(pet);
      res.status(201).send({ status: "success", payload: result });
    } catch (error) {
      next(error);
    }
  };
}
