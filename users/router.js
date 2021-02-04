'use strict';
const express = require("express");
const { User } = require('./models');
const { jwtAuth } = require('../auth');
const router = express.Router();

router.post('/', (req, res) => {

    const requiredFields = ['username', 'password'];
    const missingField = requiredFields.find(field => !(field in req.body));
  
    if (missingField) {
      console.log('MISSING FIELD', missingField)
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: `Missing ${missingField}`,
        location: missingField
      });
    }
  
    const stringFields = ['username', 'password', 'email'];
    const nonStringField = stringFields.find(
      field => field in req.body && typeof req.body[field] !== 'string'
    );
  
    if (nonStringField) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Incorrect field type: expected string',
        location: nonStringField
      });
    }
  
    const explicityTrimmedFields = ['username', 'password'];
    const nonTrimmedField = explicityTrimmedFields.find(
      field => req.body[field].trim() !== req.body[field]
    );
  
    if (nonTrimmedField) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Cannot start or end with whitespace',
        location: nonTrimmedField
      });
    }
  
    const sizedFields = {
      username: {
        min: 1
      },
      password: {
        min: 10,
        max: 72
      }
    };
    const tooSmallField = Object.keys(sizedFields).find(
      field =>
        'min' in sizedFields[field] &&
              req.body[field].trim().length < sizedFields[field].min
    );
    const tooLargeField = Object.keys(sizedFields).find(
      field =>
        'max' in sizedFields[field] &&
              req.body[field].trim().length > sizedFields[field].max
    );
  
    if (tooSmallField || tooLargeField) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: tooSmallField
          ? `Must be at least ${sizedFields[tooSmallField]
            .min} characters long`
          : `Must be at most ${sizedFields[tooLargeField]
            .max} characters long`,
        location: tooSmallField || tooLargeField
      });
    }
  
    let {username, password, email = ''} = req.body;
    // Username and password come in pre-trimmed, otherwise we throw an error
    // before this
    email = email.trim();
    
    return User.find({username})
      .countDocuments()
      .then(count => {
        if (count > 0) {
          // There is an existing user with the same username
          return Promise.reject({
            code: 422,
            reason: 'ValidationError',
            message: 'Username already taken',
            location: 'username'
          });
        }
        // If there is no existing user, hash the password
        return User.hashPassword(password);
      })
      .then(hash => {
        return User.create({
          username,
          password: hash,
          email
        });
      })
      .then(user => {
        console.log(user)
        return res.status(201).json(user.serialize());
      })
      .catch(err => {
        // Forward validation errors on to the client, otherwise give a 500
        // error because something unexpected has happened
        if (err.reason === 'ValidationError') {
          console.error(err)
          return res.status(err.code).send(err);
        }
        return res.status(500).json({code: 500, message: err.message });
      });
});



// update nick name and profile image connected to user id 
router.put('/:id', jwtAuth, (req, res) => {
  console.log('PUT REQ', req.params, req.body, req.body.id)
  
  if(!(req.params.id && req.body.id && req.params.id == req.body.id)) {
      const message = (`Request path id (${req.params.id}) and request body id (${req.body.id}) must match`)
      console.error(message);
      return res.status(400).json({message: message})
  }

  const toUpdate = {};
  const updateableFields = ["nickName", "imageFile"];

  updateableFields.forEach(field => {
    console.log('FIELDS', field)
      if (field in req.body) {
          toUpdate[field] = req.body[field]
      }
  });
  console.log('TO UPDATE OBJ:', toUpdate)
  User
      // name type string, image type obj 
      .findByIdAndUpdate(req.params.id, {$set: toUpdate}, {new: true})
      .then(updateUser => {
        console.log('UPDATE USER RES:', updateUser)
          res.status(200).json({
              nickName: updateUser.nickName,
              imageFile: updateUser.imageFile
          })
      })
      .catch(err => res.status(500).json({ message: err.message }));
});


// REMOVE DURING PRODUCT, JUST TO CHECK IF CREATING USERS
router.get('/', (req, res) => {
    return User.find()
      .then(users => res.json(users.map(user => user.serialize())))
      .catch(err => res.status(500).json({message: err.message }));
});


module.exports = { router }; 

