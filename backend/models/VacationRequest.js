const mongoose = require("mongoose");

const VacationRequestSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["En attente", "Approuvé", "Refusé"],
    default: "En attente",
  },
  reason: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("VacationRequest", VacationRequestSchema);
