const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", { email, password }); // Pour le débogage

  // Vérification des identifiants
  if (email === "admin@admin.fr" && password === "admin") {
    res.json({
      token: "fake-jwt-token",
      user: {
        id: 1,
        email: email,
        name: "Admin",
      },
    });
  } else {
    res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }
});

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  // Logique pour enregistrer l'utilisateur dans la base de données
  res.status(201).json({ message: "Utilisateur enregistré avec succès" });
});

module.exports = router;
