const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShiftSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: "Employee" },
  startTime: String,
  endTime: String,
});

const DayScheduleSchema = new Schema({
  date: Date,
  shifts: [ShiftSchema],
});

const PlanningSchema = new Schema({
  weekStart: Date,
  schedules: [DayScheduleSchema],
});

module.exports = mongoose.model("Planning", PlanningSchema);
