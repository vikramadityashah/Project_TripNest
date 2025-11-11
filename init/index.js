const mongoose = require("mongoose");
const data = require("./data.js")
const Listing = require("../models/listing.js")

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/TripNest")
}
main().then(()=>{
    console.log("Mongoose connect successfully");
}).catch((err) =>console.log(err));


const initDB = async () =>{
    await Listing.deleteMany({});
    data.data = data.data.map((obj)=>({...obj,owner:"690496c7902301c27ae856b4"}))
    await Listing.insertMany(data.data);
    console.log("Data was initializes");
}

initDB();