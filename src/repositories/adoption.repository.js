import { AdoptionDTO } from "../dtos/adoption.dto.js";
import FactoryDAO from "../daos/factory.dao.js";
import { NOT_FOUND_ID } from "../constants/messages.constant.js";

export default class AdoptionRepository {
  #adoptionDAO;
  #adoptionDTO;
  #userDAO;
  #petDAO;
  constructor() {
    const factory = new FactoryDAO();
    this.#adoptionDAO = factory.adoptionDAO();
    this.#adoptionDTO = new AdoptionDTO();
    this.#petDAO = factory.petDAO();
    this.#userDAO = factory.userDAO();
  }

  async getAll(params) {
    params.populate = ["ownerDetails", "petDetails"];

    const $and = [];

    if (params?.owner) {
      $and.push({ owner: { $eq: params.oid } });
    }
    if (params?.pet) {
      $and.push({ pet: { $eq: params.pid } });
    }
    const filters = $and.length > 0 ? { $and } : {};
    const adoptions = await this.#adoptionDAO.getAll(filters, params);
    const formatedDocs = adoptions?.docs?.map((adoption) => {
      return this.#adoptionDTO.model(adoption);
    });

    adoptions.docs = formatedDocs;
    return adoptions;
  }

  async getOneById(id) {
    const adoption = await this.#adoptionDAO.getOneById(id, [
      "ownerDetails",
      "petDetails",
    ]);
    return this.#adoptionDTO.model(adoption);
  }

  async createAdoption(data) {
    const formatedData = this.#adoptionDTO.data(data);
    const adoption = await this.#adoptionDAO.save(formatedData);
    const userData = { id: adoption.owner, pid: adoption.pet };
    const petData = { id: adoption.pet, oid: adoption.owner };
    await this.#userDAO.updateField(userData, "pets", "add");
    await this.#petDAO.updateField(petData, "owner", "add");
    return adoption;
  }

  async save(data) {
    const formatedData = this.#adoptionDTO.data(data);
    const adoption = await this.#adoptionDAO.save(formatedData);
    return adoption;
  }

  async deleteOneById(id) {
    const adoption = await this.#adoptionDAO.getOneById(id, [
      "ownerDetails",
      "petDetails",
    ]);
    if (!adoption) throw new Error(NOT_FOUND_ID);
    const userData = { id: adoption.owner, pid: adoption.pet };
    const petData = { id: adoption.pet, oid: adoption.owner };
    const currentUser = await this.#userDAO.updateField(
      userData,
      "pets",
      "remove"
    );
    const currentPet = await this.#petDAO.updateField(
      petData,
      "owner",
      "remove"
    );
    await this.#adoptionDAO.deleteOneById(id);
    return this.#adoptionDTO.model(adoption);
  }
}
