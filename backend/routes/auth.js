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

module.exports = router;
