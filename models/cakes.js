const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cakeSchema = new Schema ({
  name: {type: String, required:true},
  category: String,
  img: String,
  description: String,
  price: {type: Number, min:0},
  qty: {type: Number, min:0}
})

const Cakes = mongoose.model('CakeCollection', cakeSchema)


module.exports = Cakes
