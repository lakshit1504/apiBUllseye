import app from "./app.js";
import { connectDB } from "./config/database.js";
import Razorpay from "razorpay";
connectDB();

export const instance = new Razorpay({
  key_id: "rzp_test_Qr8jnc24aHOYbE",
  key_secret: "GkQFoPsJdFreKB9NgOO1qXUE",
});

app.get("/", (req, res, next) => {
  res.send("<h1>Working</h1>");
});

app.listen(4000, () =>
  console.log(
    `Server is working on PORT: 4000, in ${process.env.NODE_ENV} MODE`
  )
);
