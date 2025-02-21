import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

interface DashboardChartsProps {
  workloadData: {
    date: string;
    plannedHours: number;
    actualHours: number;
  }[];
  employeeDistributionData: {
    role: string;
    count: number;
  }[];
  vacationTrendData: {
    month: string;
    requests: number;
    approved: number;
    rejected: number;
  }[];
  overtimeData: {
    department: string;
    hours: number;
    cost: number;
  }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const DashboardCharts = ({
  workloadData,
  employeeDistributionData,
  vacationTrendData,
  overtimeData,
}: DashboardChartsProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-8">
      {/* Graphique de charge de travail */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">
          Charge de travail hebdomadaire
        </h3>
        <div className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={workloadData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fill: isDarkMode ? "#fff" : "#000" }}
              />
              <YAxis tick={{ fill: isDarkMode ? "#fff" : "#000" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#374151" : "#fff",
                  borderColor: isDarkMode ? "#4b5563" : "#ddd",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="plannedHours"
                stroke="#8884d8"
                name="Heures planifiées"
              />
              <Line
                type="monotone"
                dataKey="actualHours"
                stroke="#82ca9d"
                name="Heures réelles"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution des employés */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">
          Distribution des employés par rôle
        </h3>
        <div className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={employeeDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="count"
              >
                {employeeDistributionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#374151" : "#fff",
                  borderColor: isDarkMode ? "#4b5563" : "#ddd",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tendance des congés */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">
          Tendance des demandes de congés
        </h3>
        <div className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={vacationTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fill: isDarkMode ? "#fff" : "#000" }}
              />
              <YAxis tick={{ fill: isDarkMode ? "#fff" : "#000" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#374151" : "#fff",
                  borderColor: isDarkMode ? "#4b5563" : "#ddd",
                }}
              />
              <Legend />
              <Bar dataKey="requests" fill="#8884d8" name="Demandes" />
              <Bar dataKey="approved" fill="#82ca9d" name="Approuvées" />
              <Bar dataKey="rejected" fill="#ff8042" name="Rejetées" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Heures supplémentaires */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">
          Heures supplémentaires par département
        </h3>
        <div className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={overtimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="department"
                tick={{ fill: isDarkMode ? "#fff" : "#000" }}
              />
              <YAxis
                yAxisId="left"
                tick={{ fill: isDarkMode ? "#fff" : "#000" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: isDarkMode ? "#fff" : "#000" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#374151" : "#fff",
                  borderColor: isDarkMode ? "#4b5563" : "#ddd",
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="hours"
                name="Heures"
                stroke="#8884d8"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cost"
                name="Coût"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
