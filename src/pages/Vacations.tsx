import { useState, useEffect } from "react";
import { api } from "../services/api";
import { useNotification } from "../hooks/useNotification";
import { VacationRequest } from "../types";

const Vacations = () => {
  const [vacationRequests, setVacationRequests] = useState<VacationRequest[]>(
    []
  );
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchVacationRequests = async () => {
      try {
        const data = await api.vacations.getAll();
        setVacationRequests(data);
      } catch (error) {
        showNotification(
          "error",
          "Erreur lors du chargement des demandes de congé"
        );
      }
    };

    fetchVacationRequests();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await api.vacations.update(id, { status: "Approuvé" });
      const data = await api.vacations.getAll();
      setVacationRequests(data);
      showNotification("success", "Demande de congé approuvée");
    } catch (error) {
      showNotification(
        "error",
        "Erreur lors de l'approbation de la demande de congé"
      );
    }
  };

  const handleReject = async (id: string) => {
    try {
      await api.vacations.update(id, { status: "Refusé" });
      const data = await api.vacations.getAll();
      setVacationRequests(data);
      showNotification("success", "Demande de congé refusée");
    } catch (error) {
      showNotification("error", "Erreur lors du refus de la demande de congé");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Gestion des congés</h2>
      <div className="mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Nouvelle demande de congé
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left">Employé</th>
            <th className="px-6 py-3 text-left">Date de début</th>
            <th className="px-6 py-3 text-left">Date de fin</th>
            <th className="px-6 py-3 text-left">Statut</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vacationRequests.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                Aucune demande de congé
              </td>
            </tr>
          ) : (
            vacationRequests.map((request) => (
              <tr key={request._id} className="border-t">
                <td className="px-6 py-4">{request.employeeName}</td>
                <td className="px-6 py-4">
                  {new Date(request.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {new Date(request.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{request.status}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleApprove(request._id)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    Approuver
                  </button>
                  <button
                    onClick={() => handleReject(request._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Refuser
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Vacations;
