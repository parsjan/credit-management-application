const customermodel=require("../model/customermodel");
const detailmodel=require("../model/detailmodel");
const usermodel=require("../model/usermodel");

const logincontroller= async (req,res)=>{
try {
    console.log ('aaa');
     res.render("login.ejs" , {erro : 1});
} catch (error) {
    console.log(error);
}
}

module.exports=logincontroller;