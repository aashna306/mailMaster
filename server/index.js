import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';

import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to the mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected");
});


//middlewares
app.use(express.json())
app.use(cookieParser());
app.use(cors());

app.get('/hi', (req, res) => {
    res.send('Hello World!');
  });

app.listen(process.env.PORT, () => {
    connect();
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
  