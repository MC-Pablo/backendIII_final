import {PetDTO} from "../dtos/pet.dto.js";
import __dirname from "../utils/index.js";
import PetServices from "../services/pet.services.js";


export default class PetController{
  petService
  constructor(){
    console.log(this.petService)
      this.petService = new PetServices();
  }

  async getAll(req,res, next){
      try {
          const pets = await this.petService.getAll(req.params)
          res.status(200).send ({status: "success", payload: pets})
      } catch (error) {
          next (error)
      }
  };

  async createPet(req,res, next){
      try {
          const pet = await this.petService.createPet(req.body)
          res.status(201).send ({status: "success", payload: pet, message: "Pet created"})
        } catch (error) {
            next (error)
        }
  };

  async getOneById(req,res,next){
      try {
          const petId = req.params.pid;
          const pet = await this.petService.findOneById(petId);
          res.status(200).send ({status: "success", payload: pet})
        } catch (error) {
            next (error)
        }
  }

  async updateOneById(req,res, next){
      try {
          const petId = req.params.pid;
          const pet = await this.petService.updateOneById(petId);
          res.status(201).send ({status: "success", payload: pet})
        } catch (error) {
            next (error)
        }

  };

  async deleteOneById(req,res,next){
      try {
          const petId = req.params.pid;
          const response = await this.petService.deleteOneById(petId);
          res.sendSuccess200(response)
          res.status(200).send ({status: "success", payload: response})
        } catch (error) {
            next (error)
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
      const result = await this.petService.createPet(pet);
      res.status(201).send({ status: "success", payload: result });
    } catch (error) {
      next(error);
    }
  };
}
