import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const ConnetDB = async () => {
    console.log(process.env.MONOGODB_URL)
    try {
        await mongoose.connect(`${process.env.MONOGODB_URL}/${DB_NAME}`)
        console.log("db connected")
    } catch (error) {
        console.log(" fail to connect to db" + error);
        process.exit(1);
    }
}

export default ConnetDB