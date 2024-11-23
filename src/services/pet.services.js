import PetRepository from "../repositories/pet.repository.js";
import { NOT_FOUND_ID } from "../constants/messages.constant.js";

export default class PetServices {
  #petRepository;
  constructor() {
    this.#petRepository = new PetRepository();
    
  }

  async getAll(params) {
    const pet = await this.#petRepository.getAll(params);
 
    return pet
  }

  async findOneById(id) {
    const pet = await this.#petRepository.getOneById(id);
    if (!pet) {
      throw new Error(NOT_FOUND_ID);
    }
    return pet;
  }

  async createPet(data) {
    return await this.#petRepository.save(data);
  }

  async updateOneById(id, data) {
  
    const pet = await this.#petRepository.getOneById(id);
    const updatedValues = { ...pet, ...data };
  
    const petUpdated = await this.#petRepository.save(updatedValues);

    return petUpdated
  }

  async deleteOneById(id) {
    return await this.#petRepository.deleteOneById(id);
  }

}
