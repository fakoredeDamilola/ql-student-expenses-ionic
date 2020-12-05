const express = require("express");
const router = express.Router();
const Joi = require("joi");
//const validateRequest = require('_middleware/validate-request');
const authorize = require("_middleware/authorize");
const Role = require("_helpers/role");
const petService = require("./pet.service");

// routes for pets. proably going to have to update this to allow non admins to create pets??? idk yet
router.get("/", authorize(Role.Admin), getAll);
router.get("/:id", authorize(), getById);
router.post("/", authorize(), create);
router.put("/:id", authorize(), update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
  petService
    .getAll()
    .then((pet) => res.json(pet))
    .catch(next);
}

function getById(req, res, next) {
  // users can get their own account and admins can get any account

  petService
    .getById(req.params.id)
    .then((pet) => (pet ? res.json(pet) : res.sendStatus(404)))
    .catch(next);
}

function create(req, res, next) {
  //console.log(req.body,"The body of the pet create request")
  petService
    .create(req.body)
    .then((pet) => res.json(pet))
    .catch(next);
}

function update(req, res, next) {
  // users can update their own account and admins can update any account

  petService
    .update(req.params.id, req.body)
    .then((pet) => res.json(pet))
    .catch(next);
}

function _delete(req, res, next) {
  petService
    .delete(req.params.id)
    .then(() => res.json({ message: "Pet deleted successfully" }))
    .catch(next);
}
