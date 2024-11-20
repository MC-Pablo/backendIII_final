import { toBoolean } from "../utils/toBoolean.js";
import moment from "moment";

export class PetDTO{
    model(model){
        return {
            id: model.id,
            name: model.name,
            specie: model.specie,
            birthDate: model.birthDate instanceof Date ? moment(model.birthDate).format('DD-MM-YYYY') : model.birthDate,
            adopted: model.adopted,
            owner: model?.owner ? {
                id: model.owner.id,
                name: model.owner.name,
                surname: model.owner.surname
            } : null,
            thumbnail: model.thumbnail
        }
    };

    data(data){
        return {
            id: data.id || null,
            name: data.name,
            specie: data.specie,
            adopted: toBoolean(data.adopted),
            birthDate: data.birthDate || '01-01-2000',
            owner: data.oid || null,
            thumbnail: data.thumbnail || "/public/images/default_pet.svg"
        }
    };

    adoption(model){
        return {
            id: model?.id || model._id.toString(),
            name: model.name,
            specie: model.specie,
            birthDate: model.birthDate,
            adopted: model.adopted,
            thumbnail: model.thumbnail
        }
    }
}