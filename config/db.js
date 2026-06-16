import mongoose from "mongoose";

const dbconnect = async () => {
    const mongoUrl = process.env.MONGODB_URL;
  try {
    const conn = await mongoose.connect(mongoUrl);
    if (process.env.ENV === 'development') {
        console.log(`MongoDB Connected successfully: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { dbconnect };   