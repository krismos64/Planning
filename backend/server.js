require("dotenv").config(); // Charger les variables d'environnement

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeesRouter = require("./routes/employees");
const planningRouter = require("./routes/planning");
const statsRouter = require("./routes/stats");
const vacationsRouter = require("./routes/vacations");
const authMiddleware = require("./middleware/authMiddleware");
const authRouter = require("./routes/auth");

const app = express();

// Configuration CORS plus permissive
app.use(
  cors({
    origin: "http://localhost:3000", // Spécifier explicitement l'origine
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

mongoose.connect("mongodb://localhost:27017/smartplanning", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
