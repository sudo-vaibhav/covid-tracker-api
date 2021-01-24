const mongoose = require('mongoose')

const HistoricInfoSchema = new mongoose.Schema({
  day: {
    type: Date,
    required: true,
    unique: true,
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

const HistoricInfo = mongoose.model('HistoricInfo', HistoricInfoSchema)

module.exports = HistoricInfo
