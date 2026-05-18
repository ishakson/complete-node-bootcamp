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
    let id = req.params.id * 1;
    id = tour = tours.find(el => el.id === id)
    if(id > tours.length){
        res.status(404).json()
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

const port = 3000;
app.listen(port,(req, res)=>{
    console.log("server is listening on port 3000!")
})