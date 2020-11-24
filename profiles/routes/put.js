const express = require('express');
// const Joi = require('joi');
const bodyParser = require('body-parser');
const validateUser = require('../validator');
const router = express.Router();
const jsonParser = bodyParser.json();
const ProfileSchema = require('../models/post');
const { updateOne } = require('../models/post');


router.put('/:id', jsonParser, async (req, res) => {
    try {
      const updatedProfile = await ProfileSchema.updateOne(
        { _id: req.params.id }, 
        { $set: { name: req.body.name } 
      });
      res.status(200).json(updatedProfile)
    } catch(err) {
      res.status(500).json({ message: err })
    }

})

module.exports = { router };


// router.put('/:id', jsonParser, (req, res) => {

//   // Look up the user 
//   const user = users.find(user => user.id === parseInt(req.params.id));
//   if (!user) return res.status(404).send('The user with that id is not found.');

//   // Validate
//   const { error, value } = validateUser(req.body.name) // result.error
//   if (error) {
//     res.status(400).send(error.details[0].message);
//     return; 
//   }

//   // Update user, return user
//   user.name = req.body.name;
//   res.send(user)
// })