//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
var request= require("request");
const path= require("path");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", function(req,res){
  res.sendFile(__dirname +"/signup.html" );
});

app.post("/",function(req,res){
  const name=req.body.username;
  const pass= req.body.password;
  const em=req.body.email;

var data={
  members: [
    {
      email_address:em,
      status: "subscribed",
      merge_fields:{
          FNAME: name,
          LNAME: pass

      }
    }
  ]


};


const jsonData= JSON.stringify(data);
const url= "https://us5.api.mailchimp.com/3.0/lists/9d18076801";

const options= {
  method:"POST",
  auth:"shaila1:be240340434db188db8099385fa3afce-us5"
};

const request = https.request(url,options,function(response){
if(response.statusCode===200){
  res.send("successfull!!!");
}

  response.on("data",function(data){
    console.log(JSON.parse(data));
  });
});

request.write(jsonData);
request.end();




});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});

//api key -- be240340434db188db8099385fa3afce-us5
//unique id  9d18076801
