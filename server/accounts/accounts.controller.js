const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const Role = require("_helpers/role");
const accountService = require("./account.service");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const bodyParser = require("body-parser");
const propertyService = require("../properties/property.service");
const petService = require("../pets/pet.service");

// routes for accounts services like login authenticate etc.
router.post("/authenticate", authenticateSchema, authenticate);
router.post("/register", registerSchema, register);
router.post("/verify-email", verifyEmailSchema, verifyEmail);
router.post("/forgot-password", forgotPasswordSchema, forgotPassword);
router.post("/reset-password", resetPassword);
// Used for JWT's
router.post("/refresh-token", refreshToken);
router.post("/revoke-token", authorize(), revokeTokenSchema, revokeToken);
router.post(
  "/validate-reset-token",
  validateResetTokenSchema,
  validateResetToken
);
// main routes for accounts ***
router.get("/", authorize(Role.Admin), getAll);
router.get("/:accountId", getById);
router.post("/", createSchema, createAccount);
router.put("/:accountId", authorize(), update);
router.delete("/:accountId", authorize(), _delete);

// TODO routes to add pets BASIC FUNCTIONALITY, also TODO Authorize for all...
//router.put("/:accountId/pets/", authorize(), pushPetToAccount);
router.get("/:accountId/pets/", getAllPetsOnAccount);

// Property Manager Routes
//router.put("/:accountId/properties/", authorize(), pushPropertyToAccount);
// Need to use db.property find({})
router.get("/:propertyManagerId/properties/", getAllPropertiesOnAccount);
router.get("/:propertyManagerId/pet-owners/", getAllPetOwnersInProperties);
router.get("/:propertyManagerId/pets-on-properties/", getPropertiesPets);
router.get("/:propertyManagerId/properties-pets/", getAllPetsInProperties);
module.exports = router;

/*******************************************************************
 *  Property Manager Routes
 *  Working:
 *  getAllPetOwnersInProperties
 *  getAllMyProperties, with number of pet owners and pets
 *  getAllPetsInProperties
 ******************************************************************/
function getAllPetOwnersInProperties(req, res, next) {
  //console.log(req)
  accountService
    .getAllPetOwnersInProperties(req.params.propertyManagerId)
    .then((accounts) => res.json(accounts))
    .catch(next);
}

function getPropertiesPets(req, res, next) {
  //console.log(req)
  accountService
    .getPropertiesPets(req.params.propertyManagerId)
    .then((accounts) => res.json(accounts))
    .catch(next);
}

function getAllPropertiesOnAccount(req, res, next) {
  propertyService
    .getAllPropertiesOnAccount(req.params.propertyManagerId)
    .then((properties) => res.json(properties))
    .catch(next);
}

function getAllPetsInProperties(req, res, next) {
  petService
    .getAllPetsInProperties(req.params.propertyManagerId)
    .then((pets) => res.json(pets))
    .catch(next);
}

/***************************************************
 * Regular User AKA Pet Owner AKA P.O
 * getAllPetsOnAccount just the logged in persons pets
 *
 *
 */
function getAllPetsOnAccount(req, res, next) {
  petService
  .getAllPetsOnAccount(req.params.accountId)
  .then((pets) => res.json(pets))
  .catch(next);
}

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
  const { email, password } = req.body;
  const ipAddress = req.ip;
  accountService
    .authenticate({ email, password, ipAddress })
    .then(({ refreshToken, ...account }) => {
      setTokenCookie(res, refreshToken);
      res.json(account);
    })
    .catch(next);
}

function refreshToken(req, res, next) {
  const token = req.cookies.refreshToken;
  const ipAddress = req.ip;
  accountService
    .refreshToken({ token, ipAddress })
    .then(({ refreshToken, ...account }) => {
      setTokenCookie(res, refreshToken);
      res.json(account);
    })
    .catch(next);
}

function revokeTokenSchema(req, res, next) {
  const schema = Joi.object({
    token: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}

function revokeToken(req, res, next) {
  // accept token from request body or cookie
  const token = req.body.token || req.cookies.refreshToken;
  const ipAddress = req.ip;

  if (!token) return res.status(400).json({ message: "Token is required" });

  // users can revoke their own tokens and admins can revoke any tokens
  if (!req.user.ownsToken(token) && req.user.role !== Role.Admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  accountService
    .revokeToken({ token, ipAddress })
    .then(() => res.json({ message: "Token revoked" }))
    .catch(next);
}

function registerSchema(req, res, next) {
  //console.log("getting to register schema", req)
  const schema = Joi.object({
    title: Joi.string(),
    role: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    propertyId: Joi.string(),
    propertyManagerId: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6),
    confirmPassword: Joi.string().valid(Joi.ref("password")),
    acceptTerms: Joi.boolean().valid(true),
  });

  validateRequest(req, next, schema);
}

function register(req, res, next) {
  //console.log(req)
  accountService
    .register(req.body, req.get("origin"))
    .then(() =>
      res.json({
        message:
          "Registration successful, please check your email for verification instructions",
      })
    )
    .catch(next);
}

function verifyEmailSchema(req, res, next) {
  const schema = Joi.object({
    token: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function verifyEmail(req, res, next) {
  accountService
    .verifyEmail(req.body)
    .then(() =>
      res.json({ message: "Verification successful, you can now login" })
    )
    .catch(next);
}

function forgotPasswordSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  validateRequest(req, next, schema);
}

function forgotPassword(req, res, next) {
  accountService
    .forgotPassword(req.body, req.get("origin"))
    .then(() =>
      res.json({
        message: "Please check your email for password reset instructions",
      })
    )
    .catch(next);
}

function validateResetTokenSchema(req, res, next) {
  const schema = Joi.object({
    token: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function validateResetToken(req, res, next) {
  accountService
    .validateResetToken(req.body)
    .then(() => res.json({ message: "Token is valid" }))
    .catch(next);
}

function resetPassword(req, res, next) {
  accountService
    .resetPassword(req.body)
    .then(() =>
      res.json({ message: "Password reset successful, you can now login" })
    )
    .catch(next);
}

// Main Routes controllers
function getAll(req, res, next) {
  accountService
    .getAll()
    .then((accounts) => res.json(accounts))
    .catch(next);
}

function getById(req, res, next) {
  // users can get their own account and admins can get any account
  //console.log(req.params,"????")
  //console.log(req.user,"tf")
  /*if (
    req.params.accountId !== req.user.accountId &&
    req.user.role !== Role.Admin
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }*/

  accountService
    .getById(req.params.accountId)
    .then((account) => (account ? res.json(account) : res.sendStatus(404)))
    .catch(next);
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    role: Joi.string()
      .valid(Role.Admin, Role.User, Role.PropertyManager)
      .required(),
  });
  validateRequest(req, next, schema);
}

function createAccount(req, res, next) {
  accountService
    .createAccount(req.body)
    .then((account) => res.json(account))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schemaRules = {
    title: Joi.string().empty(""),
    firstName: Joi.string().empty(""),
    lastName: Joi.string().empty(""),
    email: Joi.string().email().empty(""),
    password: Joi.string().min(6).empty(""),
    confirmPassword: Joi.string().valid(Joi.ref("password")).empty(""),
  };

  // only admins can update role
  if (req.user.role === Role.Admin) {
    schemaRules.role = Joi.string()
      .valid(Role.Admin, Role.User, Role.PropertyManager)
      .empty("");
  }

  const schema = Joi.object(schemaRules).with("password", "confirmPassword");
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  // users can update their own account and admins can update any account, THIS IS SO IMPORTANT NOT ACCOUNT ID ITS ID FOR user.id
  if (req.params.accountId !== req.user.id && req.user.role !== Role.Admin) {
    return res.status(399).json({
      message: "Unauthorized update to someone else account, your bad",
    });
  }
  accountService
    .update(req.params.accountId, req.body)
    .then((account) => res.json(account))
    .catch(next);
}

function _delete(req, res, next) {
  // users can delete their own account and admins can delete any account
  if (req.params.accountId !== req.user.id && req.user.role !== Role.Admin) {
    return res.status(401).json({
      message: "Unauthorized you tried deleting someone elses account",
    });
  }

  accountService
    .delete(req.params.accountId)
    .then(() => res.json({ message: "Account deleted successfully" }))
    .catch(next);
}

// helper functions

function setTokenCookie(res, token) {
  // createAccount cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };
  res.cookie("refreshToken", token, cookieOptions);
}
