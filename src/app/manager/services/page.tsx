"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { showToast } from "@/lib/toast";
import {
  fetchServices as fetchServicesApi,
  createService as createServiceApi,
  updateService as updateServiceApi,
  deleteService as deleteServiceApi,
} from "@/services/managerService";
import type {
  ServiceSummary,
  CreateServicePayload,
} from "@/services/managerService";

interface ServiceFormState {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  estimatedHours: string;
  cost: string;
}

const initialFormState: ServiceFormState = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
  estimatedHours: "",
  cost: "",
};

const formatDate = (value: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const formatHours = (value: number | null | undefined) => {
  if (value == null) return "—";
  if (value % 1 === 0) {
    return `${value} hrs`;
  }
  return `${value.toFixed(1)} hrs`;
};

const formatCurrency = (value: number | null | undefined) => {
  if (value == null) return "—";
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
};

export default function ManagerServicesPage() {
  const [services, setServices] = useState<ServiceSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewingService, setViewingService] = useState<ServiceSummary | null>(null);
  const [editingService, setEditingService] = useState<ServiceSummary | null>(null);
  const [formState, setFormState] = useState<ServiceFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ServiceSummary | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    void loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await fetchServicesApi();
      setServices(Array.isArray(list) ? list : []);
    } catch (err: unknown) {
      console.error("Failed to fetch services", err);
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load services. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormState(initialFormState);
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      resetForm();
      setViewingService(null);
      setEditingService(null);
    }
  };

  const openCreateDialog = () => {
    resetForm();
    setViewingService(null);
    setEditingService(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (service: ServiceSummary) => {
    setViewingService(null);
    setEditingService(service);
    setFormState({
      title: service.title ?? "",
      description: service.description ?? "",
      category: service.category ?? "",
      imageUrl: service.imageUrl ?? "",
      estimatedHours:
        service.estimatedHours !== null && service.estimatedHours !== undefined
          ? String(service.estimatedHours)
          : "",
      cost:
        service.cost !== null && service.cost !== undefined
          ? String(service.cost)
          : "",
    });
    setIsDialogOpen(true);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.title.trim()) {
      showToast.warning("Please provide a service title.");
      return;
    }
    if (!formState.description.trim()) {
      showToast.warning("Please enter a description for the service.");
      return;
    }

    const payload: CreateServicePayload = {
      title: formState.title.trim(),
      description: formState.description.trim(),
    };

    if (formState.category.trim()) {
      payload.category = formState.category.trim();
    }
    if (formState.imageUrl.trim()) {
      payload.imageUrl = formState.imageUrl.trim();
    }
    if (formState.estimatedHours.trim()) {
      const parsedHours = Number(formState.estimatedHours);
      if (Number.isNaN(parsedHours) || parsedHours <= 0) {
        showToast.warning("Estimated hours must be a positive number.");
        return;
      }
      payload.estimatedHours = parsedHours;
    }
    if (formState.cost.trim()) {
      const parsedCost = Number(formState.cost);
      if (Number.isNaN(parsedCost) || parsedCost <= 0) {
        showToast.warning("Cost must be a positive number.");
        return;
      }
      payload.cost = parsedCost;
    }

    try {
      setIsSubmitting(true);
      const response = editingService
        ? await updateServiceApi(editingService.serviceId, payload)
        : await createServiceApi(payload);
      const message =
        typeof response?.message === "string"
          ? response.message
          : editingService
            ? "Service updated successfully."
            : "Service created successfully.";
      showToast.success(message);
      handleDialogChange(false);
      await loadServices();
    } catch (err: unknown) {
      console.error("Failed to save service", err);
      const message =
        err instanceof Error
          ? err.message
          : `Failed to ${editingService ? "update" : "create"} service. Please try again.`;
      showToast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteDialog = (service: ServiceSummary) => {
    setDeleteTarget(service);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    if (isDeleting) return;
    setIsDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget?.serviceId) {
      showToast.warning("Service id missing; cannot delete.");
      closeDeleteDialog();
      return;
    }

    try {
      setIsDeleting(true);
      const response = await deleteServiceApi(deleteTarget.serviceId);
      const message =
        typeof response?.message === "string"
          ? response.message
          : "Service deleted successfully.";
      showToast.success(message);
      await loadServices();
      closeDeleteDialog();
    } catch (err: unknown) {
      console.error("Failed to delete service", err);
      const message =
        err instanceof Error
          ? err.message
          : "Failed to delete service. Please try again.";
      showToast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const sortedServices = useMemo(() => {
    return [...services].sort((a, b) => {
      const aDate = a.updatedAt || a.createdAt || "";
      const bDate = b.updatedAt || b.createdAt || "";
      return bDate.localeCompare(aDate);
    });
  }, [services]);

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bebas text-[#020079] leading-tight">
            Services Catalog
          </h1>
          <p className="font-roboto text-[#020079]/70">
            Review existing services and add new service offerings for your
            customers.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => void loadServices()}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            onClick={openCreateDialog}
            size="lg"
            className="bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold shadow-md hover:shadow-lg transition-all"
          >
            New Service
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          <p className="font-medium">Unable to load services</p>
          <p className="mt-1">{error}</p>
        </div>
      )}

      {loading ? (
        <LoadingSpinner size="large" message="Loading services..." />
      ) : sortedServices.length === 0 ? (
        <Card className="border-dashed border-2 border-[#020079]/20 bg-[#020079]/5">
          <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <h2 className="text-2xl font-bebas text-[#020079]">
              No services available
            </h2>
            <p className="font-roboto text-[#020079]/70 max-w-md">
              Create your first service to make it available for customer
              bookings and manager scheduling.
            </p>
            <Button onClick={openCreateDialog}>
              Create a Service
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {sortedServices.map((service) => (
            <Card
              key={service.serviceId}
              className="border border-[#020079]/15 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-bebas text-[#020079]">
                      {service.title}
                    </CardTitle>
                  </div>
                  {service.category && (
                    <Badge
                      variant="outline"
                      className="bg-[#020079]/10 text-[#020079] border-[#020079]/30 uppercase tracking-wide"
                    >
                      {service.category}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#020079]/30 text-[#020079] hover:bg-[#020079]/10"
                    onClick={() => {
                      setViewingService(service);
                      setEditingService(null);
                      setIsDialogOpen(true);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#020079]/30 text-[#020079] hover:bg-[#020079]/10"
                    onClick={() => openEditDialog(service)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white shadow-sm"
                    onClick={() => openDeleteDialog(service)}
                  >
                    Delete
                  </Button>
                </div>
                <p className="text-sm font-roboto text-[#020079]/70 line-clamp-3">
                  {service.description || "No description provided."}
                </p>
              </CardHeader>
              <CardContent className="space-y-3 font-roboto text-sm text-[#020079]">
                <div className="flex items-center justify-between">
                  <span className="text-[#020079]/70">Estimated Hours</span>
                  <span className="font-medium">
                    {formatHours(service.estimatedHours)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#020079]/70">Cost</span>
                  <span className="font-medium">
                    {formatCurrency(service.cost)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#020079]/60 pt-2 border-t border-dashed border-[#020079]/20">
                  <span>
                    Created:{" "}
                    <span className="font-medium">
                      {formatDate(service.createdAt)}
                    </span>
                  </span>
                  <span>
                    Updated:{" "}
                    <span className="font-medium">
                      {formatDate(service.updatedAt)}
                    </span>
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="sm:max-w-2xl w-full overflow-hidden border border-[#020079]/25 shadow-2xl rounded-2xl bg-gradient-to-br from-white via-white to-[#F5F7FF]">
          <DialogHeader className="bg-[#020079] text-white px-6 py-5 space-y-1">
            <DialogTitle className="text-2xl font-bebas tracking-wide uppercase">
              {viewingService
                ? "Service Details"
                : editingService
                ? "Edit Service"
                : "Create a New Service"}
            </DialogTitle>
            <DialogDescription className="text-sm font-roboto text-white/80">
              {viewingService
                ? "Full details of the selected service."
                : editingService
                ? "Update the details of this service offering."
                : "Define the offering so your team can schedule and assign it immediately."}
            </DialogDescription>
          </DialogHeader>
          {viewingService ? (
            <div className="px-6 py-6 space-y-6 text-[#020079] font-roboto">
              <div>
                <h3 className="font-semibold text-lg text-[#020079] uppercase tracking-wide">
                  {viewingService.title}
                </h3>
                <p className="mt-1 text-sm text-[#020079]/70">
                  Category: {viewingService.category || "N/A"}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#020079]/80 uppercase tracking-wide">
                  Description
                </h4>
                <p className="mt-2 whitespace-pre-wrap leading-relaxed">
                  {viewingService.description || "No description provided."}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wide text-[#020079]/60">
                    Estimated Hours
                  </span>
                  <p className="text-base font-semibold">
                    {formatHours(viewingService.estimatedHours)}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wide text-[#020079]/60">
                    Cost
                  </span>
                  <p className="text-base font-semibold">
                    {formatCurrency(viewingService.cost)}
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 text-sm text-[#020079]/70">
                <div>
                  <span className="block text-xs uppercase tracking-wide text-[#020079]/50">
                    Created At
                  </span>
                  <span className="font-medium">
                    {formatDate(viewingService.createdAt)}
                  </span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wide text-[#020079]/50">
                    Updated At
                  </span>
                  <span className="font-medium">
                    {formatDate(viewingService.updatedAt)}
                  </span>
                </div>
              </div>
              {viewingService.imageUrl && viewingService.imageUrl.trim() && (
                <div className="space-y-2">
                  <span className="block text-xs uppercase tracking-wide text-[#020079]/50">
                    Image Preview
                  </span>
                  <img
                    src={viewingService.imageUrl}
                    alt={viewingService.title ?? "Service image"}
                    className="w-full rounded-lg border border-[#020079]/20 object-cover max-h-64 shadow-sm"
                    onError={(event) => {
                      (event.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
              <DialogFooter className="pt-2 gap-3 justify-end">
                <Button
                  variant="ghost"
                  onClick={() => handleDialogChange(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <form
              className="px-6 py-6 space-y-6"
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <div className="space-y-2">
                <Label htmlFor="service-title">Service Title *</Label>
                <Input
                  id="service-title"
                  name="title"
                  placeholder="e.g. Premium Engine Tune-Up"
                  value={formState.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-description">Description *</Label>
                <Textarea
                  id="service-description"
                  name="description"
                  placeholder="Provide a detailed description of the service offering..."
                  value={formState.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="service-category">Category</Label>
                  <Input
                    id="service-category"
                    name="category"
                    placeholder="e.g. Engine, Electrical"
                    value={formState.category}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-image">Image URL</Label>
                  <Input
                    id="service-image"
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formState.imageUrl}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="service-hours">Estimated Hours</Label>
                  <Input
                    id="service-hours"
                    name="estimatedHours"
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="e.g. 6"
                    value={formState.estimatedHours}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-cost">Cost</Label>
                  <Input
                    id="service-cost"
                    name="cost"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g. 250"
                    value={formState.cost}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <DialogFooter className="pt-2 gap-3 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleDialogChange(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#020079] hover:bg-[#03009B]"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? editingService
                      ? "Saving..."
                      : "Creating..."
                    : editingService
                      ? "Save Changes"
                      : "Create Service"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={(open) => {
        if (!open) {
          closeDeleteDialog();
        } else {
          setIsDeleteDialogOpen(true);
        }
      }}>
        <DialogContent className="sm:max-w-md w-full border border-[#020079]/25 shadow-2xl rounded-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bebas text-[#020079]">
              Delete Service
            </DialogTitle>
            <DialogDescription className="font-roboto text-[#020079]/70">
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 font-roboto text-[#020079]">
            <p>
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {deleteTarget?.title ?? "this service"}
              </span>
              ? This will permanently remove it from the catalog.
            </p>
          </div>
          <DialogFooter className="pt-2 gap-3 justify-end">
            <Button
              variant="ghost"
              onClick={closeDeleteDialog}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              onClick={() => void handleDelete()}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
