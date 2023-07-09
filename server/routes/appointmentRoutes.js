const { Router } = require("express");
const Appointment = require("../model/Appointment");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    const appointment = new Appointment(body);

    await appointment.save();

    res.status(201).json(appointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const body = req.body;

    const appointments = await Appointment.find();

    res.status(200).json(appointments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

module.exports = router;
