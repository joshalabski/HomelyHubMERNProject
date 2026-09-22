//managing the booking

//store all bookings
//store individual booking details
//track the api loading status
//add the new bookings once a booking is created
//update the booking data when we receive for the backend


import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  bookingDetails:{},
  loading:false
}

const bookingSlice = createSlice({
  name:"booking",
  initialState,
  reducers:{
    setBookingRequest(state){
      state.loading = true;
    },
    //this stores the bookings received from the api
    setBookings(state, action){
      state.bookings = action.payload;
      state.loading = false
    },
    addBooking:(state,action)=>{
      //adding bookings(self explanatory really)
      state.bookings.push(action.payload);
    },
    setBookingDetails:(state,action)=>{
      state.bookingDetails = action.payload.bookings;
    }
  }
})

export const {setBookings, addBooking, setBookingDetails} = bookingSlice.actions;
export default bookingSlice;
