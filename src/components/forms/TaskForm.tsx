// frontend/src/components/forms/TaskForm.tsx
"use client"
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServiceTypes, getAvailableEmployees, postTask } from "@/services/api";
import { showToast } from "@/lib/toast";

interface ServiceType {
  id: string;
  name: string;
}

interface Employee {
  id: string;
  name: string;
}

interface TaskFormData {
  customerName?: string;
  contactNumber?: string;
  vehicleRegistration?: string;
  vehicleModel?: string;
  serviceType?: string;
  serviceNote?: string;
  assignedEmployee?: string;
  estimatedTime?: string;
  estimatedDurationHours?: string;
  estimatedPrice?: string;
  preferredDate?: string;
  preferredTime?: string;
  assignEmployeeId?: string;
}

type Props = {
  onCreated?: (task: TaskFormData) => void;
  initial?: Partial<TaskFormData>;
};

export default function TaskForm({ onCreated, initial = {} }: Props) {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: initial.customerName ?? "",
    contactNumber: initial.contactNumber ?? "",
    vehicleRegistration: initial.vehicleRegistration ?? "",
    vehicleModel: initial.vehicleModel ?? "",
    serviceType: initial.serviceType ?? "",
    serviceNote: initial.serviceNote ?? "",
    estimatedDurationHours: initial.estimatedDurationHours ?? "",
    estimatedPrice: initial.estimatedPrice ?? "",
    preferredDate: initial.preferredDate ?? "",
    preferredTime: initial.preferredTime ?? "",
    assignEmployeeId: initial.assignEmployeeId ?? "",
  });

  useEffect(() => {
    getServiceTypes().then(setServiceTypes).catch(() => setServiceTypes([]));
    getAvailableEmployees().then(setEmployees).catch(() => setEmployees([]));
  }, []);

  function setField<K extends keyof typeof form>(k: K, v: string | number) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    try {
      // Parse time string (HH:mm) into LocalTime object
      let preferredTimeObj = undefined;
      if (form.preferredTime) {
        const [hours, minutes] = form.preferredTime.split(':').map(Number);
        preferredTimeObj = {
          hour: hours || 0,
          minute: minutes || 0,
          second: 0,
          nano: 0
        };
      }

      // build payload according to backend contract expected
      const payload = {
        customerName: form.customerName,
        contactNumber: form.contactNumber,
        vehicleRegistration: form.vehicleRegistration,
        vehicleModel: form.vehicleModel,
        serviceType: form.serviceType,
        serviceNotes: form.serviceNote,
        estimatedDurationHours: Number(form.estimatedDurationHours),
        estimatedPrice: Number(form.estimatedPrice),
        preferredDate: form.preferredDate,
        preferredTime: preferredTimeObj,
        assignedEmployeeId: form.assignEmployeeId || undefined,
      };

      console.log("Submitting task with payload:", payload);
      const task = await postTask(payload);
      console.log("Task created successfully:", task);
      showToast.success("Task created and added to schedule");
      onCreated?.(task);
    } catch (err) {
      console.error("Failed to create task:", err);
      const message = err instanceof Error ? err.message : String(err);
      showToast.error("Could not create task", message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label>Customer Name</Label>
            <Input value={form.customerName} onChange={(e) => setField("customerName", e.target.value)} />
          </div>
          <div>
            <Label>Contact Number</Label>
            <Input value={form.contactNumber} onChange={(e) => setField("contactNumber", e.target.value)} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Vehicle Registration</Label>
              <Input value={form.vehicleRegistration} onChange={(e) => setField("vehicleRegistration", e.target.value)} />
            </div>
            <div>
              <Label>Vehicle Model</Label>
              <Input value={form.vehicleModel} onChange={(e) => setField("vehicleModel", e.target.value)} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Service Type</Label>
              <select value={form.serviceType} onChange={(e) => setField("serviceType", e.target.value)} className="w-full rounded-md border p-2">
                <option value="">Select service type</option>
                {serviceTypes.map((s) => <option key={s.id ?? s} value={s.id ?? s}>{s.name ?? s}</option>)}
              </select>
            </div>
            <div>
              <Label>Assign Employee</Label>
              <select value={form.assignEmployeeId} onChange={(e) => setField("assignEmployeeId", e.target.value)} className="w-full rounded-md border p-2">
                <option value="">Select employee</option>
                {employees.map((emp) => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <Label>Service Note</Label>
            <textarea value={form.serviceNote} onChange={(e) => setField("serviceNote", e.target.value)} className="w-full rounded-md border p-2" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>Estimated Duration (hours)</Label>
              <Input value={form.estimatedDurationHours} onChange={(e) => setField("estimatedDurationHours", e.target.value)} />
            </div>
            <div>
              <Label>Estimated Price</Label>
              <Input value={form.estimatedPrice} onChange={(e) => setField("estimatedPrice", e.target.value)} />
            </div>
            <div>
              <Label>Preferred Date</Label>
              <Input type="date" value={form.preferredDate} onChange={(e) => setField("preferredDate", e.target.value)} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Preferred Time</Label>
              <Input 
                type="time" 
                value={form.preferredTime} 
                onChange={(e) => setField("preferredTime", e.target.value)}
                onFocus={(e) => e.target.showPicker?.()}
                step="60"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => { /* optional cancel handler */ }}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create task and add to schedule"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}