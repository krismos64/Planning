const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeesRouter = require("./routes/employees");
const planningRouter = require("./routes/planning");
const statsRouter = require("./routes/stats");
const vacationsRouter = require("./routes/vacations");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/smartplanning", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/employees", employeesRouter);
app.use("/planning", planningRouter);
app.use("/stats", statsRouter);
app.use("/vacations", vacationsRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
