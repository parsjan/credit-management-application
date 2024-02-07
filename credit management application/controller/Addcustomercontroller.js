const customermodel=require("../model/customermodel");
const detailmodel=require("../model/detailmodel");
const usermodel=require("../model/usermodel");

class Addcustomercontroller{ 
    static renderAddcustomer =async (req,res)=>{
    try {
     //   console.log("controller is working");
         res.render("Addcustomer");
    } catch (error) {
        console.log(error);
    }
    }

    static createdoc= async (req,res)=>{
     
       try {
        const result= await customermodel.find();
        const flag=result.length + 1 ;
       const {customername,mobileno,customeraddress}=req.body;
      //console.log(req.body);
       const doc= new customermodel({
        customerid:flag,
        customername:customername,
        mobileno:mobileno,
        customeraddress:customeraddress,
        lastcreditdate:"nill",
        lastdebitdate:"nill"
       })
       //saving document
       const result1 = await doc.save()
       res.redirect("/access/Addcustomer")
       } catch (error) {
        console.log(error);
       }
    }
}
    module.exports=Addcustomercontroller;