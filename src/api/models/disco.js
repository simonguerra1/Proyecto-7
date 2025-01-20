const mongoose = require('mongoose')

const discoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    label: { type: String, required: true },
    catalogue: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)
const Disco = mongoose.model('discos', discoSchema, 'discos')

module.exports = Disco
