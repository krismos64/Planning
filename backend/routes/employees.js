const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const { generateEmployeeReport } = require("../utils/pdfGenerator");

router.get("/:id/worked-hours", async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ message: "Employé non trouvé" });

  let totalHours = employee.workedHours;
  let extraHours = totalHours - employee.contractHours;

  res.json({ totalHours, extraHours });
});

router.post("/:id/hours-adjustment", async (req, res) => {
  const { time, justification, adjustmentType } = req.body;
  const employee = await Employee.findById(req.params.id);

  employee.manualAdjustments.push({
    date: new Date(),
    time,
    adjustmentType,
    justification,
  });

  employee.workedHours += adjustmentType === "Ajout" ? time / 60 : -time / 60;
  employee.extraHours = employee.workedHours - employee.contractHours;

  await employee.save();
  res.json({ message: "Heures mises à jour", employee });
});

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des employés" });
  }
});

router.post("/", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'employé" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'employé" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employé supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'employé" });
  }
});

router.get("/report", async (req, res) => {
  try {
    const employees = await Employee.find();
    const doc = generateEmployeeReport(employees);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=employee_report.pdf"
    );

    doc.pipe(res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la génération du rapport PDF" });
  }
});

module.exports = router;
