import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export type ServiceHistory = {
  vehicleNumber: string;
  vehicleModel: string;
  serviceType: string;
  date: string;
  rating: number;
};

export type Employee = {
  name: string;
  skill: string;
  serviceHistory?: ServiceHistory[];
};

type Props = {
  employee: Employee;
  onClose: () => void;
  isOpen: boolean;
};

export function EmployeeHistoryModal({ employee, onClose, isOpen }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Employee Work History</h2>
            <h3 className="text-lg text-gray-600">{employee.name}</h3>
            <p className="text-sm text-gray-500">Complete service history showing all vehicles serviced</p>
          </div>
          <Button
            variant="outline"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </Button>
        </div>

        <div className="space-y-4">
          {employee.serviceHistory && employee.serviceHistory.length > 0 ? (
            employee.serviceHistory.map((service, index) => (
              <Card key={index} className="p-4 border-l-4 border-l-emerald-500">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {service.vehicleNumber} - {service.vehicleModel}
                      </h4>
                      <p className="text-sm text-gray-600">Service: {service.serviceType}</p>
                      <p className="text-sm text-gray-500">Date: {service.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-600">Customer Rating:</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < service.rating
                                ? "fill-yellow-400 stroke-yellow-400"
                                : "fill-gray-200 stroke-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No service history available</p>
          )}
        </div>
      </div>
    </div>
  );
}