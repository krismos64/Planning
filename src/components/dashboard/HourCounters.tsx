import { Employee } from "../../types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface HourCountersProps {
  employees: Employee[];
}

const HourCounters = ({ employees }: HourCountersProps) => {
  const currentDate = new Date();
  const currentMonth = format(currentDate, "MMMM yyyy", { locale: fr });

  // Calcul des statistiques
  const totalContractHours = employees.reduce(
    (acc, emp) => acc + emp.contractHours,
    0
  );
  const totalWorkedHours = employees.reduce(
    (acc, emp) => acc + emp.workedHours,
    0
  );
  const totalExtraHours = employees.reduce(
    (acc, emp) => acc + (emp.workedHours - emp.contractHours),
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">
        Compteurs d'heures - {currentMonth}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Heures contractuelles */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-blue-700 font-medium mb-2">
            Heures Contractuelles
          </h3>
          <div className="text-3xl font-bold text-blue-600">
            {totalContractHours}h
          </div>
          <p className="text-sm text-blue-500 mt-1">Total prévu ce mois</p>
        </div>

        {/* Heures travaillées */}
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="text-green-700 font-medium mb-2">
            Heures Travaillées
          </h3>
          <div className="text-3xl font-bold text-green-600">
            {totalWorkedHours}h
          </div>
          <p className="text-sm text-green-500 mt-1">Réalisées ce mois</p>
        </div>

        {/* Heures supplémentaires */}
        <div className="bg-orange-50 rounded-lg p-4">
          <h3 className="text-orange-700 font-medium mb-2">
            Heures Supplémentaires
          </h3>
          <div className="text-3xl font-bold text-orange-600">
            {totalExtraHours}h
          </div>
          <p className="text-sm text-orange-500 mt-1">Différentiel</p>
        </div>
      </div>

      {/* Tableau détaillé par employé */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Détail par employé</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employé
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contractuel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Réalisé
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Différence
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.contractHours}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.workedHours}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`${
                        employee.workedHours - employee.contractHours >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {employee.workedHours - employee.contractHours}h
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HourCounters;
