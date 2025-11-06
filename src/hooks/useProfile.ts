// hooks/useProfile.ts
"use client" // Hooks that use state must be client components

import { useState, useEffect } from "react";

// Define the shape of your user data
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  accountType: string;
}

// Define the shape of the errors
interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

// Initial empty state for the form
const initialFormData: UserData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "Customer",
  accountType: "Customer Account",
};

export function useProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [loading, setLoading] = useState(false); // For the "Save" button
  
  const [formData, setFormData] = useState<UserData>(initialFormData);
  const [originalData, setOriginalData] = useState<UserData>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Fetch initial data on load
  useEffect(() => {
    const fetchUserData = async () => {
      setIsPageLoading(true);
      try {
        // --- SIMULATE API CALL ---
        const simulateApiCall = (): Promise<UserData> => 
          new Promise((resolve) => 
            setTimeout(() => {
              resolve({
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                phone: "0771234567",
                role: "Customer",
                accountType: "Customer Account",
              });
            }, 1500)
          );
        
        const data = await simulateApiCall();
        setFormData(data);
        setOriginalData(data);

      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // --- VALIDATION LOGIC ---
  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required.";
    }
    // Add more validation as needed (e.g., phone format)
    
    return errors;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error for this field as the user types
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({}); // Clear old errors

    // --- Run validation ---
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return; // Stop submission
    }

    setLoading(true);
    
    // --- Simulating the API save call ---
    console.log("Saving data:", formData);
    setTimeout(() => {
      console.log("Data saved!");
      setOriginalData(formData);
      setLoading(false);
      setIsEditing(false); // Return to view mode
    }, 2000);
  };

  // Handle clicking "Cancel"
  const handleCancel = () => {
    setFormData(originalData); // Revert changes
    setIsEditing(false);
    setFieldErrors({}); // Clear any errors
  };

  // Handle clicking "Edit"
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Helper to get initials
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
  };

  // --- Return all the states and functions the page needs ---
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
}