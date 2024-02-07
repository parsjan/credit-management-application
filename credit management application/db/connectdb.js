const mongoose=require('mongoose')
const connectDB= async (DATABASE_URI)=>{
try{
 const DB_OPTIONS={
    dbName:'credit_management'
 }
 await mongoose.connect(DATABASE_URI,DB_OPTIONS);
 console.log('connected successfully');
}
catch(error){
  console.log(error);
}
}


module.exports=connectDB;