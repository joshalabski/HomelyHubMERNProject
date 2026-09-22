//never jump directly into the code, always think
import slugify from 'slugify';
import mongoose  from 'mongoose';

//the schema:
const propertySchema = new mongoose.Schema({
  propertyName : {
    type: String,
    required:[true, "Please enter your property name!"]
  },
  description:{
    type:String,
    required:[true, "Please add information about your property!"]
  },

  extraInfo:{
    type:String,
    default:"Checkin on time. Good services."
  },
  propertyType:{
    type:String,
    enum:["House", "Flat", "Guest House", "Hotel"],
    default:"House"
  },
  roomType:{
    type:String,
    enum:["Anytype", "Room", "Entire Home"],
    default:"Anytype"
  },

  maximumGuest:{
    type:Number,
  required:[true, "Please give the maximum no of Guest that can occupy"]
  },

  amenities:[
    {
      name:{
        type:String,
        required:true,
        enum:[
          "Wifi",
          "Kitchen",
          "Ac",
          "Washing Machine",
          "TV",
          "Pool",
          "Free Parking"
        ]
      },
      icon:{
        type:String,
        required:true
      }
    }  
  ],
  images:{
    type:[
      {
        public_id:{
          type:String 
        },
        url:{
          type:String,
          required:true
        }
      }
    ],
    validate:{
      validator:function(arr){
        return arr.length >= 6;
      },
      message:"The images must contain atleast 6 images!"
    }
  },
  price:{
    type:Number,
    required:[true, "Please enter the price per night value"],
    default:500
  },
  address:{
    area:String,
    city:String,
    state:String,
    pincode:Number
  },
  //to make sure users arent able to book the same property on the same date, one user a unique date for all
  currentBookings:[
    {
      bookingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
      },
      fromDate:{
      type:Date
    },
    toDate:{
      type:Date
    },
    userId:{
     type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    }
  ],
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  slug:String,
  checkInTime:{type:String,  default:"11:00"},
  checkOutTime:{type:String,default:"13:00"}
})

//should get converted to slug and should save...if you get
//converts the name to url friendly
propertySchema.pre("save", function(){
  this.slug =slugify(this.propertyName,{lower:true});
})

//required for the search bar, removes the space to get 
//more accurate results 
propertySchema.pre("save", function(){
  this.address.city = this.address.city.toLowerCase().replaceAll("", "")
})

//const Property = mongoose.model("Property", propertySchema);

const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);

export{Property};