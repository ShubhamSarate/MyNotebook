const mongoose = require('mongoose'); // npm i mongoose
const mongoURI = "mongodb://localhost:27017/iNotebook"; // Copied from Mongo-Compass

const connectToMongo = async () => {
    try{
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectToMongo;