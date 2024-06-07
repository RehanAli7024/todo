const mongoose = require("mongoose");

const connection = async(req,res) =>{
    try {
        await mongoose.connect("mongodb+srv://rehanali:rehanaliraza@cluster0.ixfj3nl.mongodb.net/").then(()=>{
        console.log("connected to database");
    })
    } catch (error) {
        console.log(error);
    }
}

connection();