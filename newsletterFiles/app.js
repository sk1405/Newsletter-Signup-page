//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
var request= require("request");
const path= require("path");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html" );
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
const url= " ";//enter your url here

const options= {
  method:"POST",
   auth:" " //enter password
};

const request = https.request(url,options,function(response){
if(response.statusCode===200){
  res.sendFile(__dirname + "/success.html");

}
else{
  res.send("failure");
}

  // response.on("data",function(data){
  //   console.log(JSON.parse(data));
  // });
});

request.write(jsonData);
request.end();

});

app.listen(process.env.PORT || 5000, function(){
  console.log("Server is running on port 5000");
});
