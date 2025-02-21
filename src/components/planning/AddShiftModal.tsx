import React, { useState } from "react";
import { Employee } from "../../types";

interface AddShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (shiftData: {
    employeeId: string;
    date: Date;
    startTime: string;
    endTime: string;
    type: "normal" | "congé" | "formation" | "absence";
  }) => void;
  employees: Employee[];
  selectedDate: Date;
}

const AddShiftModal: React.FC<AddShiftModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  employees,
  selectedDate,
}) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    startTime: "09:00",
    endTime: "17:00",
    type: "normal" as const,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Ajouter un shift</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              ...formData,
              date: selectedDate,
            });
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employé
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={formData.employeeId}
                onChange={(e) =>
                  setFormData({ ...formData, employeeId: e.target.value })
                }
                required
              >
                <option value="">Sélectionner un employé</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Début
                </label>
                <input
                  type="time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fin
                </label>
                <input
                  type="time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as any })
                }
                required
              >
                <option value="normal">Normal</option>
                <option value="congé">Congé</option>
                <option value="formation">Formation</option>
                <option value="absence">Absence</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShiftModal;
