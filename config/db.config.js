import mongoose from "mongoose";

async function connect() {
  try {
    mongoose.set("strictQuery", true);
    const dbConnect = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`conectado ao db ${dbConnect.connection.name}`);
  } catch (error) {
    console.log(error);
  }
}

export default connect;
