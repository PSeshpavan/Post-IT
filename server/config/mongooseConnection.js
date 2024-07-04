import mongoose from "mongoose";
// import debug from "debug";
// const dbgr = debug('development:mongooseConnection');

const connectDB = async () => {
    try {
    await mongoose.connect("mongodb://localhost:27017/ICloneDB")
        console.log(("Connected to MongoDB"))
    } catch (err) {
        console.log("Error Connecting to MongoDB", err)
    }
}


export default connectDB;