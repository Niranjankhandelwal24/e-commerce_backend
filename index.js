const express = require('express');
const server = express();
  const cors=require("cors");
  const bodyparser=require("body-parser");
  const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var db="ShoppingPortal";
mongoose.connect('mongodb://localhost:27017/'+db,{useNewUrlParser : true});
 
var productSchema = new Schema({
  name : String  ,
  type : String ,
  price : Number ,
  quantity : Number ,
  description : String,
  image : String
  })

   var product = mongoose.model('product',productSchema);

  server.use(cors())
  server.use(bodyparser.json());
  const products= [];

  server.post("/product",function(req,res)
  {
    var p1 = new product;
    p1.name = req.body.name;
    p1.type = req.body.type;
    p1.price = req.body.price;
    p1.quantity = req.body.quantity;
    p1.description = req.body.description;
    p1.image = req.body.image;
    p1.save();

    res.json(p1);
  })


  server.get("/getproduct",function(req,res)
  {
   product.find(function(err,data){
        console.log(data)
        res.json({products:data})})
  })
  


  var signupSchema = new Schema({
       username: { type: String, required: true },
       email_id : {type : String ,required : true ,unique:true},
       password: { type: String, required: true },
       address : { type :String},
       mobile_no : { type : Number}
  })
 
  var signup = mongoose.model("signup",signupSchema);

 
  server.post("/signup",function(req,res)
  {
  var s1 = new signup;
  s1.username = req.body.username;
  s1.email_id = req.body.email_id;
  s1.password = req.body.password;
  s1.save();
  res.json(s1)
  })

 server.post("/myaccount" , function(req,res)
 {
  let username = req.body.username;
  let email_id = req.body.email_id;
  let address = req.body.address;
  let mobile_no = req.body.mobile_no;
  console.log(address);
  console.log(mobile_no);
  console.log(username);
  console.log(email_id);
  signup.findOneAndUpdate({'email_id':email_id},{$set:{'username':username , 'address':address , 'mobile_no':mobile_no }}).exec(function (err, user) {
    if(err){}
    console.log(user)
 })
});

server.get("/getaccount",function(req,res)
  {
   signup.find(function(err,Data){
        console.log(Data)
        res.json(Data)})
  })
  


 var loginSchema = new Schema({
 email_id : {type : String ,required : true ,unique:true},
 password: { type: String, required: true }
})

var login = mongoose.model("login",loginSchema);

server.post("/login",function(req,res)
{
let email_id = req.body.email_id;
let password = req.body.password;

console.log(email_id);
console.log(password);

signup.findOne({'email_id':email_id,'password':password}).exec(function (err, user) {
  if(err){
      res.json({error:err})
  } else {
    if(user)
    res.json({error:null,user:user})
    else{
    res.json({error:"user_not_found"})
    }
  }
  console.log(user)
});});



  var ItemSchema = new Schema({
    name : String  ,
    type : String ,
    price : Number ,
    quantity : Number 
  })


  var OrderSchema = new Schema({
    Order_number: String ,
    items : [ItemSchema] ,
    DeliveryDate : Date ,
    Totalprice : Number ,
  
  })

  var Order = mongoose.model('myorder',OrderSchema);
  const  orders = [];

  server.post("/myorder",function(req,res)
  {console.log(req.body)
   var i1 = new Order;
   i1.Order_number = 1;
   i1.items = req.body.items;
   i1.DeliveryDate = new Date();
   i1.Totalprice = req.body.Totalprice;
  i1.save();
  res.json(i1);
  })


  server.get("/getorder",function(req,res)
  {
   Order.find(function(err,data){
        console.log(data)
        res.json(data)})
  })
  


  server.listen(8081,function()
  {console.log("server started")
})
