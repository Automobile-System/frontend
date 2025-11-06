"use client"

// Import React hooks
import { useState, useCallback, FormEvent } from "react"; 

// Import all the components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Spinner } from "@/components/ui/spinner" // Keep Spinner import if it's styled for dark theme, otherwise use mock
import { User, Mail, Phone, Briefcase } from "lucide-react"


// --- MOCK SPINNER COMPONENT ---
// This is a placeholder for your "@/components/ui/spinner"
const Spinner = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`animate-spin ${className || 'h-5 w-5'}`}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
// --- END MOCK SPINNER ---


// --- MOCK useProfile HOOK ---
// This is a placeholder for your "@/hooks/useProfile"
// It simulates fetching data and handling form state.
const useProfile = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const initialData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "0771234567", // Updated mock phone number
    role: "Customer"
  };

  const [originalData, setOriginalData] = useState(initialData);
  const [formData, setFormData] = useState(initialData);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string | undefined }>({});

  // Simulate initial data fetch
  useState(() => {
    const timer = setTimeout(() => {
      setOriginalData(initialData);
      setFormData(initialData);
      setIsPageLoading(false);
    }, 1500); // 1.5 second loading simulation
    return () => clearTimeout(timer);
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors on change
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [fieldErrors]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple validation
    const errors: { [key: string]: string | undefined } = {};
    if (!formData.firstName) errors.firstName = "First name is required.";
    if (!formData.lastName) errors.lastName = "Last name is required.";
    if (!formData.email) errors.email = "Email is required.";
    
    setFieldErrors(errors);
    
    if (Object.keys(errors).some(k => errors[k])) {
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setOriginalData(formData); // "Save" the data
      setLoading(false);
      setIsEditing(false); // Go back to view mode
    }, 1000); // 1 second save simulation
  }, [formData]);

  const handleCancel = useCallback(() => {
    setFormData(originalData); // Reset form to original data
    setIsEditing(false);
    setFieldErrors({}); // Clear errors
  }, [originalData]);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const getInitials = useCallback((firstName: string, lastName: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  }, []);

  return {
    isEditing,
    isPageLoading,
    loading,
    formData,
    originalData,
    fieldErrors,
    handleChange,
    handleSubmit,
    handleCancel,
    handleEditClick,
    getInitials
  };
};
// --- END MOCK useProfile HOOK ---


export default function ProfilePage() {
  const {
    isEditing,
    isPageLoading,
    loading,
    formData,
    originalData,
    fieldErrors,
    handleChange,
    handleSubmit,
    handleCancel,
    handleEditClick,
    getInitials
  } = useProfile();

  // Show a spinner while the page is first loading
  if (isPageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4"> {/* Dark background */}
        <div className="flex flex-col justify-center items-center gap-4">
          <Spinner className="h-10 w-10 text-white" /> {/* White spinner */}
          <span className="text-gray-400">Loading Profile...</span> {/* Lighter text */}
        </div>
      </div>
    )
  }

  // --- Main Content (View or Edit) ---
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4 md:p-8 text-white">
      <div className="w-full max-w-4xl space-y-8"> {/* Added wrapper div for header and card */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-white">Profile Management</h1>
          <p className="text-gray-400 mt-2">Manage your account details.</p>
        </div>

        {isEditing ? (

          // --- EDITING MODE (THE FORM) ---
          <>
            <Card className="w-full max-w-md mx-auto shadow-xl bg-gray-800 text-white border border-gray-700">
              <CardHeader className="space-y-1 text-center bg-gray-700 border-b border-gray-600 py-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="rounded-full bg-[#e21e25] p-3">
                    <User className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-extrabold text-white">Manage Your Profile</CardTitle>
                <CardDescription className="text-gray-400">
                  Update your personal details below.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <form onSubmit={handleSubmit} className="space-y-4">


                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="flex items-center gap-2 text-gray-300 font-semibold">
                      <User className="h-4 w-4 text-gray-400" />
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={loading}
                      autoComplete="given-name"
                      className={`bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-offset-gray-700 ${fieldErrors.firstName ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    {fieldErrors.firstName && <p className="text-sm text-destructive">{fieldErrors.firstName}</p>}
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="flex items-center gap-2 text-gray-300 font-semibold">
                      <User className="h-4 w-4 text-gray-400" />
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={loading}
                      autoComplete="family-name"
                      className={`bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-offset-gray-700 ${fieldErrors.lastName ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    {fieldErrors.lastName && <p className="text-sm text-destructive">{fieldErrors.lastName}</p>}
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-gray-300 font-semibold">
                      <Mail className="h-4 w-4 text-gray-400" />
                      Email address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      autoComplete="email"
                      className={`bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-offset-gray-700 ${fieldErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    {fieldErrors.email && <p className="text-sm text-destructive">{fieldErrors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-gray-300 font-semibold">
                      <Phone className="h-4 w-4 text-gray-400" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone || ''}
                      onChange={handleChange}
                      disabled={loading}
                      autoComplete="tel"
                      className={`bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-offset-gray-700 ${fieldErrors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    {fieldErrors.phone && <p className="text-sm text-destructive">{fieldErrors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="flex items-center gap-2 text-gray-300 font-semibold">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      Role / Position
                    </Label>
                    <Input
                      id="role"
                      name="role"
                      type="text"
                      placeholder="e.g., 'Sales Manager'"
                      value={formData.role || ''}
                      onChange={handleChange}
                      disabled={loading}
                      autoComplete="organization-title"
                      className={`bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-offset-gray-700 ${fieldErrors.role ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    {fieldErrors.role && <p className="text-sm text-destructive">{fieldErrors.role}</p>}
                  </div>

                  {/* --- MODIFIED BUTTONS LAYOUT --- */}
                  <div className="flex gap-4 pt-4"> {/* Use flex and gap-4 */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-[#e21e25] text-white hover:bg-[#c0191f] text-lg py-2 h-auto" // Added flex-1 and adjusted padding
                    >
                      {loading ? <Spinner className="h-5 w-5" /> : "Save Changes"} {/* Adjusted spinner size */}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancel}
                      disabled={loading}
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 text-lg py-2 h-auto" // Added flex-1 and adjusted padding
                    >
                      Cancel
                    </Button>
                  </div>

                </form>
              </CardContent>
            </Card>
          </>
        ) : (
          // --- VIEW MODE ---
          <Card className="w-full shadow-xl bg-gray-800 text-white border border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between p-6 bg-gray-700 border-b border-gray-600 rounded-t-lg">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 text-xl bg-[#e21e25] text-white">
                  <AvatarFallback className="bg-[#e21e25] text-white text-xl font-bold">
                    {getInitials(originalData.firstName, originalData.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {originalData.firstName} {originalData.lastName}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm">
                    {originalData.role || "No role specified"}
                  </CardDescription>
                </div>
              </div>
              <Button
                onClick={handleEditClick}
                className="bg-gray-600 text-white hover:bg-gray-500 px-4 py-2"
              >
                Edit Profile
              </Button>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Full Name</h3>
                    <p className="text-white text-base">{originalData.firstName} {originalData.lastName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Phone</h3>
                    <p className="text-white text-base">{originalData.phone || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Email</h3>
                    <p className="text-white text-base">{originalData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Briefcase className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Role</h3>
                    <p className="text-white text-base">{originalData.role || "N/A"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}