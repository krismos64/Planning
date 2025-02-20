const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: String,
  role: String,
  contractHours: Number,
  workedHours: Number,
  extraHours: Number,
  vacationDaysTotal: Number,
  vacationDaysUsed: Number,
  vacationDaysRemaining: Number,
  availability: [String],
  vacationRequests: [
    {
      startDate: Date,
      endDate: Date,
      status: { type: String, enum: ["En attente", "Approuvé", "Refusé"] },
    },
  ],
  manualAdjustments: [
    {
      date: Date,
      adjustmentType: { type: String, enum: ["Ajout", "Retrait"] },
      time: Number,
      justification: String,
    },
  ],
});

module.exports = mongoose.model("Employee", EmployeeSchema);
