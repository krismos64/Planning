import Stats from "../components/dashboard/Stats";
import HourCounters from "../components/dashboard/HourCounters";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import { useNotification } from "../hooks/useNotification";
import { useDashboardData } from "../hooks/useDashboardData";
import Notification from "../components/common/Notification";

// Données par défaut pour le développement
const defaultChartData = {
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

const Dashboard = () => {
  const { data, loading } = useDashboardData();
  const { notification, hideNotification } = useNotification();

  if (loading) {
    return <div>Chargement...</div>;
  }

  const mappedOvertimeData = data.overtimeData.map((item) => ({
    department: item.department,
    overtimeHours: item.hours,
  }));
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Tableau de bord
      </h1>

      <Stats employees={data.employees} />
      <HourCounters employees={data.employees} />

      <DashboardCharts
        workloadData={data.workloadData}
        employeeDistributionData={data.employeeDistributionData}
        vacationTrendData={data.vacationTrendData}
        overtimeData={mappedOvertimeData}
      />

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
