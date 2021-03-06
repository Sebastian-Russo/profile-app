require('dotenv').config(); 
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: 'us-east-2'
})

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG and JPG'), false);
  }
};
 
const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: 'seb-new-bucket',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, {fieldName: 'TESTING_META_DATA'});
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString())
    }
  })
});
 
module.exports = upload; 