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
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#020079]/5 border-b border-[#020079]/20 p-6 rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bebas text-[#020079]">Employee Work History</h2>
              <h3 className="text-lg font-roboto font-semibold text-[#020079] mt-1">{employee.name}</h3>
              <p className="text-sm font-roboto text-[#020079]/70 mt-1">Complete service history showing all vehicles serviced</p>
            </div>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-[#020079]/30 text-[#020079] hover:bg-[#020079]/5"
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {employee.serviceHistory && employee.serviceHistory.length > 0 ? (
            employee.serviceHistory.map((service, index) => (
              <Card key={index} className="p-5 border-l-4 border-[#020079] bg-white rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-roboto font-semibold text-[#020079]">
                        {service.vehicleNumber} - {service.vehicleModel}
                      </h4>
                      <p className="text-sm font-roboto text-[#020079]/70">Service: {service.serviceType}</p>
                      <p className="text-sm font-roboto text-[#020079]/60">Date: {service.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-roboto text-[#020079]/70">Customer Rating:</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < service.rating
                                ? "fill-[#FFD700] stroke-[#FFD700]"
                                : "fill-[#020079]/10 stroke-[#020079]/10"
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
            <p className="text-center font-roboto text-[#020079]/60 py-8">No service history available</p>
          )}
        </div>
      </div>
    </div>
  );
}