const mongoose=require('mongoose')
const Schema=mongoose.Schema
const adminPproductSchema=new Schema({
adminID:String,
pcategory:String,
ptitle:String,
poffer:String,
pimg:String,
pdescription:String,
pdate:String,
pcompany:String
})

module.exports=mongoose.model('eAdminProduct',adminPproductSchema,'eAdminsProducts')
