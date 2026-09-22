//user  schema

import mongoose from "mongoose";
import validator from "validator";
import bycrypt from "bcrypt";
import crypto from "node:crypto";

const userSchema = new mongoose.Schema(
  {
    name:{
      type:String, 
      required: [true, "Please enter your name!"] ,
      //removes spaces at the start and the end
      trim: true,
      maxLength: [50, "your name cannot be longer thsn 50 characters!"],
    },
    email:{
      type: String,
      required: [true, "Please enter email ID"],
      //to prevent duplicates
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please enter a valid email address!"]
    },
    password:{
      type: String,
      required: [true, "Please enter password!"],
      minLength: [6, "Your passwword must be longer than 6 characters!"],
      //do not fill this by default
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password!"],
      validate: {
        validator: function(el){
          return el === this.password
        },
        message: "Passwords are not the same!"
      }
    },
    phoneNumber:{
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role:{
      type: String,
      //only two values are allowed in enum
      //basically iguess this is to juust have 2 roles
      //to confirm
      enum:["user", "admin"],
      default: "user"
    },
    avatar:{
      url:{type:String},
      public_id:{type:String},
    },
    passwordChangedAt:{
      type:Date
    },
    passwordResetToken:{
      type:String, 
      //should not be displayed 
      //thats why i we use select:false...to me 
      select: false,
      index: true
    },
    passwordResetExpires:{
      type:Date,
      select:false,
    },
  },
  {timestamps:true}
)

//basically settings to not pass in response from 
//server
userSchema.set("toJSON", {
  //ret is the object about to be sent
  transform:function (doc, ret){
    delete ret.password;
    delete ret.passwordConfirm;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpires;
    //mongos version number is ret.v
    delete ret.__v;
    return ret;
  }
})

//password logic
//hashing
userSchema.pre("save", async function(){
  if(!this.isModified("password")) return;

  //12 means harder and tasker to break
  this.password = await bycrypt.hash(this.password, 12)
  this.passwordConfirm = undefined;
})

//login check
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
  return await bycrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
  if(this.passwordChangedAt){
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime()/1000,
      10
    );
    return JWTTimestamp < changedTimestamp
  }
  return false;
}

//forgot password 
//this is what makes the reset link to the users 
userSchema.methods.createPasswordResetToken = function(){
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  //link dies after 10 minutes
  this.passwordResetExpires =Date.now() + 10 *60 *1000;
  return resetToken;
}


//mongoose.model takes the name and the 
//logic we just created and gives it  in another model
//this then makes the design a working tool

const User = mongoose.model("User", userSchema);
//in mongodb it creates Users
//export in curly braces so we can use in importing
export {User};