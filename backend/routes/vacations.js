const express = require("express");
const router = express.Router();
const VacationRequest = require("../models/VacationRequest");

router.post("/", async (req, res) => {
  try {
    const vacationRequest = new VacationRequest(req.body);
    await vacationRequest.save();
    res.status(201).json(vacationRequest);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la demande de congé" });
  }
});

router.get("/", async (req, res) => {
  try {
    const vacationRequests = await VacationRequest.find().populate(
      "employee",
      "name"
    );
    res.json(vacationRequests);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des demandes de congé",
      });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const vacationRequest = await VacationRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(vacationRequest);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la mise à jour de la demande de congé",
      });
  }
});

module.exports = router;
