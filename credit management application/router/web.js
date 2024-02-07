const logincontroller=require("../controller/logincontroller")
const accesscontroller=require("../controller/accesscontroller")
const Addcustomercontroller=require("../controller/Addcustomercontroller");
const customerlogincontroller=require("../controller/customerlogincontroller");
const depositecontroller=require("../controller/depositecontroller");
const itemcontroller=require("../controller/itemcontroller")
const itemeditcontroller= require("../controller/itemeditcontroller");
const express=require("express");
const router=express.Router();

router.get("/",logincontroller);
router.get("/access",accesscontroller);
router.get("/access/addcustomer",Addcustomercontroller.renderAddcustomer);
router.get("/access/customerlogin",customerlogincontroller.rendercustomerlogin);//redirect
router.get("/access/customerlogin/deposite/:id",depositecontroller.renderdeposite);
router.get("/access/customerlogin/item/:id",itemcontroller.renderitem);
router.get("/access/customerlogin/item/itemedit/:itemname/:id",itemeditcontroller.renderitemedit);
router.get("/access/customerlogin/:id/:totalcredit",itemcontroller.addcredit);
//router.get("/access/customerlogin/:id/:amount",customerlogincontroller);
//router.get("/access/customerlogin",customerlogincontroller);//.redirect
router.post("/access",accesscontroller);
router.post("/access/addcustomer",Addcustomercontroller.createdoc);
router.post("/access/customerlogin",customerlogincontroller.reviewcustomer);
router.post("/access/customerlogin/:id",customerlogincontroller.depositeamount);
router.post("/access/customerlogin/item/:id",itemcontroller.addcart);
router.post("/access/customerlogin/item/delete/:itemname/:id",itemcontroller.deleteitem);
router.post("/access/customerlogin/item/update/:id/:itemname",itemeditcontroller.updateitem)

module.exports=router;

