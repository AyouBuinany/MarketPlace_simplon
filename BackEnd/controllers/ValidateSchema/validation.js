// VALIDATION
const Joi = require("joi");

// Register validation User
const registerValidationUser = data => {
  const schema = Joi.object({
    firstName: Joi.string()
    .min(2)
    .required(),
    lastName: Joi.string()
      .min(2)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
  verifyPassword:Joi.string().required().valid(Joi.ref('password'))
  });
  return schema.validate(data);
};

// Register validation Vendeur
const registerValidationVendeur = data => {
  const schema = Joi.object({
    firstName: Joi.string()
    .min(2)
    .required(),
    lastName: Joi.string()
      .min(2)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
  verifyPassword:Joi.string().required().valid(Joi.ref('password')),
  city:Joi.string().min(2).required(),
  adress:Joi.string().required().min(5),
  numberPhone:Joi.string().pattern(/^[0-9]+$/).required()
  });
  return schema.validate(data);
};

//Login validation
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .required()
  });
  return schema.validate(data);
};

module.exports ={registerValidationUser,loginValidation,registerValidationVendeur};
