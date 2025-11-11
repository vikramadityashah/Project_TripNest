const { string, required } = require("joi");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true
    }
})

userSchema.plugin(passportLocalMongoose);//Its automatically provide username,password,hashing and salting by itself....

module.exports = mongoose.model("User",userSchema);