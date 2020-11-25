require('dotenv').config(); 
const express = require('express');
const router = express.Router();
const ImageSchema = require('../models/image');
const upload = require('../../services/file-upload')

router.post('/', (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      console.log('errors', error)
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

// router.put('/:id', async (req, res) => {
//   try {
//     const updateProfile = await ProfileSchema.updateOne(
//       {_id: req.params.id },
//       { $set: {
//         imageId: req.body.imageId,
//         imageUrl: req.body.imageUrl
//       }
//       });
//       res.status(200).json(updateProfile)
//   } catch(err) {
//     console.log(err)
//     res.status(500).json({ message: err })
//   }
// })


module.exports = router; 