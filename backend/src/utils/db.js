//to write the code related to mongodb
//mongoose helps to talk to mongodb through node
//mongodb = database, mongoose = library, to talk to mogodb

import mongoose from "mongoose"

//connectDb is the function, async is the action
//try means whatever we place there will be carried out
//and if any issue happens, catch collects it
//await- wait until it connects before running the next action
const connectDB = async() => {
  try{

    await mongoose.connect(process.env.MONGO_URI)
    console.log('Mongodb connnected!')

  }catch(error){
    console.error("MongoDb connection failed", error);
    //program ended with error- stops the program immediately
    //process.exit(0) - program ended successfully
    process.exit(1);
  }
}

//you must export it, so you can import it in another file
export default connectDB;