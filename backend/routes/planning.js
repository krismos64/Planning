const express = require("express");
const router = express.Router();
const { optimizeSchedule } = require("../utils/schedule_optimizer.js");

router.get("/", async (req, res) => {
  try {
    const { weekStart } = req.query;
    const planning = await Planning.findOne({
      weekStart: new Date(weekStart),
    }).populate("schedules.shifts.employee", "name");
    res.json(planning?.schedules || []);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du planning" });
  }
});

router.post("/shifts", async (req, res) => {
  try {
    const { date, employeeId, startTime, endTime } = req.body;
    let planning = await Planning.findOne({
      weekStart: startOfWeek(new Date(date)),
    });

    if (!planning) {
      planning = new Planning({
        weekStart: startOfWeek(new Date(date)),
        schedules: [],
      });
    }

    const daySchedule = planning.schedules.find(
      (s) => s.date.toDateString() === new Date(date).toDateString()
    );

    if (daySchedule) {
      daySchedule.shifts.push({ employee: employeeId, startTime, endTime });
    } else {
      planning.schedules.push({
        date: new Date(date),
        shifts: [{ employee: employeeId, startTime, endTime }],
      });
    }

    await planning.save();
    res.status(201).json(planning);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du shift" });
  }
});

router.delete("/shifts/:id", async (req, res) => {
  try {
    const planning = await Planning.findOneAndUpdate(
      { "schedules.shifts._id": req.params.id },
      { $pull: { "schedules.$.shifts": { _id: req.params.id } } },
      { new: true }
    );
    res.json(planning);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du shift" });
  }
});

router.post("/optimize", async (req, res) => {
  try {
    const { employees, shifts, requirements } = req.body;
    const optimalSchedule = optimizeSchedule(employees, shifts, requirements);
    res.json(optimalSchedule);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'optimisation du planning" });
  }
});

module.exports = router;
