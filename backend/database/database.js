const mongoose=require("mongoose")

exports.connectDatabase = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://basnethusen7_db_user:UEW3pv3pAZ6QzOus@cluster0.ypcgabm.mongodb.net/?appName=Cluster0",
            {
                // recommended options can be added here
                // useNewUrlParser: true, useUnifiedTopology: true are defaults in newer mongoose
            }
        );
        console.log("Database connected successfully!");
    } catch (err) {
        console.error("Database connection error:", err.message || err);
        // rethrow so app startup can handle crash if needed
        throw err;
    }
};
