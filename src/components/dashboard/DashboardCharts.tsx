import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

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

const DashboardCharts = ({
  workloadData,
  employeeDistributionData,
  vacationTrendData,
  overtimeData,
}: DashboardChartsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Graphique de charge de travail */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Charge de travail</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={workloadData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="plannedHours"
              name="Heures prévues"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="actualHours"
              name="Heures réelles"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Répartition des employés */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">
          Répartition des employés par rôle
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={employeeDistributionData}
              dataKey="count"
              nameKey="role"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {employeeDistributionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"][
                      index % 5
                    ]
                  }
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Tendances des congés */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Tendances des congés</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={vacationTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="requests"
              name="Demandes"
              fill="#8884d8"
              stackId="a"
            />
            <Bar
              dataKey="approved"
              name="Approuvés"
              fill="#82ca9d"
              stackId="a"
            />
            <Bar dataKey="rejected" name="Refusés" fill="#ff8042" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Heures supplémentaires par département */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">
          Heures supplémentaires par département
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={overtimeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
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
  );
};

export default DashboardCharts;
