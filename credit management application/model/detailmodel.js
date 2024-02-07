const mongoose=require("mongoose");


//defining schema
const detailSchema= new mongoose.Schema({
    customerid:{type:Number ,required:true},
    activitytype:{type:Number, required:true },
    itemname:{type:Array},
    itemquantity:{type:Array},
    note:{type:Array ,default:"nil"},
    date:{type:Array},
    itemprice:{type:Array},
    saved:[{itemname:{type:String},itemquantiy:{type:Number},itemprice:{type:mongoose.Decimal128},date:{type:String}}]
})

//model 
const detailsmodel= mongoose.model("detail",detailSchema);

module.exports=detailsmodel;