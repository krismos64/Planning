require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const employeesRouter = require("./routes/employees.js");
const planningRouter = require("./routes/planning");
const statsRouter = require("./routes/stats");
const vacationsRouter = require("./routes/vacations");
const authMiddleware = require("./middleware/authMiddleware");
const authRouter = require("./routes/auth");

const app = express();

// Connecter à la base de données
connectDB();

// Configuration CORS plus permissive
app.use(
  cors({
    origin: "http://localhost:5002", // Autoriser les requêtes depuis ce domaine
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Important: Placer express.json() avant les routes
app.use(express.json());

// Routes publiques (sans authentification)
app.use("/auth", authRouter);

// Middleware d'authentification pour les routes protégées
if (process.env.NODE_ENV === "development") {
  app.use(["/employees", "/planning", "/stats", "/vacations"], authMiddleware);
}

// Routes protégées
app.use("/employees", employeesRouter);
app.use("/planning", planningRouter);
app.use("/stats", statsRouter);
app.use("/vacations", vacationsRouter);

// Définir les Routes
app.use("/api/users", require("./routes/users.js"));
app.use("/api/employees", require("./routes/employees.js"));
app.use("/api/projects", require("./routes/projects.js"));
app.use("/api/tasks", require("./routes/tasks.js"));

// Page d'accueil
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de SmartPlanning AI");
});

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
  const PORT = await findAvailablePort(process.env.PORT || 5000);
  app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
};

startServer();
