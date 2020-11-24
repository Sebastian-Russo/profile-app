const Joi = require('joi');

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).required()
  }

  return Joi.string().validate(user, schema);
}

module.exports = validateUser;