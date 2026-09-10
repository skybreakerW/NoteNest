import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`)

        console.log(`Connected to DB: `, connectionInstance.connection.name)
        console.log(`DB Host: `, connectionInstance.connection.host)

        return connectionInstance

    } catch (error) {
        console.log("Connection failed to DB!!", error)
        throw error
    }

    
}

export { connectDB }