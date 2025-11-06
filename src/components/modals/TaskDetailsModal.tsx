"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: string;
    customer: string;
    vehicle: string;
    serviceType: string;
    assignedTo: string;
    dateTime: string;
    status: "Scheduled" | "In Progress" | "On Hold";
  };
}

export default function TaskDetailsModal({
  isOpen,
  onClose,
  task
}: TaskDetailsModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-emerald-100 text-emerald-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "On Hold":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-0">
        <DialogHeader className="bg-emerald-600 -mx-6 -mt-6 px-6 py-4 mb-4">
          <DialogTitle className="text-lg font-semibold text-white">
            Task Details - #{task.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status Badge */}
          <div className="flex justify-center">
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
              {task.status}
            </span>
          </div>

          {/* Task Information */}
          <div className="bg-white rounded-lg">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500 font-medium">Customer</p>
                  <p className="text-gray-900">{task.customer}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Vehicle</p>
                  <p className="text-gray-900">{task.vehicle}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Service Type</p>
                  <p className="text-gray-900">{task.serviceType}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500 font-medium">Assigned To</p>
                  <p className="text-gray-900">{task.assignedTo}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Date/Time</p>
                  <p className="text-gray-900">{task.dateTime}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Expected Duration</p>
                  <p className="text-gray-900">2 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mt-4">
            <p className="text-gray-500 font-medium text-sm mb-2">Notes</p>
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
              Regular maintenance service as per manufacturer guidelines.
              Customer requested complete inspection report.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end mt-4">
            <Button 
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => {
                // TODO: Implement edit functionality
                onClose();
              }}
            >
              Edit Details
            </Button>
            <Button
              className="bg-emerald-500 text-white hover:bg-emerald-600"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}