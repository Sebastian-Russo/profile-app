const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    imageKey: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    }
})

module.exports = mongoose.model('Image', ImageSchema);
