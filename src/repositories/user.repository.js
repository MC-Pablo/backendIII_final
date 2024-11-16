import { UserDTO } from "../dtos/user.dto.js";
import FactoryDAO from "../daos/factory.dao.js";
import { isValidPassword } from "../utils/security.js";
import {
  NOT_FOUND_CREDENTIALS,
  NOT_FOUND_ID,
} from "../constants/messages.constant.js";

export default class UserRepository {
  #userDAO;
  #userDTO;
  constructor() {
    const factory = new FactoryDAO();
    this.#userDAO = factory.userDAO();
    this.#userDTO = new UserDTO();
  }

  async getAll(params) {
    params.populate = "pets";

    const $and = [];

    if (params?.name) {
      $and.push({ name: { $regex: params.name, $options: "i" } });
    }
    if (params?.surname) {
      $and.push({ surmane: { $regex: params.surname, $options: "i" } });
    }
    if (params?.roles) {
      $and.push({ roles: { $in: [...params.roles] } });
    }

    const filters = $and.length > 0 ? { $and } : {};

    const users = await this.#userDAO.getAll(filters, params);
  
    const formatedUsers = users?.docs?.map((user) => this.#userDTO.model(user));

    users.docs = formatedUsers;
    return users;
  }
  async getOneById(id) {
    const user = await this.#userDAO.getOneById(id, "pets");
    if (!user) throw new Error(NOT_FOUND_ID);
    return this.#userDTO.model(user);
  }
  async findOneByEmailAndPassword(email, password) {
    const user = await this.#userDAO.findOneByCriteria({ email });
    if (!user) {
      throw new Error(NOT_FOUND_CREDENTIALS);
    }
    const hash = user.password;
    if (!isValidPassword(password, hash)) {
      throw new Error(NOT_FOUND_CREDENTIALS);
    }
    return this.#userDTO.model(user);
  }

  async insertMany(data) {
    const users = await this.#userDAO.insertMany(data);
    const response = users.map((u) => this.#userDTO.model(u));
    return response;
  }

  async save(data) {
   
    const formatedData = this.#userDTO.data(data);

    const user = await this.#userDAO.save(formatedData);
    

    return this.#userDTO.model(user);
  }

  async deleteOneById(id) {
    const user = await this.getOneById(id);
    if (!user) throw new Error(NOT_FOUND_ID);
    await this.#userDAO.deleteOneById(id);
    return this.#userDTO.model(user);
  }

  async deleteManyById(data) {
    return await this.#userDAO.deleteManyById(data);
  }
}
