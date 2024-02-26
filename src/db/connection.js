const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()
const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${URI}`)
        console.log(`\n MongoDB Connected!! DB_HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection Failed: ",error)
        process.exit(1)
    }
};

module.exports = { connectDB };
