interface Service {
  id: string;
  title: string;
  vehicle: string;
  status: "in-progress" | "completed" | "waiting-parts";
  type: "service" | "project";
  assignedTo?: string;
  completedBy?: string;
  completedOn?: string;
  expectedCompletion?: string;
  team?: string;
  progress?: number;
}

import { useState } from "react";
import LeaveReviewModal from "./LeaveReviewModal";

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
  isSelected?: boolean;
}

export default function ServiceCard({
  service,
  onClick,
  isSelected = false,
}: ServiceCardProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleReviewSubmit = (rating: number, comment: string) => {
    console.log("Review submitted:", {
      rating,
      comment,
      serviceId: service.id,
    });
    alert(`Thank you for your review! Rating: ${rating} stars`);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-[#E6C200]/10 text-[#E6C200] border border-[#E6C200]/30";
      case "completed":
        return "bg-green-500/10 text-green-600 border border-green-500/30";
      case "waiting-parts":
        return "bg-red-500/10 text-red-600 border border-red-500/30";
      default:
        return "bg-gray-500/10 text-gray-600 border border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "waiting-parts":
        return "Waiting for Parts";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in-progress":
        return "⚙️";
      case "completed":
        return "✅";
      case "waiting-parts":
        return "⏳";
      default:
        return "📋";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "project" ? "🔧" : "🚗";
  };

  return (
    <div
      onClick={onClick}
      className={`p-6 cursor-pointer transition-all duration-300 relative group ${
        isSelected
          ? "bg-gradient-to-r from-[#020079]/5 to-transparent border-l-4 border-[#020079] shadow-md"
          : "bg-white hover:bg-gray-50 border-l-4 border-transparent hover:border-[#020079]/30"
      }`}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-0 right-0 w-1 h-full bg-[#020079] rounded-l"></div>
      )}
      
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1 space-y-3">
          {/* Header with Icon and Title */}
          <div className="flex items-start gap-3">
            <div className={`text-3xl mt-1 transition-transform duration-300 ${
              isSelected ? "scale-110" : "group-hover:scale-110"
            }`}>
              {getTypeIcon(service.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className={`text-xl font-bold transition-colors duration-200 ${
                  isSelected ? "text-[#020079]" : "text-gray-900 group-hover:text-[#020079]"
                }`}>
                  {service.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                  getStatusStyle(service.status)
                }`}>
                  <span>{getStatusIcon(service.status)}</span>
                  {getStatusText(service.status)}
                </span>
              </div>
              
              {/* Vehicle Info */}
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <span className="text-lg">🚙</span>
                <p className="text-sm font-medium">{service.vehicle}</p>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="flex flex-wrap gap-2">
            {service.assignedTo && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#020079]/5 rounded-lg border border-[#020079]/10">
                <span className="text-sm">👤</span>
                <span className="text-sm text-gray-700">
                  <span className="font-medium text-[#020079]">Assigned:</span> {service.assignedTo}
                </span>
              </div>
            )}

            {service.completedBy && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/5 rounded-lg border border-green-500/10">
                <span className="text-sm">✓</span>
                <span className="text-sm text-gray-700">
                  <span className="font-medium text-green-600">By:</span> {service.completedBy}
                </span>
              </div>
            )}

            {service.team && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#020079]/5 rounded-lg border border-[#020079]/10">
                <span className="text-sm">👥</span>
                <span className="text-sm text-gray-700">
                  <span className="font-medium text-[#020079]">Team:</span> {service.team}
                </span>
              </div>
            )}
          </div>

          {/* Completion Info */}
          {service.expectedCompletion && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-base">📅</span>
              <span className={service.status === "in-progress" ? "text-amber-600 font-medium" : "text-green-600 font-medium"}>
                Expected: {service.expectedCompletion}
              </span>
            </div>
          )}

          {service.completedOn && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-base">🎉</span>
              <span className="text-green-600 font-medium">
                Completed: {service.completedOn}
              </span>
            </div>
          )}

          {/* Progress Bar */}
          {service.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <span>📊</span> Progress
                </span>
                <span className="text-sm font-bold text-[#020079]">
                  {service.progress}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#020079] to-[#E6C200] rounded-full transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${service.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-3">
          {service.status === "completed" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReviewModal(true);
                }}
                className="px-5 py-2.5 border-2 border-[#E6C200] rounded-lg bg-white text-[#E6C200] text-sm font-semibold hover:bg-[#E6C200] hover:text-white transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>⭐</span>
                Leave Review
              </button>
              <LeaveReviewModal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                serviceTitle={service.title}
                vehicleName={service.vehicle}
                onSubmit={handleReviewSubmit}
              />
            </>
          )}
          <button
            onClick={onClick}
            className="px-6 py-2.5 bg-gradient-to-r from-[#020079] to-[#020079]/90 hover:from-[#020079]/90 hover:to-[#020079] text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            View Details
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
