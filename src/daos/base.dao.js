import { NOT_FOUND } from "../constants/messages.constant.js";

export default class BaseDAO {
  #model;

  constructor(model, paramField) {
    this.#model = model;
    const field = paramField ?? null;
  }

  async getAll(filters, params, field) {
    const sort = {
      asc: field ? { field: 1 } : { name: 1 },
      desc: field ? { field: -1 } : { name: -1 },
    };
    const options = {
      limit: params?.limit ?? 100,
      page: params?.page ?? 1,
      sort: sort[params?.sort] ?? {},
      populate: params?.populate ?? "",
      lean: true,
    };
    return await this.#model.paginate(filters, options);
  }

  async insertMany(data) {
    const response = this.#model.insertMany(data);
    return response;
  }

  async getOneById(id, populateField) {
    if (populateField) {
      const response = await this.#model.findById(id).populate(populateField);
      return response;
    } else {
      return await this.#model.findById(id);
    }
  }

  async findOneByCriteria(criteria) {
    return await this.#model.find(criteria);
  }

  async findByCriteria(criteria) {
    return await this.#model.find(criteria);
  }

  async save(data) {
    let object;
    if (data.id) {
      object = await this.#model.findById(data.id);
      if (object) {
        Object.keys(data).forEach((key) => {
          if (data[key] !== undefined && data[key] !== null) {
            object[key] = data[key];
          }
        });
      }
    } else {
      const newObject = {};
      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) {
          newObject[key] = data[key];
        }
      });
      object = new this.#model(newObject);
    }

    return object.save();
  }

  async deleteOneById(id) {
    return await this.#model.deleteOne({ _id: id });
  }

  async deleteManyById(data) {
    const response = await this.#model.deleteMany({ _id: { $in: data } });
    return {
      message: "Documentos eliminados con éxito",
      deletedCount: response.deletedCount,
    };
  }

  async updateField(data, field, op) {
    const object = await this.getOneById(data.id, field);
    if (!object) {
      throw new Error(NOT_FOUND);
    }

    const key = `${field}-${op}`;

    switch (key) {
      case "pets-add":
        object.pets.push(data.pid);
        return await object.save();
      case "pets-remove":
        object.pets = object.pets.filter((p) => p.id.toString() != data.pid);
        return await object.save();
      case "owner-add":
        object.owner = data.oid;
        object.adopted = true;
        return await object.save();
      case "owner-remove":
        object.owner = null;
        object.adopted = false;
        return await object.save();
      default:
        throw new Error("Operación no soportada");
    }
  }
}
