import AdoptionService from "../services/adoption.services.js";

export default class AdoptionController {
  #adoptionService;
  constructor() {
    this.#adoptionService = new AdoptionService();

    this.getAll = this.getAll.bind(this);
    this.getOneById = this.getOneById.bind(this);
    this.createAdoption = this.createAdoption.bind(this);
    this.deleteOneById = this.deleteOneById.bind(this);
  }

  async getAll(req, res, next) {
    try {
      const adoptions = await this.#adoptionService.getAll(req.params);
      res.status(200).send({ status: "success", payload: adoptions });
    } catch (error) {
      next(error);
    }
  }
  async getOneById(req, res,next) {
    try {
      const id  = req.params.aid
      const response = await this.#adoptionService.findOneById(id);
      res.status(200).send({ status: "success", payload: response });
    } catch (error) {
      next(error);
    }
  }
  async createAdoption(req, res,next) {
    try {
   
      const response = await this.#adoptionService.createAdoption(req.body);

      res.status(201).send({
        status: "success",
        payload: response,
        message: "Adopcion creada",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteOneById(req, res,next) {
    try {
      const  id  = req.params.aid;
      const response = await this.#adoptionService.deleteOneById(id);

      res.status(200).send({
        status: "success",
        payload: response,
        message: "Adopcion eliminada",
      });
    } catch (error) {
      next(error);
    }
  }
}
