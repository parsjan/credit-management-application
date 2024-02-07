const customermodel=require("../model/customermodel");
const detailsmodel = require("../model/detailmodel");
const detailmodel=require("../model/detailmodel");
const usermodel=require("../model/usermodel");

class itemcontroller{ 
    static renderitem=async (req,res)=>{
    try {
        const customerid=req.params.id;
        const currentDate = new Date();
           const day = currentDate.getDate();
           const month = currentDate.getMonth() + 1;
           const year = currentDate.getFullYear();
            const date = `${day}/${month}/${year}`;
        const result= await detailmodel.find({customerid:customerid});
       // console.log(result)

       let indexes = [];
        if(result[0]){
        const datearray=result[0].date;
        const searchString = date;

      indexes = datearray.reduce((acc, curr, index) => {
               if (curr === searchString) {
               acc.push(index);
                     }
                 return acc;
                    }, []);


       // console.log(result);
        var key= indexes.length;
        //console.log(flag);
        var totalcredit=0;
        for(var i=0;i<key;i++){
            var intitemprice=parseInt(result[0].itemprice[indexes[i]])
            var intitemquantity=parseInt(result[0].itemquantity[indexes[i]])
             totalcredit= (intitemprice*intitemquantity) + totalcredit;
        }
      }else{
        const newdoc=new  detailmodel({
          customerid:customerid,
          activitytype:0,
          itemname:[],
          itemquantity:[],
           note:[],
          date:[],
         itemprice:[]
        })
      }
        //console.log(totalcredit);
        //console.log(flag);
         res.render("item",{ customerid: customerid, result: result, key:key ,totalcredit:totalcredit,indexes:indexes });
    } catch (error) {
        console.log(error);
    }
    }

    static addcart=async (req,res)=>{
        try {
            const currentDate = new Date();
           const day = currentDate.getDate();
           const month = currentDate.getMonth() + 1;
           const year = currentDate.getFullYear();

            const date = `${day}/${month}/${year}`;
        
            const  customerid=parseInt(req.params.id);
            //console.log(customerid);
            const {itemname,itemquantity,price,note}=req.body;
            const existingDoc = await detailmodel.findOne({ customerid: customerid });
            if (existingDoc) {
                existingDoc.itemname.push(itemname);
                existingDoc.itemquantity.push(itemquantity);
                existingDoc.date.push(date);
                existingDoc.note.push(note);
                existingDoc.itemprice.push(price);
                await existingDoc.save();
              } 
             else{
            const newdoc=new detailmodel({
               customerid:customerid,
               activitytype:0,
               itemname:[itemname],
               itemquantity:[itemquantity],
               note:[note],
               date:[date],
               itemprice:[price]
            });

            //saving the doc 
            const result =await newdoc.save();
        }
            res.redirect(`/access/customerlogin/item/${customerid}`)
        } catch (error) {
            console.log(error);
        }
    }


    static addcredit=async (req,res)=>{
      try {
        const totalcredit=parseFloat(req.params.totalcredit);
        console.log(totalcredit);
        const customerid=parseInt(req.params.id);
        const result1=await customermodel.find({customerid:customerid},"remainingcredit");
        const flag=parseFloat(result1[0].remainingcredit);
         //console.log(result);
         const finalcredit= parseFloat(flag + totalcredit) ;
         console.log(finalcredit);
         const result2 = await customermodel.updateOne({customerid:customerid},{remainingcredit:finalcredit,lastcredit:totalcredit})
         
         const result =await customermodel.find({customerid:customerid});
            res.render('customerlogin',{result});
      } catch (error) {
        console.log(error)
      }
    }

    static deleteitem=async (req,res)=>{
        try {
            const itemname = req.params.itemname;
           const customerid = parseInt(req.params.id);

    const existingDoc = await detailmodel.findOne({ customerid: customerid });
     //const result=await customermodel.updateOne({customerid:customerid},remainingcredit:afterdelete)
    if (existingDoc) {
      const itemIndex = existingDoc.itemname.indexOf(itemname);

      if (itemIndex !== -1) {
        existingDoc.itemname.splice(itemIndex, 1);
        existingDoc.itemquantity.splice(itemIndex, 1);
        existingDoc.itemprice.splice(itemIndex, 1);
        existingDoc.note.splice(itemIndex, 1);
        existingDoc.date.splice(itemIndex, 1);
        await existingDoc.save();
      }
    } else {
      return res.status(404).send("No document found with the provided customerid.");
    }

    res.redirect(`/access/customerlogin/item/${customerid}`);
        } catch (error) {
            console.log(error)
        }
    }
}
    
    module.exports=itemcontroller;