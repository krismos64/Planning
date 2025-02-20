import { useState, useEffect } from "react";
import { startOfWeek, addWeeks, subWeeks } from "date-fns";
import WeeklyPlanning from "../components/planning/WeeklyPlanning";
import AddShiftForm from "../components/planning/AddShiftForm";
import { api } from "../services/api";
import { Schedule } from "../types";

const Planning = () => {
  const [currentWeek, setCurrentWeek] = useState(() => startOfWeek(new Date()));
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await api.planning.getWeeklyPlanning(currentWeek);
        setSchedule(data);
      } catch (error) {
        console.error("Erreur lors du chargement du planning:", error);
      }
    };

    fetchSchedule();
  }, [currentWeek]);

  const handlePreviousWeek = () => {
    setCurrentWeek((prev) => subWeeks(prev, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => addWeeks(prev, 1));
  };

  const handleAddShift = (date: Date) => {
    setSelectedDate(date);
    setShowAddForm(true);
  };

  const handleAddShiftSubmit = async (shiftData: any) => {
    try {
      await api.planning.createShift(shiftData);
      setShowAddForm(false);
      const data = await api.planning.getWeeklyPlanning(currentWeek);
      setSchedule(data);
    } catch (error) {
      console.error("Erreur lors de l'ajout du shift:", error);
    }
  };

  const handleDeleteShift = async (shiftId: string) => {
    try {
      await api.planning.deleteShift(shiftId);
      const data = await api.planning.getWeeklyPlanning(currentWeek);
      setSchedule(data);
    } catch (error) {
      console.error("Erreur lors de la suppression du shift:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Planning hebdomadaire</h2>
        <div className="flex space-x-4">
          <button
            onClick={handlePreviousWeek}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Semaine précédente
          </button>
          <button
            onClick={handleNextWeek}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Semaine suivante
          </button>
        </div>
      </div>

      <WeeklyPlanning
        weekStart={currentWeek}
        schedule={schedule}
        onAddShift={handleAddShift}
        onDeleteShift={handleDeleteShift}
      />

      {showAddForm && selectedDate && (
        <AddShiftForm
          date={selectedDate}
          onSubmit={handleAddShiftSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default Planning;
