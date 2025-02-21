import { useEffect, useState } from "react";
import Stats from "../components/dashboard/Stats";
import HourCounters from "../components/dashboard/HourCounters";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import { api } from "../services/api";
import { Employee } from "../types";
import { useNotification } from "../hooks/useNotification";
import { useDashboardData } from "../hooks/useDashboardData";
import Notification from "../components/common/Notification";

const Dashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification, notification, hideNotification } =
    useNotification();
  const {
    data: chartData,
    loading: chartsLoading,
    error: chartsError,
  } = useDashboardData();

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (chartsError) {
      showNotification("error", chartsError);
    }
  }, [chartsError, showNotification]);

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

  if (loading || chartsLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>

      <Stats employees={employees} />
      <HourCounters employees={employees} />

      {chartData && <DashboardCharts {...chartData} />}

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
