process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
});

const express = require("express");
const { dbConnection } = require("./src/database/dbConnection");
const index = express();
var cors = require('cors')
require("dotenv").config({ path: "./config/.env" });
const port = process.env.PORT || 4000;
var morgan = require("morgan");
const AppError = require("./src/utils/AppError");
const globalMiddlewareErr = require("./src/utils/globalMiddlewareErr");
const sendPushNotification = require("./src/utils/SendNotification");
//middleware
index.use(express.json());
index.use(express.urlencoded({extended:false}))
index.use(cors({}))

index.use(express.static("uploads"));
index.use("/api/v1/users", require("./src/components/user/user.api"));
index.use("/api/v1/trips", require("./src/components/Trip/trip.api"));
index.use("/api/v1/flightTrip", require("./src/components/flightTrip/flightTrip.api"));
index.use("/api/v1/support", require("./src/components/supportUser/support.api"));
index.use("/api/v1/fine", require("./src/components/Fines/fines.api"));
index.use("/api/v1/driver", require("./src/components/driver/driver.api"));
index.use("/api/v1/apologies", require("./src/components/apologies/apologies.api"));
index.use("/api/v1/review", require("./src/components/review/review.api"));
index.use("/api/v1/driverCar", require("./src/components/driverCar/car.api"));
index.all("*", (req, res, next) => {
  next(
    new AppError(`can't find this route: ${req.originalUrl} on server`, 404)
  );
});
// global error handling middleware
index.use(globalMiddlewareErr)
dbConnection();
index.listen(port, () => console.log(`Example app listening on port ${port}!`));

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
});
