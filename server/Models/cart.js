const mongoose=require('mongoose')
const Schema=mongoose.Schema
const cartSchema=new Schema({
pcategory:String,
userID:String,
ptitle:String,
poffer:String,
pdescription:String,
pimg:String,
pdate:String,
pcompany:String
})

module.exports=mongoose.model('eCart',cartSchema,'eCarts')
