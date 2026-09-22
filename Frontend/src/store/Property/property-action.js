import { propertyAction } from "./property-slice.js";
import {axiosInstance} from "../../utils/axios.js";

//create the function for getting all the properties
//1.start api request
//2.Tell redux loading started
//3.Get search parameters
//4.call the backend api
//Wait for response
//6.Get the property data(if respnse is successful)
//send data to redux store
//if error occurs then send error to redux

//dispatch means send to redux 
//getState means GET data from redux

export const getAllProperties = ()=> async(dispatch, getState) =>{
  try{
    console.log("API call started!");

    dispatch(propertyAction.getRequest());

    const {searchParams} = getState().properties

    console.log(searchParams)

    const response = await axiosInstance.get(`/v1/rent/listing`, {
      params:{...searchParams }
    })

    

    if(!response){
      throw new Error ("Could not fetch any Properties")
    }

    const {data} = response;
    console.log(data);

    dispatch(propertyAction.getProperties(data))

  }catch(error){
    dispatch(propertyAction.getErrors(error.message))
  }
}
  

