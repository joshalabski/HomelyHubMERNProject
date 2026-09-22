//receives the user informaation
//validate the required information
//send the information to our AI trip planner
//calculate the budget per night
//search  in database(mongodb) for suitable properties
//send both AI trip plan + matching properties back to the frontend/user


import {Property} from "../Models/propertyModel.js";
import { planTrip } from "../ai/tripPlanner.js";
import { generateDescription } from "../ai/generateDescription.js";

const cleanCity = (text) => text.toLowerCase().replaceAll(" ", "")

const createTripPlan = async(req,res) =>{
  try{
    const {destination, budget, days, people, interests} = req.body
    //validate the required fields selected by the user
    if(!destination || !budget || !days || !people){
      return res.status(400).json({
        status:"fail",
        message:"Please fill in the destination, budget, days, and people"
      })
    }

    const plan = await planTrip({
      destination, 
      budget, 
      days, 
      people, 
      //interests can be chosen or not
      interests: interests || []
    });

    //to calculate the budget per night
    const perNight = Number(budget)/ Number(days);

    //basically to search for the property cleaner
    const city = cleanCity(destination);

    //search properties available
    const properties = await Property.find({
      $or:[
        {"address.city": city},
        {"address.state": city},
        {"address.area": city}
      ],
      price:{$lte: perNight},
      maximumGuest:{$gte: Number(people)},
    }).limit(6);

    //final respoonse to frontend
    res.status(200).json({
      status:"success",
      data:{plan, properties, perNight}
    })
  }catch(error){
    res.status(500).json({
      status:"fail",
      message:"Could not create a trip plan, please try again!"
    })
  }
}

//this is the 
const writeDescription = async(req,res)=>{
  try{
    const description = await generateDescription(req.body);

  res.status(200).json({
    status:"sucucess",
    data:{description}
  })
  }catch(error){
    res.status(500).json({
      status:"fail",
      message:"Could not generate a description"
    })
  }
}

export {createTripPlan, writeDescription};