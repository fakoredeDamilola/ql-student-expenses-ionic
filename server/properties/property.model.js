const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    propertyManagerId:{ type: String, required: true },//<-- The Account Id of the property manager
    petOwnerId:{ type: String, required: false, default:'None' },//<-- The Account Id of the property owner/renter
    propertyName: { type: String, required: false },
    houseUnitNumber:{ type: String, required: true },
    street:{ type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: Date,
    images: { type:Array, required:false }
}
,
{ toJSON :{ virtuals :true},
  toObject :{ virtuals :true}
}
);

// Pet Owner @Property,  have to experiment with indexes and what would be faster

schema.virtual("propertyPetOwner", {
    ref: "Account", // The model to use
    localField: "_id", // Find people where `localField`
    foreignField: "propertyId", // is equal to `foreignField`
    justOne: true,
  });

// The Property Manager for the Property

schema.virtual("propertyManager", {
  ref: "Account", // The model to use
  localField: "propertyManagerId", // Find people where `localField`
  foreignField: "_id", // is equal to `foreignField`
  justOne: true,
});

  schema.virtual("propertyPetOwnerCount", {
    ref: "Account", // The model to use
    localField: "_id", // Find people where `localField`
    foreignField: "propertyId", // is equal to `foreignField`
    justOne: true,
    count: true
  });  

// Pets In this property....
schema.virtual("propertyPets", {
    ref: "Pet", // The model to use
    localField: "_id", // Find people where `localField`
    foreignField: "propertyId", // is equal to `foreignField`
    justOne: false,
  });

schema.virtual("propertyPetsCount", {
    ref: "Pet", // The model to use
    localField: "_id", // Find people where `localField`
    foreignField: "propertyId", // is equal to `foreignField`
    justOne: false,
    count: true
  });  

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
    }
});

module.exports = mongoose.model('Property', schema);