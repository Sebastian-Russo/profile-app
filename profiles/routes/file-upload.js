require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();
const ImageSchema = require('../models/image');
const upload = require('../../services/file-upload');

router.post('/', (req, res) => {
  console.log('POST REQ', req.body)
  singleUpload(req, res, (err) => {
    if (err) {
      console.log('errors', err)
      return res.status(422).send({errors: [{title: 'File Upload Error', details: err.message}]})
    } else {
      if (req.file === undefined) {
        console.log('Error: No File Selected!')
      } else {
        // Success
        const imageProfile = new ImageSchema({
          imageId: req.file.key,
          imageUrl: req.file.location
        })
      // Save the file name into database into profile model
        res.status(200).json({
          imageProfile
        });
      }
    }
  });
});

const singleUpload = upload.single('image');

router.put('/:id', jsonParser, async (req, res) => {
  console.log('PUT REQ', req.body)
  try {
    const updateImage = await ImageSchema.updateOne(
      {_id: req.params.id },
      { $set: {
        imageId: req.body.imageId,
        imageUrl: req.body.imageUrl
      }
      });
      console.log(updateImage)
      res.status(200).json(updateImage)
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
})


module.exports = router; 