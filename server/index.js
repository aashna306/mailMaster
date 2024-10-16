// // import express from "express";
// // import dotenv from "dotenv";
// // import mongoose from "mongoose";
// // import cors from 'cors';
// // import userRoute from "./routes/UserRoute.js"
// // import mail_domainRoute from "./routes/Email_domain_route.js"
// // import cookieParser from 'cookie-parser';

// // const app = express();
// // dotenv.config();

// // const connect = async () => {
// //   try {
// //     await mongoose.connect(process.env.MONGO);
// //     console.log("Connected to the mongodb");
// //   } catch (error) {
// //     throw error;
// //   }
// // };

// // mongoose.connection.on("disconnected", () => {
// //     console.log("mongodb disconnected");
// // });


// // //middlewares
// // app.use(express.json())
// // app.use(cookieParser());
// // app.use(cors());


// // //routes
// // app.use("/user",userRoute); 
// // app.use("/info",mail_domainRoute);

// // app.get('/hi', (req, res) => {
// //     res.send('Hello World!');
// //   });

// // app.listen(process.env.PORT, () => {
// //     connect();
// //     console.log(`Server is running at http://localhost:${process.env.PORT}`);
// // });
  


// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from 'cors';
// import userRoute from "./routes/UserRoute.js";
// import mail_domainRoute from "./routes/Email_domain_route.js";
// import cookieParser from 'cookie-parser';
// import Separation_route from "./routes/Separation_route.js"

// const app = express();
// dotenv.config();

// const connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO);
//     console.log("Connected to the mongodb");
//   } catch (error) {
//     throw error;
//   }
// };

// mongoose.connection.on("disconnected", () => {
//   console.log("mongodb disconnected");
// });

// // Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors());

// // Routes
// app.use("/user", userRoute); 
// app.use("/info", mail_domainRoute);

// app.use('/', Separation_route);


// // Start the server
// app.listen(process.env.PORT, () => {
//   connect();
//   console.log(`Server is running at http://localhost:${process.env.PORT}`);
// });


import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
import userRoute from "./routes/UserRoute.js";
import mail_domainRoute from "./routes/Email_domain_route.js";
import cookieParser from 'cookie-parser';
import Separation_route from "./routes/Separation_route.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to the MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Middlewares
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));

// Routes
app.use("/user", userRoute); 
app.use("/info", mail_domainRoute);
app.use('/', Separation_route);



// Start the server
app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
