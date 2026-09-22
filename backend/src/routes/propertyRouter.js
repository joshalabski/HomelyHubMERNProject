import express from "express"
import { getProperties, getProperty} from "../controllers/propertyController.js";

//express creates a mini router and then
//propertyRouter stores THAT mini router
const propertyRouter = express.Router()
propertyRouter.route("/:id").get(getProperty)

propertyRouter.route("/").get(getProperties)

export {propertyRouter};