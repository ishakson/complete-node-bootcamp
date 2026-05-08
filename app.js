const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    res.status(200).json({name:"ishak"})
})

app.post("/",(req,res) =>{
    res.send("hello post")
})

const port = 3000;

app.listen(port,(req, res)=>{
    console.log("server is listening on port 3000!")
})