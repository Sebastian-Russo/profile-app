const express = require('express');
const router = express.Router();
const ProfileSchema = require('../models/post');


router.delete('/:id', async (req, res) => {
    try {
      const removeProfile = await ProfileSchema.remove({ _id: req.params.id });
      res.status(200).json(removeProfile);
    } catch(err) {
      res.status(500).json({ message: err })
    }
})

module.exports = { router };