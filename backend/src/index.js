import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";  
import {router} from "./routes/userRoutes.js";
import { propertyRouter } from "./routes/propertyRouter.js";
import { bookingRouter } from "./routes/bookingRouter.js";
import { tripRouter } from "./routes/tripRouter.js";

import connectDB from "./utils/db.js";

dotenv.config();

//creating the application
const app = express();

//express.json- understands the json bodies
//when the browser send the data to us, that data doesnt 
//arrive as a neat object, it arrives as a text, so express
//doesnt understand it by default 

//acts as a middleware
app.use(express.json({limit:"100mb"}))

//second middleware- urlencoded
//when the plain html form is submitted, 
//data is not come as json it comes
//in a form style
app.use(express.urlencoded({limit:"100mb", extented:true}))

//cookieParser
//explains the cookie text into a clear object
//after logging, small piece of text the browser stores 
//cookie arrives as text
//all requests passes through all these middlewares
app.use(cookieParser())

app.use(cors({
  origin:process.env.ORIGIN_ACCESS_URL,
  credentials:true
}))



const port = process.env.PORT;

//one test route
app.get("/", (req,res) => {
  res.send("Homelyhub server is running")
} )

app.use("/api/v1/rent/user", router);
app.use("/api/v1/rent/listing", propertyRouter)
app.use("/api/v1/rent/user/booking", bookingRouter)
app.use("/api/v1/rent/trip", tripRouter)

connectDB();

//to start server and keep it running
app.listen(port, () => {
  console.log(`App is running on port no: ${port}`);
})

 