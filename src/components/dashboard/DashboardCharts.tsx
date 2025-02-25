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
  Brush,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

interface DashboardChartsProps {
  workloadData: Array<{
    date: string;
    plannedHours: number;
    actualHours: number;
  }>;
  employeeDistributionData: Array<{ role: string; count: number }>;
  vacationTrendData: Array<{ month: string; requests: number }>;
  overtimeData: Array<{ department: string; overtimeHours: number }>;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const DashboardCharts = ({
  workloadData,
  employeeDistributionData,
  vacationTrendData,
  overtimeData,
}: DashboardChartsProps) => {
  const { isDarkMode } = useTheme();

  const chartTheme = {
    background: isDarkMode ? "#0a0f1a" : "#ffffff",
    textColor: isDarkMode ? "#f3f4f6" : "#1f2937",
    gridColor: isDarkMode ? "#374151" : "#e0e0e0",
  };

  return (
    <div className="space-y-8">
      {/* Graphique de charge de travail */}
      <div className="bg-light-50 dark:bg-dark-50 p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-light-600 dark:text-dark-500">
          Charge de travail hebdomadaire
        </h3>
        <div className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={workloadData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartTheme.gridColor}
              />
              <XAxis dataKey="date" stroke={chartTheme.textColor} />
              <YAxis stroke={chartTheme.textColor} />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartTheme.background,
                  borderColor: "#ddd",
                  color: chartTheme.textColor,
                }}
              />
              <Legend
                wrapperStyle={{ color: chartTheme.textColor }}
                onClick={(data) => {
                  // Logique pour filtrer les données selon la légende cliquée
                }}
              />
              <Line
                type="monotone"
                dataKey="plannedHours"
                stroke="#4F46E5"
                name="Heures planifiées"
              />
              <Line
                type="monotone"
                dataKey="actualHours"
                stroke="#10B981"
                name="Heures réelles"
              />
              <Brush dataKey="date" height={30} stroke="#4F46E5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution des employés */}
      <div className="bg-dark-800 p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-text-light">
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
                  backgroundColor: chartTheme.background,
                  borderColor: "#ddd",
                  color: chartTheme.textColor,
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tendance des congés */}
      <div className="bg-dark-800 p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-text-light">
          Tendance des demandes de congés
        </h3>
        <div className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={vacationTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fill: chartTheme.textColor }} />
              <YAxis tick={{ fill: chartTheme.textColor }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartTheme.background,
                  borderColor: "#ddd",
                  color: chartTheme.textColor,
                }}
              />
              <Legend />
              <Bar dataKey="requests" fill="#8884d8" name="Demandes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Heures supplémentaires */}
      <div className="bg-dark-800 p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-text-light">
          Heures supplémentaires par département
        </h3>
        <div className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={overtimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="department"
                tick={{ fill: chartTheme.textColor }}
              />
              <YAxis yAxisId="left" tick={{ fill: chartTheme.textColor }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: chartTheme.textColor }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartTheme.background,
                  borderColor: "#ddd",
                  color: chartTheme.textColor,
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="overtimeHours"
                name="Heures"
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
