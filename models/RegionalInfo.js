const mongoose = require('mongoose')

const RegionalInfoSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  confirmed: {
    type: Number,
    required: true,
  },
  active: {
    type: Number,
    required: true,
  },
  recovered: {
    type: Number,
    required: true,
  },
  deceased: {
    type: Number,
    required: true,
  },
})

const RegionalInfo = mongoose.model('RegionalInfo', RegionalInfoSchema)

module.exports = RegionalInfo
