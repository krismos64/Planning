import { Employee, VacationRequest } from "../types";

interface PlanningConstraints {
  minEmployeesPerShift: number;
  maxHoursPerWeek: number;
  preferredShifts: Map<string, string[]>;
  unavailableDays: Map<string, Date[]>;
}

interface OptimizationParams {
  startDate: Date;
  endDate: Date;
  employees: Employee[];
  constraints: PlanningConstraints;
  vacations: VacationRequest[];
}

export const optimizePlanning = async (params: OptimizationParams) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/planning/optimize`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }
    );

    if (!response.ok) throw new Error("Erreur d'optimisation");
    return await response.json();
  } catch (error) {
    throw new Error("Erreur lors de l'optimisation du planning");
  }
};
