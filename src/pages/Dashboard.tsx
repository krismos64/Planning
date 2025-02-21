import { useEffect, useState } from "react";
import Stats from "../components/dashboard/Stats";
import HourCounters from "../components/dashboard/HourCounters";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import { api } from "../services/api";
import { Employee } from "../types";
import { useNotification } from "../hooks/useNotification";
import Notification from "../components/common/Notification";

const Dashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification, notification, hideNotification } =
    useNotification();

  // Données simulées pour les graphiques
  const chartData = {
    workloadData: [
      { date: "Lun", plannedHours: 160, actualHours: 155 },
      { date: "Mar", plannedHours: 165, actualHours: 170 },
      { date: "Mer", plannedHours: 170, actualHours: 165 },
      { date: "Jeu", plannedHours: 155, actualHours: 160 },
      { date: "Ven", plannedHours: 150, actualHours: 145 },
    ],
    employeeDistributionData: [
      { role: "Développeurs", count: 12 },
      { role: "Designers", count: 5 },
      { role: "Managers", count: 3 },
      { role: "Support", count: 8 },
      { role: "Marketing", count: 4 },
    ],
    vacationTrendData: [
      { month: "Jan", requests: 15, approved: 12, rejected: 3 },
      { month: "Fév", requests: 18, approved: 15, rejected: 3 },
      { month: "Mar", requests: 12, approved: 10, rejected: 2 },
      { month: "Avr", requests: 20, approved: 16, rejected: 4 },
    ],
    overtimeData: [
      { department: "Dev", hours: 45, cost: 2250 },
      { department: "Design", hours: 30, cost: 1500 },
      { department: "Support", hours: 25, cost: 1250 },
      { department: "Marketing", hours: 15, cost: 750 },
    ],
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await api.employees.getAll();
      setEmployees(data);
      setLoading(false);
    } catch (error) {
      showNotification("error", "Erreur lors du chargement des données");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>

      <Stats employees={employees} />
      <HourCounters employees={employees} />

      {/* Nouveaux graphiques */}
      <DashboardCharts {...chartData} />

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={hideNotification}
        />
      )}
    </div>
  );
};

export default Dashboard;
