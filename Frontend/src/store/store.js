import {configureStore} from "@reduxjs/toolkit";
import propertySlice from "./Property/property-slice.js";
import propertyDetailsSlice, { propertyDetailsAction } from "./PropertyDetails/propertyDetails-slice.js";
import userSlice from "./User/user-slice.js";
import bookingSlice from "./Booking/booking-slice.js";
import accomodationSlice from "./Accomodation/Accomodation-slice.js";
import paymentSlice from "./Payment/payment-slice.js"

//anything weve created we have to store so we can use it in components
const store = configureStore({
  reducer:{
    properties:propertySlice.reducer,
    propertydetails: propertyDetailsSlice.reducer,
    user: userSlice.reducer,
    booking: bookingSlice.reducer,
    accomodation:accomodationSlice.reducer,
    payment: paymentSlice.reducer
  }
})

export default store;