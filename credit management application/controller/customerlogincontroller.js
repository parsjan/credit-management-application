const customermodel=require("../model/customermodel");
const detailmodel=require("../model/detailmodel");
const usermodel=require("../model/usermodel");

class customerlogincontroller{
   static rendercustomerlogin = async (req,res)=>{
    try{
         res.render("customerlogin",{result:[]});
    } catch (error) {
        console.log(error);
    }
    }
    
    static reviewcustomer = async(req,res)=>{
        try {
            const { customerid, customername } = req.body;

            const result = await customermodel.find({
              customerid: customerid,
              customername: customername
            });
            const custlen=result.length
            var key= new Array();
            const element=1;
            var erro=1;
            for(var i=0;i<custlen;i++){
      if(customerid==result[i].customerid && customername==result[i].customername){
        key[i]=1;
      }
      else{
        key[i]=0;
      }
            }
            var index=key.indexOf(element);
            if(index== -1){
                erro=0
             //   console.log("error");
                res.render('customerlogin',{result: result, error: erro})
            }
            else{
               // console.log("render");
            res.render('customerlogin', {result});
            }
        } catch (error) {
            console.log(error)
        }
    }

    static depositeamount= async (req,res)=>{
        try {
            const amount=req.body.amount;
            const depositeamount=parseInt(amount);
            const customerid=req.params.id;
            const dbamount= await customermodel.find({customerid:customerid},'remainingcredit');
            const creditnow=dbamount[0].remainingcredit;
            const finalamount=creditnow - depositeamount;
            const result1 =await customermodel.updateOne({customerid:customerid},{remainingcredit:finalamount,lastdeposite:depositeamount})
            const result =await customermodel.find({customerid:customerid});
            res.render('customerlogin',{result});
        } catch (error) {
            console.log(error)
        }
    }
}
    
    module.exports= customerlogincontroller;