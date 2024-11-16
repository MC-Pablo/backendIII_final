import { toBoolean } from "../utils/toBoolean.js";
import PetDTO from "../dtos/pet.dto.js";
import FactoryDAO from "../daos/factory.dao.js";
import { NOT_FOUND_ID } from "../constants/messages.constant.js";

export default class PetRepository {
  #petDAO;
  #petDTO;
  constructor() {
    const factory = new FactoryDAO();
    this.#petDAO = factory.petDAO();
    this.#petDTO = new PetDTO();
  }

  async getAll(params) {
    params.populate = "owner";

    const $and = [];

    if (params?.name) {
      $and.push({ name: { $regex: params.name, $options: "i" } });
    }

    if (params?.adopted) {
      const value = toBoolean(params.adopted);
      $and.push({ adopted: { $eq: value } });
    }

    const filters = $and.length > 0 ? { $and } : {};
    const pets = await this.#petDAO.getAll(filters, params);
    const formatedPets = pets?.docs?.map((pet) => this.#petDTO.model(pet));
    pets.docs = formatedPets;
    return pets;
  }

  async getOneById(id) {
    const pet = await this.#petDAO.getOneById(id, "owner");
    if (!pet) throw new Error(NOT_FOUND_ID);
    const formatedPet = this.#petDTO.model(pet);

    return this.#petDTO.model(formatedPet);
  }

  async save(data) {
    const formatedData = this.#petDTO.data(data);
    const pet = await this.#petDAO.save(formatedData);
    const formatedPet = this.#petDTO.model(pet);

    return formatedPet;
  }

  async insertMany(data) {
    const pets = await this.#petDAO.insertMany(data);
    const response = pets.map((p) => this.#petDTO.model(p));
    return response;
  }

  async deleteOneById(id) {
    const pet = await this.getOneById(id);
    if (!pet) throw new Error(NOT_FOUND_ID);
    await this.#petDAO.deleteOneById(id);
    const formatedPet = this.#petDTO.model(pet);
    return formatedPet;
  }

  async deleteManyById(data) {
    return await this.#petDAO.deleteManyById(data);
  }
}
