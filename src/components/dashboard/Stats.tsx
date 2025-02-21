import { Employee } from "../../types";

interface StatsProps {
  employees: Employee[];
}

const Stats = ({ employees }: StatsProps) => {
  const totalEmployees = employees.length;
  const totalHours = employees.reduce((acc, emp) => acc + emp.workedHours, 0);
  const averageHours = totalEmployees ? totalHours / totalEmployees : 0;
  const overtimeEmployees = employees.filter(
    (emp) => emp.workedHours > emp.contractHours
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-base md:text-lg font-medium text-gray-900">
          Total Employés
        </h3>
        <p className="mt-2 text-2xl md:text-3xl font-semibold text-blue-600">
          {totalEmployees}
        </p>
      </div>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-base md:text-lg font-medium text-gray-900">
          Heures Totales
        </h3>
        <p className="mt-2 text-2xl md:text-3xl font-semibold text-green-600">
          {totalHours.toFixed(1)}h
        </p>
      </div>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-base md:text-lg font-medium text-gray-900">
          Moyenne Heures
        </h3>
        <p className="mt-2 text-2xl md:text-3xl font-semibold text-purple-600">
          {averageHours.toFixed(1)}h
        </p>
      </div>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-base md:text-lg font-medium text-gray-900">
          Heures Supp.
        </h3>
        <p className="mt-2 text-2xl md:text-3xl font-semibold text-orange-600">
          {overtimeEmployees}
        </p>
      </div>
    </div>
  );
};

export default Stats;
