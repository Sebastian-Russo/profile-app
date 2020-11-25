const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const validateUser = require('../validator');
const router = express.Router();
const ProfileSchema = require('../models/post');


// router.post('/', jsonParser, async (req, res) => {
//     const { error } = validateUser(req.body) 
//     // if (error) {
//     //   res.status(400).send(error.details[0].message);
//     //   return; 
//     // }
//     console.log(req.body)
//     const userProfile = new ProfileSchema({
//       name: req.body.name
//     });

//     try {
//       const savedProfile = await userProfile.save();
//       res.status(200).json(savedProfile)
//     } catch(err) {
//         res.status(500).json({ message: err })
//         console.log("ERROR HERE", err, req.body)
//     }
// })


module.exports = { router };