import mongoose from "mongoose"

const connection = {isConnected:0};

export const connectToDb = async () => {
  try {
    if(connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    
    const db = await mongoose.connect(process.env.MONGO || '');
    connection.isConnected = db.connections[0].readyState;
  } catch (error:any) {
    console.log(error, 'at connection db');
    throw new Error(error);
  }
};