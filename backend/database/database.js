const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDatabase = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || "mongodb+srv://basnethusen7_db_user:UEW3pv3pAZ6QzOus@cluster0.ypcgabm.mongodb.net/?appName=Cluster0";
        
        await mongoose.connect(mongoURI, {
            // recommended options can be added here
            // useNewUrlParser: true, useUnifiedTopology: true are defaults in newer mongoose
        });
        console.log("Database connected successfully!");
    } catch (err) {
        console.error("Database connection error:", err.message || err);
        // rethrow so app startup can handle crash if needed
        throw err;
    }
};
