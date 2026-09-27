import mongoose from 'mongoose';

export let isUsingMongoDB = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.trim() === '') {
    console.log('ℹ️  No MONGODB_URI provided in .env. Running with resilient built-in Memory Data Engine.');
    isUsingMongoDB = false;
    return false;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB Atlas connected successfully!');
    isUsingMongoDB = true;
    return true;
  } catch (error) {
    console.warn('⚠️ MongoDB Atlas connection failed:', error.message);
    console.log('🔄 Falling back to built-in Memory Data Engine for offline/demo operation.');
    isUsingMongoDB = false;
    return false;
  }
};
