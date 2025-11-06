"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Phone, 
  Mail, 
  Car, 
  Wrench, 
  FolderKanban,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import {
  // fetchCustomerOverview,
  // fetchCustomerList,
  // fetchCustomerDetails,
  // fetchCustomerActiveServices,
  // fetchCustomerActiveProjects,
  // fetchCustomerServiceHistory,
  // fetchCustomerProjectHistory,
  CustomerOverview,
  Customer,
  CustomerDetails,
  CustomerService,
  CustomerProject,
} from "@/services/managerService";
import { showToast } from "@/lib/toast";

// Mock data for development/testing
const MOCK_OVERVIEW: CustomerOverview = {
  totalCustomers: 150,
  newThisMonth: 12,
  activeCustomers: 128,
  activityRate: 85.3,
  topCustomer: {
    name: "Nimal Perera",
    email: "nimal.perera@email.com",
    totalSpent: 245780,
    servicesUsed: 18,
  },
  ratingDistribution: {
    five: 65.5,
    four: 22.3,
    three: 8.7,
    below: 3.5,
  },
};

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "CUST001",
    name: "Nimal Perera",
    email: "nimal.perera@email.com",
    phone: "+94 77 123 4567",
    vehicleCount: 2,
    totalSpent: 245780,
    lastServiceDate: "2024-10-28",
    status: "Active",
  },
  {
    id: "CUST002",
    name: "Saman Silva",
    email: "saman.silva@email.com",
    phone: "+94 71 234 5678",
    vehicleCount: 1,
    totalSpent: 125450,
    lastServiceDate: "2024-10-25",
    status: "Active",
  },
  {
    id: "CUST003",
    name: "Kamal Fernando",
    email: "kamal.fernando@email.com",
    phone: "+94 76 345 6789",
    vehicleCount: 3,
    totalSpent: 189200,
    lastServiceDate: "2024-11-01",
    status: "Active",
  },
  {
    id: "CUST004",
    name: "Priya Wickramasinghe",
    email: "priya.w@email.com",
    phone: "+94 75 456 7890",
    vehicleCount: 1,
    totalSpent: 98500,
    lastServiceDate: "2024-10-20",
    status: "Active",
  },
  {
    id: "CUST005",
    name: "Ruwan Dias",
    email: "ruwan.dias@email.com",
    phone: "+94 77 567 8901",
    vehicleCount: 2,
    totalSpent: 156800,
    lastServiceDate: "2024-10-15",
    status: "Inactive",
  },
  {
    id: "CUST006",
    name: "Chamini Jayasinghe",
    email: "chamini.j@email.com",
    phone: "+94 71 678 9012",
    vehicleCount: 1,
    totalSpent: 67300,
    lastServiceDate: "2024-10-18",
    status: "Active",
  },
  {
    id: "CUST007",
    name: "Anil Gunasekara",
    email: "anil.g@email.com",
    phone: "+94 76 789 0123",
    vehicleCount: 2,
    totalSpent: 134900,
    lastServiceDate: "2024-11-02",
    status: "Active",
  },
  {
    id: "CUST008",
    name: "Dilini Rajapaksa",
    email: "dilini.r@email.com",
    phone: "+94 75 890 1234",
    vehicleCount: 1,
    totalSpent: 45600,
    lastServiceDate: "2024-09-30",
    status: "Inactive",
  },
];

const MOCK_CUSTOMER_DETAILS: CustomerDetails = {
  id: "CUST001",
  name: "Nimal Perera",
  email: "nimal.perera@email.com",
  phone: "+94 77 123 4567",
  status: "Active",
  memberSince: "2023-01-15",
  vehicleCount: 2,
  totalServices: 18,
  totalProjects: 3,
  totalSpent: 245780,
  address: "123 Main Street, Colombo 07",
  notes: "Preferred customer, always pays on time",
};

const MOCK_ACTIVE_SERVICES: CustomerService[] = [
  {
    id: "SRV001",
    serviceName: "Full Service",
    vehicleInfo: "Toyota Corolla - ABC-1234",
    status: "In Progress",
    startDate: "2024-11-01",
    expectedCompletion: "2024-11-08",
    assignedEmployee: "Kamal Silva",
    cost: 15000,
    progress: 65,
    notes: "Waiting for spare parts",
  },
  {
    id: "SRV002",
    serviceName: "Engine Diagnostics",
    vehicleInfo: "Honda Civic - XYZ-5678",
    status: "Pending",
    startDate: "2024-11-05",
    expectedCompletion: "2024-11-06",
    assignedEmployee: "Sunil Fernando",
    cost: 8000,
    progress: 0,
  },
];

const MOCK_ACTIVE_PROJECTS: CustomerProject[] = [
  {
    id: "PRJ001",
    projectName: "Custom Body Kit Installation",
    description: "Full body kit with paint job",
    status: "In Progress",
    startDate: "2024-10-15",
    expectedCompletion: "2024-11-30",
    progress: 45,
    budget: 150000,
    assignedTeam: ["Kamal Silva", "Sunil Fernando", "Nimal Dias"],
    notes: "Customer requested premium paint",
  },
];

const MOCK_SERVICE_HISTORY: CustomerService[] = [
  {
    id: "SRV010",
    serviceName: "Oil Change",
    vehicleInfo: "Toyota Corolla - ABC-1234",
    status: "Completed",
    startDate: "2024-09-15",
    expectedCompletion: "2024-09-15",
    assignedEmployee: "Ravi Kumar",
    cost: 5000,
    progress: 100,
  },
  {
    id: "SRV011",
    serviceName: "Brake Service",
    vehicleInfo: "Honda Civic - XYZ-5678",
    status: "Completed",
    startDate: "2024-08-20",
    expectedCompletion: "2024-08-21",
    assignedEmployee: "Kamal Silva",
    cost: 12000,
    progress: 100,
  },
  {
    id: "SRV012",
    serviceName: "Tire Replacement",
    vehicleInfo: "Toyota Corolla - ABC-1234",
    status: "Completed",
    startDate: "2024-07-10",
    expectedCompletion: "2024-07-10",
    assignedEmployee: "Sunil Fernando",
    cost: 28000,
    progress: 100,
  },
];

const MOCK_PROJECT_HISTORY: CustomerProject[] = [
  {
    id: "PRJ010",
    projectName: "Performance Upgrade",
    description: "Engine tuning and exhaust system",
    status: "Completed",
    startDate: "2024-06-01",
    expectedCompletion: "2024-06-30",
    progress: 100,
    budget: 85000,
    assignedTeam: ["Kamal Silva", "Ravi Kumar"],
  },
  {
    id: "PRJ011",
    projectName: "Interior Restoration",
    description: "Complete interior refurbishment",
    status: "Completed",
    startDate: "2024-03-15",
    expectedCompletion: "2024-04-15",
    progress: 100,
    budget: 95000,
    assignedTeam: ["Nimal Dias", "Sunil Fernando"],
  },
];

export default function CustomerDetailsPage() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<CustomerOverview | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetails | null>(null);
  const [activeServices, setActiveServices] = useState<CustomerService[]>([]);
  const [activeProjects, setActiveProjects] = useState<CustomerProject[]>([]);
  const [serviceHistory, setServiceHistory] = useState<CustomerService[]>([]);
  const [projectHistory, setProjectHistory] = useState<CustomerProject[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      // Use mock data for now - replace with API calls when backend is ready
      // const [overviewData, customerList] = await Promise.all([
      //   fetchCustomerOverview(),
      //   fetchCustomerList(),
      // ]);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setOverview(MOCK_OVERVIEW);
      setCustomers(MOCK_CUSTOMERS);
      setFilteredCustomers(MOCK_CUSTOMERS);
      
      showToast.success("Success", "Customer data loaded successfully");
    } catch (error) {
      showToast.error("Error", "Failed to load customer data");
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = [...customers];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone.includes(searchTerm)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (customer) => customer.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredCustomers(filtered);
  }, [searchTerm, statusFilter, customers]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const loadCustomerDetails = async (_customerId: string) => {
    try {
      setDetailsLoading(true);
      setIsDetailsOpen(true);

      // Use mock data for now - replace with API calls when backend is ready
      // const [details, active, projects, servHistory, projHistory] = await Promise.all([
      //   fetchCustomerDetails(customerId),
      //   fetchCustomerActiveServices(customerId),
      //   fetchCustomerActiveProjects(customerId),
      //   fetchCustomerServiceHistory(customerId),
      //   fetchCustomerProjectHistory(customerId),
      // ]);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setSelectedCustomer(MOCK_CUSTOMER_DETAILS);
      setActiveServices(MOCK_ACTIVE_SERVICES);
      setActiveProjects(MOCK_ACTIVE_PROJECTS);
      setServiceHistory(MOCK_SERVICE_HISTORY);
      setProjectHistory(MOCK_PROJECT_HISTORY);
    } catch (error) {
      showToast.error("Error", "Failed to load customer details");
      console.error("Error loading customer details:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "active") {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200">
          {status}
        </Badge>
      );
    } else if (statusLower === "inactive") {
      return (
        <Badge className="bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200">
          {status}
        </Badge>
      );
    }
    return (
      <Badge className="bg-blue-100 text-blue-800 border-blue-300">
        {status}
      </Badge>
    );
  };

  const getServiceStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    
    if (statusLower === "in progress") {
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-300 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {status}
        </Badge>
      );
    } else if (statusLower === "completed") {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-300 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          {status}
        </Badge>
      );
    } else if (statusLower === "pending") {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 flex items-center gap-1">
          <Activity className="w-3 h-3" />
          {status}
        </Badge>
      );
    } else if (statusLower === "cancelled") {
      return (
        <Badge className="bg-red-100 text-red-800 border-red-300 flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          {status}
        </Badge>
      );
    }
    
    return (
      <Badge className="bg-gray-100 text-gray-800 border-gray-300 flex items-center gap-1">
        <Activity className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079] mx-auto"></div>
          <p className="mt-4 text-[#020079]">Loading customer data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bebas text-[#020079] mb-2">
            Customer Details
          </h1>
          <p className="text-[#020079]/70 font-roboto">
            Manage and view customer information, active services, and project history
          </p>
        </div>

        {/* Overview Cards */}
        {overview && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white border-[#020079]/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-roboto text-[#020079]/60 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Total Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bebas text-[#020079] mb-2">
                  {overview.totalCustomers}
                </div>
                <p className="text-sm font-roboto text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +{overview.newThisMonth} this month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#020079]/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-roboto text-[#020079]/60 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Active Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bebas text-[#020079] mb-2">
                  {overview.activeCustomers}
                </div>
                <p className="text-sm font-roboto text-[#020079]/70">
                  {overview.activityRate}% activity rate
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#020079]/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-roboto text-[#020079]/60 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Top Customer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bebas text-[#020079] mb-1">
                  {overview.topCustomer.name}
                </div>
                <p className="text-sm font-roboto text-[#020079]/70">
                  Rs. {overview.topCustomer.totalSpent.toLocaleString()}
                </p>
                <p className="text-xs font-roboto text-[#020079]/50">
                  {overview.topCustomer.servicesUsed} services
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#020079]/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-roboto text-[#020079]/60 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-900">
                    <span>5 ⭐</span>
                    <span className="font-semibold">{overview.ratingDistribution.five}%</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-900">
                    <span>4 ⭐</span>
                    <span className="font-semibold">{overview.ratingDistribution.four}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search and Filters */}
        <Card className="bg-white border-[#020079]/20">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px] bg-white border-gray-300 text-gray-900">
                  <Filter className="w-4 h-4 mr-2 text-gray-600" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-black">
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Customer List */}
        <Card className="bg-white border-[#020079]/20">
          <CardHeader>
            <CardTitle className="font-roboto text-[#020079] flex items-center gap-2">
              <Users className="w-5 h-5" />
              Customer List ({filteredCustomers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="text-gray-700 font-semibold">Customer ID</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Name</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Contact</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Vehicles</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Total Spent</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Last Service</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <TableCell className="font-mono text-sm text-gray-900">
                        {customer.id}
                      </TableCell>
                      <TableCell className="font-semibold text-gray-900">
                        {customer.name}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Mail className="w-3 h-3 text-gray-500" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Phone className="w-3 h-3 text-gray-500" />
                            {customer.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-gray-900">
                          <Car className="w-4 h-4 text-gray-500" />
                          {customer.vehicleCount}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-gray-900">
                        Rs. {customer.totalSpent.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-700">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          {customer.lastServiceDate || "N/A"}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => loadCustomerDetails(customer.id)}
                          className="flex items-center gap-2 bg-white hover:bg-[#020079] hover:text-white border-[#020079] text-[#020079] transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Customer Details Modal */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bebas text-gray-900">
                Customer Details
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Comprehensive view of customer information and activity
              </DialogDescription>
            </DialogHeader>

            {detailsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079] mx-auto"></div>
                  <p className="mt-4 text-gray-900">Loading details...</p>
                </div>
              </div>
            ) : selectedCustomer ? (
              <div className="space-y-6">
                {/* Customer Info */}
                <Card className="bg-gray-50 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 font-semibold">Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Customer ID</p>
                        <p className="font-mono font-semibold text-gray-900">{selectedCustomer.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-semibold text-gray-900">{selectedCustomer.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="text-sm text-gray-900">{selectedCustomer.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="text-sm text-gray-900">{selectedCustomer.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        {getStatusBadge(selectedCustomer.status)}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="text-sm text-gray-900">{selectedCustomer.memberSince}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        
                        <p className="text-2xl font-bebas text-gray-900">
                          {selectedCustomer.vehicleCount}
                        </p>
                        <p className="text-sm text-gray-700 font-medium">Vehicles</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-6">
                      <div className="text-center">
                       
                        <p className="text-2xl font-bebas text-gray-900">
                          {selectedCustomer.totalServices}
                        </p>
                        <p className="text-sm text-gray-700 font-medium">Total Services</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="pt-6">
                      <div className="text-center">
                       
                        <p className="text-2xl font-bebas text-gray-900">
                          {selectedCustomer.totalProjects}
                        </p>
                        <p className="text-sm text-gray-700 font-medium">Total Projects</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-amber-50 border-amber-200">
                    <CardContent className="pt-6">
                      <div className="text-center">
                       
                        <p className="text-2xl font-bebas text-gray-900">
                          {selectedCustomer.totalSpent.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-700 font-medium">Total Spent (Rs.)</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Tabs for Active and History */}
                <Tabs defaultValue="active-services" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                    <TabsTrigger value="active-services" className="text-gray-900 data-[state=active]:bg-white data-[state=active]:text-[#020079]">
                      Active Services ({activeServices.length})
                    </TabsTrigger>
                    <TabsTrigger value="active-projects" className="text-gray-900 data-[state=active]:bg-white data-[state=active]:text-[#020079]">
                      Active Projects ({activeProjects.length})
                    </TabsTrigger>
                    <TabsTrigger value="service-history" className="text-gray-900 data-[state=active]:bg-white data-[state=active]:text-[#020079]">
                      Service History ({serviceHistory.length})
                    </TabsTrigger>
                    <TabsTrigger value="project-history" className="text-gray-900 data-[state=active]:bg-white data-[state=active]:text-[#020079]">
                      Project History ({projectHistory.length})
                    </TabsTrigger>
                  </TabsList>

                  {/* Active Services */}
                  <TabsContent value="active-services">
                    <Card className="bg-white border-gray-200">
                      <CardContent className="pt-6">
                        {activeServices.length === 0 ? (
                          <p className="text-center text-gray-600 py-8">
                            No active services
                          </p>
                        ) : (
                          <div className="space-y-4">
                            {activeServices.map((service) => (
                              <Card key={service.id} className="border-gray-200 bg-gray-50">
                                <CardContent className="pt-6">
                                  <div className="flex justify-between items-start mb-4">
                                    <div>
                                      <h4 className="font-semibold text-lg text-gray-900">
                                        {service.serviceName}
                                      </h4>
                                      <p className="text-sm text-gray-600">
                                        {service.vehicleInfo}
                                      </p>
                                    </div>
                                    {getServiceStatusBadge(service.status)}
                                  </div>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                      <p className="text-gray-600">Start Date</p>
                                      <p className="font-semibold text-gray-900">{service.startDate}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Expected Completion</p>
                                      <p className="font-semibold text-gray-900">{service.expectedCompletion}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Assigned To</p>
                                      <p className="font-semibold text-gray-900">{service.assignedEmployee}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Cost</p>
                                      <p className="font-semibold text-gray-900">Rs. {service.cost.toLocaleString()}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Active Projects */}
                  <TabsContent value="active-projects">
                    <Card className="bg-white border-gray-200">
                      <CardContent className="pt-6">
                        {activeProjects.length === 0 ? (
                          <p className="text-center text-gray-600 py-8">
                            No active projects
                          </p>
                        ) : (
                          <div className="space-y-4">
                            {activeProjects.map((project) => (
                              <Card key={project.id} className="border-gray-200 bg-gray-50">
                                <CardContent className="pt-6">
                                  <div className="flex justify-between items-start mb-4">
                                    <div>
                                      <h4 className="font-semibold text-lg text-gray-900">
                                        {project.projectName}
                                      </h4>
                                      <p className="text-sm text-gray-600">
                                        {project.description}
                                      </p>
                                    </div>
                                    {getServiceStatusBadge(project.status)}
                                  </div>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                      <p className="text-gray-600">Start Date</p>
                                      <p className="font-semibold text-gray-900">{project.startDate}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Expected Completion</p>
                                      <p className="font-semibold text-gray-900">{project.expectedCompletion}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Progress</p>
                                      <p className="font-semibold text-gray-900">{project.progress}%</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Budget</p>
                                      <p className="font-semibold text-gray-900">Rs. {project.budget.toLocaleString()}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Service History */}
                  <TabsContent value="service-history">
                    <Card className="bg-white border-gray-200">
                      <CardContent className="pt-6">
                        {serviceHistory.length === 0 ? (
                          <p className="text-center text-gray-600 py-8">
                            No service history
                          </p>
                        ) : (
                          <div className="space-y-3">
                            {serviceHistory.map((service) => (
                              <div
                                key={service.id}
                                className="flex justify-between items-center p-4 border border-[#020079]/10 rounded-lg"
                              >
                                <div className="flex-1">
                                  <p className="font-semibold text-gray-900">
                                    {service.serviceName}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {service.vehicleInfo}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {service.startDate} - {service.expectedCompletion}
                                  </p>
                                </div>
                                <div className="text-right">
                                  {getServiceStatusBadge(service.status)}
                                  <p className="text-sm font-semibold text-gray-900 mt-2">
                                    Rs. {service.cost.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Project History */}
                  <TabsContent value="project-history">
                    <Card className="bg-white border-gray-200">
                      <CardContent className="pt-6">
                        {projectHistory.length === 0 ? (
                          <p className="text-center text-gray-600 py-8">
                            No project history
                          </p>
                        ) : (
                          <div className="space-y-3">
                            {projectHistory.map((project) => (
                              <div
                                key={project.id}
                                className="flex justify-between items-center p-4 border border-[#020079]/10 rounded-lg"
                              >
                                <div className="flex-1">
                                  <p className="font-semibold text-gray-900">
                                    {project.projectName}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {project.description}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {project.startDate} - {project.expectedCompletion}
                                  </p>
                                </div>
                                <div className="text-right">
                                  {getServiceStatusBadge(project.status)}
                                  <p className="text-sm font-semibold text-gray-900 mt-2">
                                    Rs. {project.budget.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
