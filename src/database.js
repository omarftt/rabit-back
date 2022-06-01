import mongoose, { connection } from "mongoose";
import config from "./config";

export const connect = (url = config.db, opts = {}) => {
  return mongoose.connect(url, { ...opts, useNewUrlParser: true });
};

export const disconnect = () => {
  
  return mongoose.disconnect();
} 
