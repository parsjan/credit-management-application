const usermodel=require("../model/usermodel");


const accesscontroller= async (req,res)=>{
    try {
        const{username,password}=req.body;

        console.log (req.body);
        // console.log(req.body);
        const result=await usermodel.find()
        const flag=result.length;
        var key= new Array();
        const element=1;
        var erro=1;
        for(i=0;i<flag;i++){
         //   console.log("check");
            if(username==result[i].username && password==result[i].password){
                key[i]=1;
              // console.log("check")
            }
            else{
                 key[i]=0;
              //console.log("not check")
             // console.log(result[i].username);
            }
        }
        var index=key.indexOf(element);
        if (index== -1){
            erro=0
            console.log("error");
            res.render("login.ejs",{erro : 0})
        }
        else{

            res.render("access.ejs");
        }
    } 
    catch (error) {
        console.log(error);
    }
    }
    
    module.exports=accesscontroller;