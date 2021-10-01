const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("firstName is required"),
  check("lastName").notEmpty().withMessage("lastName is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("password").isLength({ min: 6 }).withMessage("Password too short"),
  check("nomBoutique").notEmpty().withMessage("nomBoutique is required"),
  check("phoneNumber").notEmpty().withMessage("phoneNumber is required"),
  check("raisonSociale").notEmpty().withMessage("raisonSociale is required"),
  check("matriculeFiscale")
    .notEmpty()
    .withMessage("matriculeFiscale is required"),
  check("identifiantUnique")
    .notEmpty()
    .withMessage("identifiantUnique is required"),
  check("adresse").notEmpty().withMessage("adresse is required"),
  check("codePostale").notEmpty().withMessage("codePostale is required"),
  check("titulaireCompte")
    .notEmpty()
    .withMessage("titulaireCompte is required"),
  check("RIB").notEmpty().withMessage("RIB is required"),
  check("nomBanque").notEmpty().withMessage("nomBanque is required"),
];

exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("password").isLength({ min: 6 }).withMessage("Password too short"),
];

exports.isRequestValid = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
