const mongoose=require("mongoose");


//defining schema
const customerSchema= new mongoose.Schema({
    customerid:{type:Number},
    customername:{type:String, required:true ,trim:true},
    mobileno: {
        type: Number, validate: {validator: function (value) {
            const mobileNumber = value.toString();
            return mobileNumber.length === 10;
          }
      }},
    customeraddress:{type:String,required:true},
    remainingcredit:{type:mongoose.Decimal128,required:true, default:0},
    lastdeposite:{type:mongoose.Decimal128,required:true,default:0},
    lastcredit:{type:mongoose.Decimal128,required:true,default:0},
    lastcreditdate:{type:String},
    lastdebitdate:{type:String}
})

//model 
const customermodel= mongoose.model("customer",customerSchema);

module.exports=customermodel;