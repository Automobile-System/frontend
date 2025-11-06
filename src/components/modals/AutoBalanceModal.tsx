"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface AutoBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AutoBalanceModal({
  isOpen,
  onClose
}: AutoBalanceModalProps) {
  const [isProcessing, setIsProcessing] = useState(true);
  const [results] = useState({
    tasksMovedFrom: "Kamal Perera",
    tasksMovedCount: 3,
    tasksReassigned: 2,
    noOverwork: true,
    conflictsResolved: true
  });

  useEffect(() => {
    if (isOpen) {
      setIsProcessing(true);
      // Simulate processing time
      const timer = setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 text-white border-none">
        {isProcessing ? (
          <div className="py-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <p className="text-lg">Running auto-balance algorithm...</p>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-green-400 mb-4">
                <span className="text-2xl">✓</span>
                <h3 className="text-xl font-semibold">Workload redistributed:</h3>
              </div>
              
              <div className="space-y-2 text-sm">
                <p>- {results.tasksMovedCount} tasks moved from {results.tasksMovedFrom}</p>
                <p>- {results.tasksReassigned} tasks reassigned to available employees</p>
                <p>- No employee overworked</p>
                <p>- All conflicts resolved</p>
              </div>
            </div>

            <Button
              className="w-full bg-pink-400 hover:bg-pink-500 text-gray-900 font-semibold h-12 rounded-full"
              onClick={onClose}
            >
              OK
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
