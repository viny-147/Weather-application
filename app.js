const { response, urlencoded } = require("express");
const express=require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req, res){

    res.sendFile(__dirname+"/index.html");
    
});

app.post("/", function (req, res) {
   
    const apiKey = "Your API key";
    const units = "metric";
    const cityName = req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units="+units+"&appid="+apiKey;

    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const myData=JSON.parse(data);
            //console.log(myData);
            const currentTemp=myData.main.temp;
            const dataDesc =myData.weather[0].description;
            const dataIcon=myData.weather[0].icon;
            const iconUrl="http://openweathermap.org/img/wn/"+dataIcon+"@2x.png";
            res.write("<h1>The current weather in "+cityName+" is "+currentTemp+" degree celcius.</h1>");
            res.write("<img src='"+iconUrl+"'>");
            res.write("<p>It seems today you have a "+dataDesc+" ...!</p>");
            res.send();
            
        });
    });
});



app.listen(3000, function(){
    console.log("You have been connected to port 3000.");
});