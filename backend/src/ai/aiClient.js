import Groq from "groq-sdk";
import dotenv from "dotenv"

dotenv.config();

//this is basically our ai connection api, we can all it wherever we need the ai
const groq = new Groq({
  apiKey:process.env.GROQ_API_KEY
});

export default groq;