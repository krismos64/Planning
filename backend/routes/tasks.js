const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// @route   GET /api/tasks
// @desc    Obtenir toutes les tâches
// @access  Public
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    console.error("Erreur lors de la récupération des tâches:", err.message);
    res.status(500).send("Erreur du serveur");
  }
});

// @route   GET /api/tasks/:id
// @desc    Obtenir une tâche par ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Tâche non trouvée" });
    }
    res.json(task);
  } catch (err) {
    console.error("Erreur lors de la récupération de la tâche:", err.message);
    res.status(500).send("Erreur du serveur");
  }
});

// @route   POST /api/tasks
// @desc    Créer une nouvelle tâche
// @access  Public
router.post("/", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.json(newTask);
  } catch (err) {
    console.error("Erreur lors de la création de la tâche:", err.message);
    res.status(500).send("Erreur du serveur");
  }
});

// @route   PUT /api/tasks/:id
// @desc    Mettre à jour une tâche
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.update(req.params.id, req.body);
    res.json(updatedTask);
  } catch (err) {
    console.error("Erreur lors de la mise à jour de la tâche:", err.message);
    res.status(500).send("Erreur du serveur");
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Supprimer une tâche
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    await Task.delete(req.params.id);
    res.json({ msg: "Tâche supprimée avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression de la tâche:", err.message);
    res.status(500).send("Erreur du serveur");
  }
});

module.exports = router; 