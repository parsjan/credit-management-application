const customermodel=require("../model/customermodel");
const detailmodel=require("../model/detailmodel");
const usermodel=require("../model/usermodel");

class itemeditcontroller{
    static renderitemedit=async (req,res)=>{
    try {
        const itemname = req.params.itemname;
        const customerid = parseInt(req.params.id);
        const result= await detailmodel.find({customerid:customerid});
      
        const itemindex = result[0].itemname.indexOf(itemname);
        const itemprice=result[0].itemprice[itemindex];
        const itemquantity=result[0].itemquantity[itemindex];
        const note=result[0].note[itemindex];
         res.render("itemedit",{itemname:itemname,itemprice:itemprice,itemquantity:itemquantity,note:note,customerid:customerid});
    } catch (error) {
        console.log(error);
    }
    }

    static updateitem=async (req,res)=>{
        const itemname = req.params.itemname;
        const customerid = parseInt(req.params.id);
        const itemprice=req.body.itemprice;
        const itemquantity=req.body.itemquantity;
        const note=req.body.note;
        const result1 = await detailmodel.find({ customerid: customerid });
        const itemindex = result1[0].itemname.indexOf(itemname);
    
        if (itemindex !== -1) {
          
          result1[0].itemname[itemindex] = itemname;
          
          result1[0].itemprice[itemindex] = itemprice;
          
          result1[0].itemquantity[itemindex] = itemquantity;
         
          result1[0].note[itemindex] = note;
    
          await result1[0].save();
        }
        res.redirect(`/access/customerlogin/item/${customerid}`)
    }
}

    module.exports=itemeditcontroller;