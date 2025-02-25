// routes/employees.js
const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// @route   GET /api/employees
// @desc    Obtenir tous les employés
// @access  Public
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    console.error("Erreur lors de la récupération des employés:", err.message);
    res.status(500).send("Erreur du serveur");
  }
});

// @route   GET /api/employees/:id
// @desc    Obtenir un employé par ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: "Employé non trouvé" });
    }
    res.json(employee);
  } catch (err) {
    console.error("Erreur lors de la récupération de l'employé:", err.message);
    res.status(500).send("Erreur du serveur");
  }
});

// @route   POST /api/employees
// @desc    Créer un nouvel employé
// @access  Public
router.post("/", async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.json(newEmployee);
  } catch (err) {
    console.error("Erreur lors de la création de l'employé:", err.message);
    res.status(500).send("Erreur du serveur");
  }
});

// @route   PUT /api/employees/:id
// @desc    Mettre à jour un employé
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.update(req.params.id, req.body);
    res.json(updatedEmployee);
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'employé:", err.message);
    res.status(500).send("Erreur du serveur");
  }
});

// @route   DELETE /api/employees/:id
// @desc    Supprimer un employé
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    await Employee.delete(req.params.id);
    res.json({ msg: "Employé supprimé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression de l'employé:", err.message);
    res.status(500).send("Erreur du serveur");
  }
});

module.exports = router;
