const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  propertyManagerId: { type: String, required: false },
  propertyId: { type: String, required: false },
  passwordHash: { type: String, required: true },
  title: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  acceptTerms: Boolean,
  role: { type: String, required: true },
  verificationToken: String,
  verified: Date,
  resetToken: {
    token: String,
    expires: Date,
  },
  passwordReset: Date,
  created: { type: Date, default: Date.now },
  updated: Date,
},
{ toJSON :{ virtuals :true},
  toObject :{ virtuals :true}
}
);


schema.virtual("isVerified").get(function () {
  return !!(this.verified || this.passwordReset);
});

// My Pets as a Pet Owner
schema.virtual("petOwnerPets", {
  ref: "Pet", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "petOwnerId", // is equal to `foreignField`
  justOne: false,
});

schema.virtual("petOwnerPetsCount", {
  ref: "Pet", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "petOwnerId", // is equal to `foreignField`
  justOne: false,
  count:true
});

schema.virtual("petOwnerProperty", {
  ref: "Property", // The model to use
  localField: "propertyId", // Find people where `localField`
  foreignField: "_id", // is equal to `foreignField`
  justOne: true
});
// My Properties if I am A Property Manager
schema.virtual("propertyManagerProperties", {
  ref: "Property", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "propertyManagerId", // is equal to `foreignField`
  justOne: false,
});
schema.virtual("propertyManagerPropertiesCount", {
  ref: "Property", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "propertyManagerId", // is equal to `foreignField`
  justOne: false,
  count:true
});
// Pets In My Properties if I am A Property Manager
schema.virtual("propertyManagerPets", {
  ref: "Pet", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "propertyManagerId", // is equal to `foreignField`
  justOne: false,
});
// Pet Owners In My Properties if I am A Property Manager
schema.virtual("propertyManagerPetOwners", {
  ref: "Account", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "propertyManagerId", // is equal to `foreignField`
  justOne: false,
});

schema.virtual("propertyManagerPetsCount", {
  ref: "Pet", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "propertyManagerId", // is equal to `foreignField`
  justOne: false,
  count: true,
});
// Pet Owners In My Properties if I am A Property Manager
schema.virtual("propertyManagerPetOwnersCount", {
  ref: "Account", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "propertyManagerId", // is equal to `foreignField`
  justOne: false,
  count: true,
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.passwordHash;
  },
});

module.exports = mongoose.model("Account", schema);
