const express = require('express');
const router = express.Router();
const Joi = require('joi');
//const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const propertyService = require('./property.service');
// routes
router.get('/', authorize(Role.Admin), getAll);
router.get('/:propertyId', authorize(), getById);
router.post('/',create);
router.put('/:propertyId', authorize(), update);
router.delete('/:propertyId', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    propertyService.getAll()
        .then(property => res.json(property))
        .catch(next);
}

function getById(req, res, next) {
    propertyService.getById(req.params.propertyId)
        .then(property => property ? res.json(property) : res.sendStatus(404))
        .catch(next);
}

function create(req, res, next) {
    propertyService.create(req.body)
        .then(property => res.json(property))
        .catch(next);
}

function update(req, res, next) {
    propertyService.update(req.params.propertyId, req.body)
        .then(property => res.json(property))
        .catch(next);
}

function _delete(req, res, next) {
    propertyService.delete(req.params.propertyId)
        .then(() => res.json({ message: 'Property deleted successfully' }))
        .catch(next);
}

