const mongoose=require("mongoose");


//defining schema
const userSchema= new mongoose.Schema({
    username:{type:String},
    password:{type:String}
})

//model 
const usermodel= mongoose.model("user",userSchema);

module.exports=usermodel;