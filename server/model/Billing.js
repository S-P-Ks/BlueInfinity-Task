const mongoose = require("mongoose");
const schema = mongoose.Schema;

const BillingSchema = mongoose.Schema(
  {
    items: {
      type: Array,
      default: [],
    },
    billNo: Number,
    recieptNo: Number,
    patient: {
      type: schema.Types.ObjectId,
      ref: "Patient",
    },
    tax: Number,
    discount: Number,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Billing = new mongoose.model("Billing", BillingSchema);

module.exports = Billing;
