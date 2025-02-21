import React, { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  addWeeks,
  eachDayOfInterval,
} from "date-fns";
import { fr } from "date-fns/locale";
import { Planning, Employee } from "../../types";
import { api } from "../../services/api";
import { optimizePlanning } from "../../services/planningOptimizer";
import AddShiftModal from "./AddShiftModal";

interface PlanningManagerProps {
  viewType: "jour" | "semaine" | "mois" | "année";
  employeeId?: string;
}

const PlanningManager: React.FC<PlanningManagerProps> = ({
  viewType,
  employeeId,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [planning, setPlanning] = useState<Planning | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchPlanning();
    fetchEmployees();
  }, [currentDate, viewType, employeeId]);

  const fetchEmployees = async () => {
    try {
      const data = await api.employees.getAll();
      setEmployees(data);
    } catch (error) {
      console.error("Erreur lors du chargement des employés:", error);
    }
  };

  const fetchPlanning = async () => {
    try {
      const params = {
        startDate: startOfWeek(currentDate),
        endDate: endOfWeek(currentDate),
        type: viewType,
        employeeId,
      };
      const data = await api.planning.get(params);
      setPlanning(data);
    } catch (error) {
      console.error("Erreur lors du chargement du planning:", error);
    }
  };

  const handleOptimize = async () => {
    setIsOptimizing(true);
    try {
      const vacations = await api.vacations.getAll();

      const optimizedPlanning = await optimizePlanning({
        startDate: startOfWeek(currentDate),
        endDate: endOfWeek(currentDate),
        employees,
        constraints: {
          minEmployeesPerShift: 2,
          maxHoursPerWeek: 35,
          preferredShifts: new Map(),
          unavailableDays: new Map(),
        },
        vacations,
      });

      setPlanning(optimizedPlanning);
    } catch (error) {
      console.error("Erreur lors de l'optimisation:", error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleAddShift = async (shiftData: {
    employeeId: string;
    date: Date;
    startTime: string;
    endTime: string;
    type: "normal" | "congé" | "formation" | "absence";
  }) => {
    try {
      await api.planning.createShift(shiftData);
      setIsAddModalOpen(false);
      fetchPlanning(); // Rafraîchir le planning
    } catch (error) {
      console.error("Erreur lors de l'ajout du shift:", error);
    }
  };

  const renderDayCell = (date: Date) => {
    const shifts =
      planning?.weeklySchedules
        .flatMap((schedule) => schedule.schedules)
        .find(
          (day) =>
            format(new Date(day.date), "yyyy-MM-dd") ===
            format(date, "yyyy-MM-dd")
        )?.shifts || [];

    return (
      <div
        className="min-h-[120px] bg-white rounded-lg shadow p-2 cursor-pointer hover:bg-gray-50"
        onClick={() => {
          setSelectedDate(date);
          setIsAddModalOpen(true);
        }}
      >
        <div className="font-semibold text-sm mb-2">
          {format(date, "EEEE d", { locale: fr })}
        </div>
        <div className="space-y-1">
          {shifts.map((shift, idx) => (
            <div
              key={idx}
              className={`text-xs p-1 rounded ${
                shift.type === "normal"
                  ? "bg-blue-100"
                  : shift.type === "congé"
                  ? "bg-red-100"
                  : shift.type === "formation"
                  ? "bg-green-100"
                  : "bg-yellow-100"
              }`}
            >
              <div className="font-medium">{shift.employee.name}</div>
              <div>
                {shift.startTime} - {shift.endTime}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = eachDayOfInterval({
      start: startOfWeek(currentDate, { weekStartsOn: 1 }),
      end: endOfWeek(currentDate, { weekStartsOn: 1 }),
    });

    return (
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day) => (
          <div key={day.toString()}>{renderDayCell(day)}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <div className="space-x-2">
          <button
            onClick={() => setCurrentDate((prev) => addWeeks(prev, -1))}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Précédent
          </button>
          <button
            onClick={() => setCurrentDate((prev) => addWeeks(prev, 1))}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Suivant
          </button>
        </div>

        <h2 className="text-xl font-semibold">
          {format(currentDate, "MMMM yyyy", { locale: fr })}
        </h2>

        <div className="space-x-2">
          <button
            onClick={handleOptimize}
            disabled={isOptimizing}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            {isOptimizing ? "Optimisation..." : "Optimiser automatiquement"}
          </button>
          <button
            onClick={() => {
              setSelectedDate(new Date());
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Ajouter un shift
          </button>
        </div>
      </div>

      {renderWeekView()}

      {selectedDate && (
        <AddShiftModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setSelectedDate(null);
          }}
          onSubmit={handleAddShift}
          employees={employees}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default PlanningManager;
