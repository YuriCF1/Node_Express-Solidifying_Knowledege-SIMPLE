import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" }); //Durante desenvolvimento
// dotenv.config(); //Producao

async function connectOnDatabase() {
  mongoose.connect(
    `mongodb+srv://yuricruzfranca:${process.env.PASSWORD}@clusterfreegooglecloud.if5t6ww.mongodb.net/livraria?retryWrites=true&w=majority&appName=ClusterFreeGoogleCloud`
  );

  return mongoose.connection;
}

export default connectOnDatabase;
