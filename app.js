const express = require("express");
const fs = require("fs")

const app = express();
app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`))
app.get("/",(req,res)=>{
    res.status(200).send("hello")
})
app.get("/api/v1/tours", (req, res)=>{
    res.status(200).json({
        status: "success", 
        data: {  
            tours
        }
    })
})
app.get("/api/v1/tours/:id", (req, res)=>{
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    if(!tour){
        return res.status(404).json({
            status:"fail",
            message:"invalid id"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
})

app.post("/api/v1/tours", (req,res)=>{
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId},req.body)
    tours.push(newTour)

    fs.writeFile(`${__dirname}/dev-data/data/tours.json`,JSON.stringify(tours),err =>{
        res.status(201).json({
            status:"success",
            data:{
                tour: newTour
            }
        })
     })
})
app.patch("/api/v1/tours/:id", (req, res)=>{
    if(req.params.id > tours.length){
        return res.status(404).json({
            status:"fail",
            message:"invalid id"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tour: "güncellendi"
        }
    })
})

const port = 3000;
app.listen(port,(req, res)=>{
    console.log("server is listening on port 3000!")
})