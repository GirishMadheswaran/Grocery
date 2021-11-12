const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    foodName:{
        type:String,
        required:true,
    },
    kgs:{
        type:Number,
        required:true, 
    },
})

const food = mongoose.model("food",FoodSchema)
  
module.exports = food;