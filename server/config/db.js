import mongoose from 'mongoose'

export const connectDB =async()=>{
    try {

        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.error(`❌ Database connection failed: ${error.message}`);
        process.exit(1);
        
    }

    mongoose.connection.on('disconnected',()=>{
        console.warn('⚠️ MongoDB connection lost! Retrying...')
    });

}

export default connectDB;