require('dotenv').config(); 
const express = require('express');
const router = express.Router();

const upload = require('../../services/file-upload')

const singleUpload = upload.single('image');

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
        const imageName = req.file.key;
        const imageLocation = req.file.location;
      // Save the file name into database into profile model
        res.json({
          'imageUrl': req.file.location, 
          image: imageName,
          location: imageLocation
        });
      }
    }
  });
});

module.exports = router; 