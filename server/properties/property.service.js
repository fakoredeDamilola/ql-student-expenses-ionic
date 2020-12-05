const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getAllPropertiesOnAccount,
};

async function getAll() {
  const property = await db.Property.find()
  .populate("propertyPetOwner")
  .populate("propertyPetsCount")
  .populate("propertyPetOwnerCount");
  return property.map((x) => basicDetails(x));
}

async function getById(id) {
  const property = await getProperty(id);
  return basicDetails(property);
}

async function create(params) {
  const property = new db.Property(params);
  await property.save();
  return basicDetails(property);
}

async function update(id, params) {
  const property = await getProperty(id);
  // copy params to account and save
  Object.assign(property, params);
  property.updated = Date.now();
  await property.save();
  return basicDetails(property);
}

async function _delete(id) {
  console.log("Im deleting property...");
  const property = await getProperty(id);
  await property.remove();
}

// helper functions

async function getAllPropertiesOnAccount(propertyManagerId) {
  const properties = await db.Property.find({
    propertyManagerId: propertyManagerId,
  })
    .populate("propertyPetOwner")
    .populate("propertyPetsCount")
    .populate("propertyPetOwnerCount");
  return await properties;
}

async function getProperty(id) {
  //const t = await db.Property.find({ propertyManagerId :"5f960e6830f207ffe343baf4"});
  //console.log(t,"this");

  const property = await db.Property.findById(id)
    .populate("propertyPetOwner")
    .populate("propertyPets")
    .populate("propertyPetsCount")
    .populate("propertyPetOwnerCount")
    .populate("propertyManager");
  //if (!property) throw 'property not found';
  return await property;
}

function basicDetails(property) {
  const {
    id,
    propertyManagerId,
    propertyManager,
    propertyName,
    houseUnitNumber,
    street,
    city,
    state,
    zip,
    propertyPetOwnerCount,
    propertyPetOwner,
    propertyPets,
    propertyPetsCount
  } = property;
  return {
    id,
    propertyManagerId,
    propertyManager,
    propertyName,
    houseUnitNumber,
    street,
    city,
    state,
    zip,
    propertyPetOwnerCount,
    propertyPetOwner,
    propertyPets,
    propertyPetsCount,
  };
}
