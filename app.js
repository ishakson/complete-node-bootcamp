const express = require("express");
const fs = require("fs")

const app = express();
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`))
app.get("/api/v1/tours", (req, res)=>{
    res.status(200).json({
        status: "success",
        data: {
            tours
        }
    })
})

const port = 3000;

app.listen(port,(req, res)=>{
    console.log("server is listening on port 3000!")
})