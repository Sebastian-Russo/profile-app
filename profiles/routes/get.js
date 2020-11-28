const express = require('express');
const router = express.Router();
const ProfileSchema = require('../models/name');


router.get('/', async (req, res) => {
    try {
      const userProfile = await ProfileSchema.find();
      res.status(200).json(userProfile)
    } catch(err) {
      res.status(500).json({ message: err })
    }
});

router.get('/:id', async (req, res) => {
    try {
      const userProfile = await ProfileSchema.findById(req.params.id);
      res.status(200).json(userProfile)
    } catch(err) {
      res.status(500).json({ message: err })
    }

    // const user = users.find(user => user.id === parseInt(req.params.id));
    // if (!user) res.status(404).send('The user with that id is not found.');
    // res.send(user)
});


module.exports = { router };