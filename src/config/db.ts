import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || '', {
      
    });
    console.log("MongoDB bağlandı");
  } catch (error) {
    console.error("MongoDB bağlanamadı:", error);
    process.exit(1);
  }
};

export default connectDB;
