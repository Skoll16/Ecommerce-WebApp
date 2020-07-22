const mongoose=require('mongoose')
const Schema=mongoose.Schema
const adminSchema=new Schema({
fname:String,
lname:String,
phone:String,
email:String,
address:String,
password:String
})

module.exports=mongoose.model('eAdmin',adminSchema,'eAmins')
