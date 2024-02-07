const web=require("./router/web")
const path=require("path")
const connect=require("./db/connectdb.js")
const express=require('express');
const app=express();
const port=process.env.PORT||3000;
const DATABASE_URI=process.env.DATABASE_URI||"mongodb://127.0.0.1:27017"

//database connection
connect(DATABASE_URI);

//to take data using parser
app.use(express.urlencoded({extended:false}))

//setup the directory where templates files are located
app.set("views","views")

//setup the template engine to use
 app.set("view engine","ejs");


//static Files
app.use(express.static(path.join(process.cwd(),"public")))
app.use("/access",express.static(path.join(process.cwd(),"public")))
app.use("/access/addcustomer",express.static(path.join(process.cwd(),"public")))
app.use("/access/customerlogin",express.static(path.join(process.cwd(),"public")))
app.use("/access/customerlogin/deposite/:id",express.static(path.join(process.cwd(),"public")))
app.use("/access/customerlogin/item/:id",express.static(path.join(process.cwd(),"public")))
app.use("/access/customerlogin/item/itemedit/:item",express.static(path.join(process.cwd(),"public")))
app.use("/access/customerlogin/:id/:amount",express.static(path.join(process.cwd(),"public")))


//load router
 app.use("/",web);
 

 app.listen(port,()=>{
    console.log(`listening to port : ${port}`);
});