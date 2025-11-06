"use client"

// Import React hooks
import { useState, useCallback, FormEvent } from "react"; 

// Import all the components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Mail, Phone, Briefcase } from "lucide-react"


// --- Lightweight inline spinner ---
const Spinner = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={`animate-spin ${className || 'h-5 w-5'}`}
  >
    <circle cx="12" cy="12" r="10" stroke="#020079" strokeWidth="4" fill="none" opacity="0.2" />
    <path d="M22 12a10 10 0 0 1-10 10" stroke="#020079" strokeWidth="4" fill="none" />
  </svg>
);


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
      <div className="flex min-h-screen items-center justify-center bg-white p-8">
        <div className="flex flex-col justify-center items-center gap-3">
          <Spinner className="h-10 w-10" />
          <span className="text-[#020079]/70 font-roboto">Loading Profile...</span>
        </div>
      </div>
    )
  }

  // --- Main Content (View or Edit) ---
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bebas text-[#020079] tracking-wide">PROFILE MANAGEMENT</h1>
          <p className="font-roboto text-[#020079]/70 mt-1">Manage your account details.</p>
        </div>

        {isEditing ? (

          // --- EDITING MODE (THE FORM) ---
          <>
            <Card className="w-full max-w-2xl mx-auto bg-white border border-[#020079]/20 shadow-sm">
              <CardHeader className="border-b-2 border-[#020079]/20 pb-4">
                <CardTitle className="text-2xl font-bebas text-[#020079] tracking-wide font-normal">MANAGE YOUR PROFILE</CardTitle>
                <CardDescription className="font-roboto text-[#020079]/70">Update your personal details below.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 p-6">
                <form onSubmit={handleSubmit} className="space-y-5">


                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                      First Name <span className="text-[#FFD700]">*</span>
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
                      className={`h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20 ${fieldErrors.firstName ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.firstName && <p className="text-sm text-red-600">{fieldErrors.firstName}</p>}
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                      Last Name <span className="text-[#FFD700]">*</span>
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
                      className={`h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20 ${fieldErrors.lastName ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.lastName && <p className="text-sm text-red-600">{fieldErrors.lastName}</p>}
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                      Email Address <span className="text-[#FFD700]">*</span>
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
                      className={`h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20 ${fieldErrors.email ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.email && <p className="text-sm text-red-600">{fieldErrors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
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
                      className={`h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20 ${fieldErrors.phone ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.phone && <p className="text-sm text-red-600">{fieldErrors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
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
                      className={`h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20 ${fieldErrors.role ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.role && <p className="text-sm text-red-600">{fieldErrors.role}</p>}
                  </div>

                  {/* --- ACTIONS --- */}
                  <div className="flex gap-4 pt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 h-12 bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold"
                    >
                      {loading ? <Spinner className="h-5 w-5" /> : "Save Changes"}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancel}
                      disabled={loading}
                      variant="outline"
                      className="flex-1 h-12 border-[#020079]/30 text-[#020079] hover:bg-[#020079]/10"
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
          <Card className="w-full bg-white border border-[#020079]/20 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-[#020079]/15">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-[#020079] text-white text-lg font-bold">
                    {getInitials(originalData.firstName, originalData.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-bebas text-[#020079] tracking-wide">
                    {originalData.firstName} {originalData.lastName}
                  </CardTitle>
                  <CardDescription className="font-roboto text-[#020079]/70 text-sm">
                    {originalData.role || "No role specified"}
                  </CardDescription>
                </div>
              </div>
              <Button
                onClick={handleEditClick}
                className="h-10 bg-[#020079] hover:bg-[#03009B] text-white font-roboto"
              >
                Edit Profile
              </Button>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <User className="h-5 w-5 text-[#020079]/60" />
                  <div>
                    <h3 className="text-sm font-roboto text-[#020079]/60">Full Name</h3>
                    <p className="text-base font-roboto text-[#020079]">{originalData.firstName} {originalData.lastName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-[#020079]/60" />
                  <div>
                    <h3 className="text-sm font-roboto text-[#020079]/60">Phone</h3>
                    <p className="text-base font-roboto text-[#020079]">{originalData.phone || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-[#020079]/60" />
                  <div>
                    <h3 className="text-sm font-roboto text-[#020079]/60">Email</h3>
                    <p className="text-base font-roboto text-[#020079]">{originalData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Briefcase className="h-5 w-5 text-[#020079]/60" />
                  <div>
                    <h3 className="text-sm font-roboto text-[#020079]/60">Role</h3>
                    <p className="text-base font-roboto text-[#020079]">{originalData.role || "N/A"}</p>
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