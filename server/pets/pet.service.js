const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getAllPetsInProperties,
  getAllPetsOnAccount
};

async function getAllPetsInProperties(propertyManagerId){
  const pets = await db.Pet.find({propertyManagerId:propertyManagerId});
  //console.log(pets)
  return pets.map((x) => basicDetails(x));
}

async function getAllPetsOnAccount(accountId){
  const pets = await db.Pet.find({petOwnerId:accountId});
  //console.log(pets)
  return pets.map((x) => basicDetails(x));
}

async function getAll() {
  const pet = await db.Pet.find();
  return pet.map((x) => basicDetails(x));
}

async function getById(id) {
  const pet = await getPet(id);
  return basicDetails(pet);
}

async function create(params) {
  const pet = new db.Pet(params);
  await pet.save();
  return basicDetails(pet);
}

async function update(id, params) {
  const pet = await getPet(id);
  // copy params to account and save
  Object.assign(pet, params);
  pet.updated = Date.now();
  await pet.save();
  return basicDetails(pet);
}

async function _delete(id) {
  const pet = await getPet(id);
  await pet.remove();
}

// helper functions

async function getPet(id) {
  const pet = await db.Pet.findById(id);
  if (!pet) throw "pet not found";
  return pet;
}

function basicDetails(pet) {
  const {
    id,
    petOwnerId,
    propertyId,
    propertyManagerId,
    petName,
    species,
    breed,
    rating,
  } = pet;
  return {
    id,
    petOwnerId,
    propertyId,
    propertyManagerId,
    petName,
    species,
    breed,
    rating,
  };
}
