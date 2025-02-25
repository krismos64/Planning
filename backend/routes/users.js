const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @route   GET /api/users
// @desc    Obtenir tous les utilisateurs
// @access  Public
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des utilisateurs:",
      err.message
    );
    res.status(500).send("Erreur du serveur");
  }
});

// @route   GET /api/users/:id
// @desc    Obtenir un utilisateur par ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (err) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur:",
      err.message
    );
    res.status(500).send("Erreur du serveur");
  }
});

// @route   POST /api/users
// @desc    Créer un nouvel utilisateur
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = await User.create({ username, email, password, role });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur:", err.message);
    res.status(500).send("Erreur du serveur");
  }
});

// @route   PUT /api/users/:id
// @desc    Mettre à jour un utilisateur
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.update(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    console.error(
      "Erreur lors de la mise à jour de l'utilisateur:",
      err.message
    );
    res.status(500).send("Erreur du serveur");
  }
});

// @route   DELETE /api/users/:id
// @desc    Supprimer un utilisateur
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.json({ msg: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error(
      "Erreur lors de la suppression de l'utilisateur:",
      err.message
    );
    res.status(500).send("Erreur du serveur");
  }
});

module.exports = router;
