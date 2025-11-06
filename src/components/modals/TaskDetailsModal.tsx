"use client";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
        return "bg-[#FFD700]/20 text-[#020079] border-[#FFD700]/30";
      case "In Progress":
        return "bg-[#020079]/20 text-[#020079] border-[#020079]/30";
      case "On Hold":
        return "bg-[#FFD700]/30 text-[#020079] border-[#FFD700]/40";
      default:
        return "bg-[#020079]/10 text-[#020079] border-[#020079]/20";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        {/* Header Section */}
        <div className="-mx-6 -mt-6 px-8 py-6 bg-[#020079] border-b-4 border-[#FFD700]">
          <DialogTitle className="text-3xl font-bebas text-white tracking-wide mb-2">
            TASK DETAILS - {task.id}
          </DialogTitle>
          <DialogDescription className="text-white/90 font-roboto text-base">
            Complete information about this service task
          </DialogDescription>
        </div>

        <div className="px-2 pt-6 space-y-6">
          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge className={`font-roboto text-sm px-4 py-1 ${getStatusColor(task.status)}`}>
              {task.status}
            </Badge>
          </div>

          {/* Task Information Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5">
              <div className="border-l-4 border-[#020079]/20 pl-4">
                <p className="text-sm font-roboto text-[#020079]/60 uppercase tracking-wide mb-1">Customer</p>
                <p className="font-roboto text-[#020079] font-semibold">{task.customer}</p>
              </div>
              <div className="border-l-4 border-[#020079]/20 pl-4">
                <p className="text-sm font-roboto text-[#020079]/60 uppercase tracking-wide mb-1">Vehicle</p>
                <p className="font-roboto text-[#020079] font-semibold">{task.vehicle}</p>
              </div>
              <div className="border-l-4 border-[#020079]/20 pl-4">
                <p className="text-sm font-roboto text-[#020079]/60 uppercase tracking-wide mb-1">Service Type</p>
                <p className="font-roboto text-[#020079] font-semibold">{task.serviceType}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div className="border-l-4 border-[#FFD700]/40 pl-4">
                <p className="text-sm font-roboto text-[#020079]/60 uppercase tracking-wide mb-1">Assigned To</p>
                <p className="font-roboto text-[#020079] font-semibold">{task.assignedTo}</p>
              </div>
              <div className="border-l-4 border-[#FFD700]/40 pl-4">
                <p className="text-sm font-roboto text-[#020079]/60 uppercase tracking-wide mb-1">Date/Time</p>
                <p className="font-roboto text-[#020079] font-semibold">{task.dateTime}</p>
              </div>
              <div className="border-l-4 border-[#FFD700]/40 pl-4">
                <p className="text-sm font-roboto text-[#020079]/60 uppercase tracking-wide mb-1">Expected Duration</p>
                <p className="font-roboto text-[#020079] font-semibold">2 hours</p>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="border-t-2 border-[#020079]/20 pt-6">
            <h3 className="text-lg font-bebas text-[#020079] mb-3">NOTES</h3>
            <div className="bg-[#FFD700]/10 border-l-4 border-[#FFD700] p-4 rounded-r-lg">
              <p className="font-roboto text-[#020079]">
                Regular maintenance service as per manufacturer guidelines.
                Customer requested complete inspection report.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t border-[#020079]/20">
            <Button 
              className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto font-semibold"
              onClick={() => {
                // TODO: Implement edit functionality
                onClose();
              }}
            >
              Edit Details
            </Button>
            <Button
              className="bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold"
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