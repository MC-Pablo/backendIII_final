import moment from "moment";
import { UserDTO } from "./user.dto.js";
import { PetDTO } from "./pet.dto.js";
import { BAD_REQUEST } from "../constants/messages.constant.js";

export class AdoptionDTO {
  #userDTO;
  #petDTO;
  constructor() {
    this.#userDTO = new UserDTO();
    this.#petDTO = new PetDTO();
  }
  model(adoption) {
    const formatedAdoption = {
      id: adoption.id || adoption._id.toString(),
      owner: this.#userDTO.adoption(adoption.ownerDetails),
      pet: this.#petDTO.adoption(adoption.petDetails),
      adoptionDate: moment(adoption.createdAt).format("DD-MM-YYYY"),
    };

    return formatedAdoption;
  }

  data(data) {
    if (!data?.oid || !data?.pid) throw new Error(BAD_REQUEST);
    return {
      owner: data.oid,
      pet: data.pid,
    };
  }
}
