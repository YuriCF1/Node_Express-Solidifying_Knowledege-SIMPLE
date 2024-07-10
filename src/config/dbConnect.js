import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" }); //Durante desenvolvimento
// dotenv.config(); //Producao

async function connectOnDatabase() {
  mongoose.connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@clusterfreegooglecloud.if5t6ww.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=ClusterFreeGoogleCloud`
  );

  return mongoose.connection;
}

export default connectOnDatabase;
