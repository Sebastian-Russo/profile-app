const Joi = require('joi');

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).required(),
    image: {
      imageKey: Joi.string(),
      imageUrl: Joi.string(),
      imageName: Joi.string()
    }
  }

  return Joi.string().validate(user, schema);
}

module.exports = validateUser;