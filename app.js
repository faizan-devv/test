const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");

const errorMiddleware = require("./middlewares/errors");

app.use(express.json({ limit: "50mb" }));
app.use(
  bodyparser.json({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(
  bodyparser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cookieParser());
app.use(cors());

//import all routes
const auth = require("./routes/auth");
const categories = require("./routes/categories");
const vehicle = require("./routes/vehicle");

app.use("/api/v1", auth);
app.use("/api/v1", categories);
app.use("/api/v1", vehicle);

// if (process.env.NODE_ENV === "PRODUCTION") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
//   });
// }

//Middleware to handle errors
app.use(errorMiddleware);
module.exports = app;
