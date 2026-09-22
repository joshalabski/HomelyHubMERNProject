//this isknown  as the state manager
//we should get all list of properties
//count how many properties
//add search filters,
//add loading flag- to show that the backend is getting it, assuming the internet speed isnt that good, the loading flag shows, and once the data is fetched the flag closes
//error 

import {createSlice} from "@reduxjs/toolkit";

const propertySlice = createSlice({
  name : "property",
  initialState:{
    properties:[],
    totalProperties:0,
    searchParams:{},
    error:null,
    loading: false
  },
  //reducers are functions that are allowed to change the state, it must be asynchronous, flips loading flag on,
  reducers:{
    getRequest(state){
      state.loading = true;
    },
    getProperties(state, action){
      state.properties = action.payload.data;
      state.totalProperties = action.payload.all_properties;
      state.loading = false;//request finished - hide the loader
    },
    //this will update the filters used by the listing API, it is dispatched before the API call, 
    updateSearchParams:(state,action)=>{
      state.searchParams = Object.keys(action.payload).length === 0 ?{}:{
        //coppy the old ones, then copy the new one(i dont know - we learn )
        ...state.searchParams,
        ...action.payload
      }
    },
    getErrors(state,action){
      state.error = action.payload;
    }
  }
})

//.actions means it auto generates thhe action creators, one for reducers key above(we need to understand more later!)
//also were exporting it so we can access it in the property action file easily
export const propertyAction = propertySlice.actions

export default propertySlice;