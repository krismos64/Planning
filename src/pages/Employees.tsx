import { useState, useEffect } from "react";
import AddEmployeeForm from "../components/employees/AddEmployeeForm";
import { api } from "../services/api";

interface Employee {
  _id: string;
  name: string;
  role: string;
  contractHours: number;
  workedHours: number;
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await api.employees.getAll();
      setEmployees(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement des employés:", error);
      setLoading(false);
    }
  };

  const handleAddEmployee = async (employeeData: any) => {
    try {
      await api.employees.create(employeeData);
      setShowAddForm(false);
      fetchEmployees();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'employé:", error);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
      try {
        await api.employees.delete(id);
        fetchEmployees();
      } catch (error) {
        console.error("Erreur lors de la suppression de l'employé:", error);
      }
    }
  };

  const downloadReport = () => {
    window.open(`${api.baseUrl}/employees/report`, "_blank");
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Liste des employés</h2>
            <div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
              >
                Ajouter un employé
              </button>
              <button
                onClick={downloadReport}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Télécharger le rapport PDF
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left">Nom</th>
                <th className="px-6 py-3 text-left">Rôle</th>
                <th className="px-6 py-3 text-left">Heures contractuelles</th>
                <th className="px-6 py-3 text-left">Heures travaillées</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id} className="border-t">
                  <td className="px-6 py-4">{employee.name}</td>
                  <td className="px-6 py-4">{employee.role}</td>
                  <td className="px-6 py-4">{employee.contractHours}h</td>
                  <td className="px-6 py-4">{employee.workedHours}h</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">
                      Éditer
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(employee._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showAddForm && (
        <AddEmployeeForm
          onSubmit={handleAddEmployee}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </>
  );
};

export default Employees;
