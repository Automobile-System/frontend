"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import {
  fetchCustomerOverview,
  fetchCustomerList,
  addCustomer,
  deleteCustomer,
  activateCustomer,
  deactivateCustomer,
  type CustomerOverview,
  type Customer,
  type AddCustomerRequest,
} from "@/services/adminService";
import {
  Search,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Car,
  Edit,
  Trash2,
  X,
} from "lucide-react";

export default function CustomerDetailsPage() {
  const [overview, setOverview] = useState<CustomerOverview | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState<AddCustomerRequest>({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    loadCustomerData();
  }, []);

  const loadCustomerData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [overviewData, customerData] = await Promise.all([
        fetchCustomerOverview().catch((err) => {
          console.error("Error fetching overview:", err);
          // Return default overview data on error
          return {
            totalCustomers: 0,
            newThisMonth: 0,
            activeCustomers: 0,
            activityRate: 0,
            topCustomer: {
              name: "N/A",
              email: "N/A",
              totalSpent: 0,
              servicesUsed: 0,
            },
          };
        }),
        fetchCustomerList().catch((err) => {
          console.error("Error fetching customers:", err);
          // Return empty array on error
          return [];
        }),
      ]);

      setOverview(overviewData);
      setCustomers(customerData);
    } catch (error) {
      console.error("Error loading customer data:", error);
      setError("Failed to load customer data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter customers based on search and status
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && customer.status === "Active") ||
      (filterStatus === "inactive" && customer.status === "Inactive");

    return matchesSearch && matchesStatus;
  });

  const handleAddCustomer = async () => {
    try {
      // Validate form
      if (
        !newCustomerData.name ||
        !newCustomerData.email ||
        !newCustomerData.phone
      ) {
        alert("Please fill in all fields");
        return;
      }

      await addCustomer(newCustomerData);
      await loadCustomerData(); // Refresh data
      setShowAddModal(false);
      setNewCustomerData({ name: "", email: "", phone: "" }); // Reset form
      alert("Customer added successfully!");
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Failed to add customer");
    }
  };

  const handleActivate = async (customerId: string) => {
    try {
      await activateCustomer(customerId);
      await loadCustomerData(); // Refresh data
      alert("Customer activated successfully!");
    } catch (error) {
      console.error("Error activating customer:", error);
      alert("Failed to activate customer");
    }
  };

  const handleDeactivate = async (customerId: string) => {
    try {
      if (confirm("Are you sure you want to deactivate this customer?")) {
        await deactivateCustomer(customerId);
        await loadCustomerData(); // Refresh data
        alert("Customer deactivated successfully!");
      }
    } catch (error) {
      console.error("Error deactivating customer:", error);
      alert("Failed to deactivate customer");
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      if (confirm("Are you sure you want to delete this customer?")) {
        await deleteCustomer(customerId);
        await loadCustomerData(); // Refresh data
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079] mx-auto"></div>
            <p className="mt-4 font-roboto text-slate-600">
              Loading customer data...
            </p>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="p-8 bg-white min-h-screen">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-roboto">{error}</p>
            <button
              onClick={loadCustomerData}
              className="mt-2 text-sm text-red-700 underline font-roboto"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bebas text-[#020079] mb-2">
            Customer Overview
          </h1>
          <p className="font-roboto text-slate-500">
            Manage and monitor all customer information
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="border border-[#020079]/20 hover:border-[#020079] transition-all duration-300 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto font-medium text-[#020079]">
                Total Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {overview?.totalCustomers || 0}
              </div>
              <p className="text-sm font-roboto text-slate-500">
                +{overview?.newThisMonth || 0} new this month
              </p>
            </CardContent>
          </Card>

          <Card className="border border-[#020079]/20 hover:border-[#020079] transition-all duration-300 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto font-medium text-[#020079]">
                Active Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {overview?.activeCustomers || 0}
              </div>
              <p className="text-sm font-roboto text-slate-500">
                {overview?.activityRate || 0}% activity rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Top Customer Card */}
        <Card className="border border-[#020079]/20 bg-white mb-10">
          <CardHeader className="border-b border-[#020079]/20">
            <CardTitle className="text-xl font-bebas text-[#020079]">
              Top Spending Customer
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#020079]/10 flex items-center justify-center">
                  <span className="text-2xl font-bebas text-[#020079]">
                    {overview?.topCustomer?.name?.charAt(0) || "N"}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-roboto font-semibold text-[#020079]">
                    {overview?.topCustomer?.name || "N/A"}
                  </p>
                  <p className="text-sm font-roboto text-slate-500">
                    {overview?.topCustomer?.email || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="text-right">
                  <p className="text-sm font-roboto text-slate-600 mb-1">
                    Total Spent
                  </p>
                  <p className="text-2xl font-bebas text-[#020079]">
                    LKR{" "}
                    {(overview?.topCustomer?.totalSpent || 0).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-roboto text-slate-600 mb-1">
                    Services Used
                  </p>
                  <p className="text-2xl font-bebas text-[#020079]">
                    {overview?.topCustomer?.servicesUsed || 0}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer List */}
        <Card className="border border-[#020079]/20 bg-white">
          <CardHeader className="border-b border-[#020079]/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bebas text-[#020079]">
                All Customers
              </CardTitle>
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add New Customer
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#020079]/30 focus:border-[#020079] font-roboto"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  className={
                    filterStatus === "all"
                      ? "bg-[#020079] hover:bg-[#03009B] text-white font-roboto"
                      : "border-[#020079]/30 text-[#020079] hover:bg-[#020079]/5 font-roboto"
                  }
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "active" ? "default" : "outline"}
                  onClick={() => setFilterStatus("active")}
                  className={
                    filterStatus === "active"
                      ? "bg-[#020079] hover:bg-[#03009B] text-white font-roboto"
                      : "border-[#020079]/30 text-[#020079] hover:bg-[#020079]/5 font-roboto"
                  }
                >
                  Active
                </Button>
                <Button
                  variant={filterStatus === "inactive" ? "default" : "outline"}
                  onClick={() => setFilterStatus("inactive")}
                  className={
                    filterStatus === "inactive"
                      ? "bg-[#020079] hover:bg-[#03009B] text-white font-roboto"
                      : "border-[#020079]/30 text-[#020079] hover:bg-[#020079]/5 font-roboto"
                  }
                >
                  Inactive
                </Button>
              </div>
            </div>

            {/* Customer Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#020079]/20">
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Customer Info
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Vehicles
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Total Spent
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Last Service
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-[#020079]/5 transition-colors"
                    >
                      <td className="px-6 py-4 border-b border-[#020079]/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#020079]/10 flex items-center justify-center">
                            <span className="text-base font-bebas text-[#020079]">
                              {customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-roboto font-semibold text-[#020079]">
                              {customer.name}
                            </p>
                            <p className="text-sm font-roboto text-slate-500">
                              ID: {customer.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 border-b border-[#020079]/10">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm font-roboto text-slate-600">
                            <Mail className="w-3 h-3" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm font-roboto text-slate-600">
                            <Phone className="w-3 h-3" />
                            {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 border-b border-[#020079]/10">
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-[#020079]" />
                          <span className="font-roboto font-semibold text-[#020079]">
                            {customer.vehicleCount}
                          </span>
                          <span className="text-sm font-roboto text-slate-500">
                            {customer.vehicleCount === 1
                              ? "vehicle"
                              : "vehicles"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 border-b border-[#020079]/10">
                        <span className="font-roboto font-semibold text-[#020079]">
                          LKR {customer.totalSpent.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#020079]/10">
                        <div className="flex items-center gap-2 text-sm font-roboto text-slate-600">
                          <Calendar className="w-3 h-3" />
                          {customer.lastServiceDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 border-b border-[#020079]/10">
                        <Badge
                          className={
                            customer.status === "Active"
                              ? "bg-[#020079]/10 text-[#020079] hover:bg-[#020079]/20 border-0 font-roboto"
                              : "bg-[#020079]/10 text-[#020079]/70 hover:bg-[#020079]/20 border-0 font-roboto"
                          }
                        >
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 border-b border-[#020079]/10">
                        <div className="flex flex-col gap-2">
                          {customer.status === "Active" ? (
                            <Button
                              size="sm"
                              onClick={() => handleDeactivate(customer.id)}
                              className="bg-orange-500 hover:bg-orange-600 text-white font-roboto w-full"
                              title="Deactivate customer"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Deactivate
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleActivate(customer.id)}
                              className="bg-green-600 hover:bg-green-700 text-white font-roboto w-full"
                              title="Activate customer"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Activate
                            </Button>
                          )}
                          <Button
                            size="sm"
                            onClick={() => handleDeleteCustomer(customer.id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-roboto w-full"
                            title="Delete customer"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCustomers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400 font-roboto">
                  No customers found matching your criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Customer Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4">
              <div className="flex items-center justify-between p-6 border-b border-[#020079]/20">
                <h2 className="text-2xl font-bebas text-[#020079]">
                  Add New Customer
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-sm font-roboto font-medium text-[#020079] mb-2 block"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter customer name"
                    value={newCustomerData.name}
                    onChange={(e) =>
                      setNewCustomerData({
                        ...newCustomerData,
                        name: e.target.value,
                      })
                    }
                    className="border-[#020079]/30 focus:border-[#020079] font-roboto"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-roboto font-medium text-[#020079] mb-2 block"
                  >
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={newCustomerData.email}
                    onChange={(e) =>
                      setNewCustomerData({
                        ...newCustomerData,
                        email: e.target.value,
                      })
                    }
                    className="border-[#020079]/30 focus:border-[#020079] font-roboto"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-roboto font-medium text-[#020079] mb-2 block"
                  >
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+94 77 123 4567"
                    value={newCustomerData.phone}
                    onChange={(e) =>
                      setNewCustomerData({
                        ...newCustomerData,
                        phone: e.target.value,
                      })
                    }
                    className="border-[#020079]/30 focus:border-[#020079] font-roboto"
                  />
                </div>
              </div>
              <div className="flex gap-3 p-6 border-t border-[#020079]/20">
                <Button
                  onClick={() => setShowAddModal(false)}
                  variant="outline"
                  className="flex-1 border-[#020079]/30 text-[#020079] hover:bg-[#020079]/5 font-roboto"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddCustomer}
                  className="flex-1 bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold"
                >
                  Add Customer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
