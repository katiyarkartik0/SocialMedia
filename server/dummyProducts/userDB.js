import mongoose from "mongoose";
import UserJson from "../dummyProducts/user.json" assert { type: "json" };
import User from "../models/User.js";
import dotenv from "dotenv";

//CONFIGURATION
dotenv.config();

//

const start = async()=>{
    try{
        //MONGOOSE SETUP
        await mongoose.connect('mongodb+srv://dbAccessUser:0kyH1AwowfPxtGUV@socialmediaapp.iawfl68.mongodb.net/SocialMediaApp?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        //MONGODB POPULATING
        await User.create(UserJson);
    }
    catch(err){
        console.log(err)
    }
}

start();