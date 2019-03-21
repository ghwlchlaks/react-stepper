const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  message: {
    step1 : {type: String},
    step2 : {type: String},
    step3 : {type: String},
    step4 : {type: String}
  },
  createdDate : {type: Date, default: Date.now}
})

const Data = mongoose.model('data', dataSchema);

module.exports = {
  Data: Data
}