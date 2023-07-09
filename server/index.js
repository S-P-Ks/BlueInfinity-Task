const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const appointmentRouter = require("./routes/appointmentRoutes");
const patientRouter = require("./routes/PatientRoutes");
const billignRouter = require("./routes/billingRoutes");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/appointment", appointmentRouter);
app.use("/patient", patientRouter);
app.use("/billing", billignRouter);

mongoose
  .connect(`${process.env.MONGODB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(8080, () => {
      console.log("Server started on port 8080!");
    })
  )
  .catch((err) => console.log(err));
