const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// @route   GET /api/projects
// @desc    Obtenir tous les projets
// @access  Public
router.get("/", async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    console.error("Erreur lors de la récupération des projets:", err.message);
    res.status(500).send("Erreur du serveur");
  }
});

// @route   GET /api/projects/:id
// @desc    Obtenir un projet par ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "Projet non trouvé" });
    }
    res.json(project);
  } catch (err) {
    console.error("Erreur lors de la récupération du projet:", err.message);
    res.status(500).send("Erreur du serveur");
  }
});

// @route   POST /api/projects
// @desc    Créer un nouveau projet
// @access  Public
router.post("/", async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.json(newProject);
  } catch (err) {
    console.error("Erreur lors de la création du projet:", err.message);
    res.status(500).send("Erreur du serveur");
  }
});

// @route   PUT /api/projects/:id
// @desc    Mettre à jour un projet
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await Project.update(req.params.id, req.body);
    res.json(updatedProject);
  } catch (err) {
    console.error("Erreur lors de la mise à jour du projet:", err.message);
    res.status(500).send("Erreur du serveur");
  }
});

// @route   DELETE /api/projects/:id
// @desc    Supprimer un projet
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    await Project.delete(req.params.id);
    res.json({ msg: "Projet supprimé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression du projet:", err.message);
    res.status(500).send("Erreur du serveur");
  }
});

module.exports = router;
