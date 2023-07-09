const { Router } = require("express");
const Patient = require("../model/Patient");

const router = Router();

router.post("/addPatient", async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const patient = new Patient(body);

    await patient.save();

    res.status(200).send(patient);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const query = req.query;
    const page = query.page;
    const limit = query.limit;

    const patients = await Patient.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).send(patients);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

module.exports = router;
