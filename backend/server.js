require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import des routes
const authRoutes = require("./routes/auth");
const employeesRoutes = require("./routes/employees");
const planningRoutes = require("./routes/planning");
const vacationsRoutes = require("./routes/vacations");

const app = express();

// Connecter à la base de données
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5002",
    credentials: true,
  })
);

// Routes API
app.use("/api/employees", employeesRoutes);
app.use("/api/planning", planningRoutes);
app.use("/api/vacations", vacationsRoutes);
app.use("/api/auth", authRoutes);

// Route de base
app.get("/", (req, res) => {
  res.json({ message: "SmartPlanning AI API" });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Une erreur est survenue",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Port dynamique
const findAvailablePort = (startPort) => {
  return new Promise((resolve, reject) => {
    const server = require("http").createServer();
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(findAvailablePort(startPort + 1));
      } else {
        reject(err);
      }
    });
    server.listen(startPort, () => {
      server.close(() => resolve(startPort));
    });
  });
};

const startServer = async () => {
  try {
    const PORT = await findAvailablePort(process.env.PORT || 5000);
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
      console.log(`📚 Documentation API: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Erreur lors du démarrage du serveur:", error);
    process.exit(1);
  }
};

startServer();
