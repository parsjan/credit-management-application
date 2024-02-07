const customermodel=require("../model/customermodel");
const detailmodel=require("../model/detailmodel");
const usermodel=require("../model/usermodel");

class depositecontroller{
    static renderdeposite=async (req,res)=>{
    try {
        const customerid=req.params.id;
         res.render("deposite",{ customerid: customerid });
    } catch (error) {
        console.log(error);
    }
    }
}
    
    module.exports=depositecontroller;