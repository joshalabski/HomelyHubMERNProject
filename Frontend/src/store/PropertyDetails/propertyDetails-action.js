import { propertyDetailsAction } from "./propertyDetails-slice";
import {axiosInstance} from "../../utils/axios";

//fetch details of one specific property using the property id
//receive propertyid
//start loading
//call backend api
//wait for response
//get the property data
//store the details in redux
//if error store error in redux
//all the actions above is the flow of the entire logic in this js file

export const getPropertyDetails  =(id)=>async(dispatch) =>{
  try{
    dispatch(propertyDetailsAction.getListRequest());
    const response = await axiosInstance(`/v1/rent/listing/${id}`);

    console.log(response);
    if(!response){
      throw new Error ("Could not fetch any propertyDetails")
    }
 
    const {data} = response.data;
    dispatch(propertyDetailsAction.getPropertyDetails(data))

  }catch(error){
    dispatch(propertyDetailsAction.getErrors(error.response.data.error))
  }
}
  

