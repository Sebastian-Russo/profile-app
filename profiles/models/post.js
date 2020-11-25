const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    image: {
        image: {
          type: String,
          default: "empty"
        },
        imageUrl: {
          type: String,
          default: "empty"
        }
    }
})

module.exports = mongoose.model('Profile', ProfileSchema);
