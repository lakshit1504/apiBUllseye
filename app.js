import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectPassport } from "./utils/Provider.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";


const app = express();
export default app;
dotenv.config({
  path: "./config/config.env",
});

// Using Middlewares
app.use(
  session({
    secret: "sdfjksdbfsdfbjssdfbjssdfdsfsdf",
    resave: false,
    saveUninitialized: true,

    cookie: { 
      secure: false,
      httpOnly: false,
      sameSite: false,
    },
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    credentials: true,
    origin: "https://bulls-eyeburgers-lw9t8vg4q-lakshit1504.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
   
    
  })
);


app.use(passport.session());
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

connectPassport();

// Importing Routes
import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";

app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

// Using Error Middleware
app.use(errorMiddleware);
