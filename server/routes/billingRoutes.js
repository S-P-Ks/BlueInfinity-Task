const { Router } = require("express");
const Billing = require("../model/Billing");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    const billing = new Billing(body);

    await billing.save();

    res.status(201).json(billing);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const query = req.query;
    console.log(query);

    const billings = await Billing.find({
      created_at: {
        $gte: query.startDate,
        $lt: query.endDate,
      },
    });

    res.status(200).json(billings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

module.exports = router;
