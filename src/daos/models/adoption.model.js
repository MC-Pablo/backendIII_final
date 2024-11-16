import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const adoptionSchema = new Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    },
    pet: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'pets'
    }
}, {
    timestamps: true
});

adoptionSchema.virtual('ownerDetails', {
    ref: 'users',       
    localField: 'owner', 
    foreignField: '_id',  
    justOne: true       
});

adoptionSchema.virtual('petDetails', {
    ref: 'pets',        
    localField: 'pet',   
    foreignField: '_id', 
    justOne: true       
});

adoptionSchema.set('toObject', { virtuals: true });
adoptionSchema.set('toJSON', { virtuals: true });

adoptionSchema.plugin(paginate);

const Adoption = model('adoptions', adoptionSchema);

export default Adoption;