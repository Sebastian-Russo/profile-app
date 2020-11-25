require('dotenv').config(); 
const express = require('express');
const router = express.Router();
const ProfileSchema = require('../models/post');
const upload = require('../../services/file-upload')

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
        const imageId = req.file.key;
        const imageUrl = req.file.location;
      // Save the file name into database into profile model
        res.json({
          imageUrl, 
          imageId
        });
      }
    }
  });
});

module.exports = router; 