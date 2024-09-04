import {config} from "dotenv"
import { connect } from "mongoose"
config()
const mongo_url = process.env.MONGO_URL
export const MongoDB = async ()=>{
    await connect(mongo_url)
        .then(()=> console.log("Database connected!"))
        .catch((err)=> console.log("database error!",err))
}