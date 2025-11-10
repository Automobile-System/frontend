"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Info } from "lucide-react"

interface ManagerFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  managerId: string
  joinDate: string
  username: string
  password: string
  address: string
}

interface EmployeeFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  employeeId: string
  specialization: string
  joinDate: string
  salary: string
  username: string
  password: string
  experience: string
  address: string
}

interface AddManagerModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ManagerFormData) => void
}

interface AddEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: EmployeeFormData) => void
}

const specializations = [
  "Engine Specialist",
  "Electrical Systems",
  "Brake Systems",
  "Transmission Specialist",
  "Bodywork & Paint",
  "Suspension & Steering",
  "AC & Cooling Systems",
  "General Mechanic"
]

export function AddManagerModal({ isOpen, onClose, onSubmit }: AddManagerModalProps) {
  const [formData, setFormData] = useState<ManagerFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    managerId: "",
    joinDate: new Date().toISOString().split('T')[0],
    username: "",
    password: "",
    address: ""
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      managerId: "",
      joinDate: new Date().toISOString().split('T')[0],
      username: "",
      password: "",
      address: ""
    })
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100 p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Add New Manager</h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700">
              All managers will have access to employee management, task assignment, and customer handling features.
            </p>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="managerFirstName" className="text-slate-700 mb-2 block">
                First Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="managerFirstName"
                type="text"
                required
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="managerLastName" className="text-slate-700 mb-2 block">
                Last Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="managerLastName"
                type="text"
                required
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-700"
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="managerEmail" className="text-slate-700 mb-2 block">
                Email Address <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="managerEmail"
                type="email"
                required
                placeholder="manager@center.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="managerPhone" className="text-slate-700 mb-2 block">
                Phone Number <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="managerPhone"
                type="tel"
                required
                placeholder="+94 77 XXX XXXX"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-700"
              />
            </div>
          </div>

          {/* Join Date */}
          <div className="mb-6">
            <Label htmlFor="managerJoinDate" className="text-slate-700 mb-2 block">
              Join Date <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="managerJoinDate"
              type="date"
              required
              value={formData.joinDate}
              onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-700"
            />
          </div>

          {/* Credentials */}
          <div className="mb-6">
            <Label htmlFor="managerPassword" className="text-slate-700 mb-2 block">
              Temporary Password <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="managerPassword"
              type="password"
              required
              placeholder="Initial password (user can change later)"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-700"
            />
          </div>

          {/* Address */}
          <div className="mb-6">
            <Label htmlFor="managerAddress" className="text-slate-700 mb-2 block">
              Address
            </Label>
            <textarea
              id="managerAddress"
              placeholder="Optional: Enter address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px] text-slate-700"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Add Manager
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function AddEmployeeModal({ isOpen, onClose, onSubmit }: AddEmployeeModalProps) {
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    employeeId: "",
    specialization: "",
    joinDate: new Date().toISOString().split('T')[0],
    salary: "65000",
    username: "",
    password: "",
    experience: "",
    address: ""
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      employeeId: "",
      specialization: "",
      joinDate: new Date().toISOString().split('T')[0],
      salary: "65000",
      username: "",
      password: "",
      experience: "",
      address: ""
    })
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100 p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Add New Employee</h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700">
              Employees will be assigned to managers and will receive task assignments based on their specialization.
            </p>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="employeeFirstName" className="text-slate-700 mb-2 block">
                First Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="employeeFirstName"
                type="text"
                required
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="employeeLastName" className="text-slate-700 mb-2 block">
                Last Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="employeeLastName"
                type="text"
                required
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-700"
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="employeeEmail" className="text-slate-700 mb-2 block">
                Email Address <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="employeeEmail"
                type="email"
                required
                placeholder="employee@center.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="employeePhone" className="text-slate-700 mb-2 block">
                Phone Number <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="employeePhone"
                type="tel"
                required
                placeholder="+94 71 XXX XXXX"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-700"
              />
            </div>
          </div>

          {/* Specialization */}
          <div className="mb-6">
            <Label htmlFor="employeeSpecialization" className="text-slate-700 mb-2 block">
              Specialization <span className="text-rose-500">*</span>
            </Label>
            <select
              id="employeeSpecialization"
              required
              value={formData.specialization}
              onChange={(e) => setFormData({...formData, specialization: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-700"
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Join Date and Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="employeeJoinDate" className="text-slate-700 mb-2 block">
                Join Date <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="employeeJoinDate"
                type="date"
                required
                value={formData.joinDate}
                onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="employeeSalary" className="text-slate-700 mb-2 block">
                Base Salary (LKR/month) <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="employeeSalary"
                type="number"
                required
                placeholder="65000"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-700"
              />
            </div>
          </div>

          {/* Credentials */}
          <div className="mb-6">
            <Label htmlFor="employeePassword" className="text-slate-700 mb-2 block">
              Temporary Password <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="employeePassword"
              type="password"
              required
              placeholder="Initial password (user can change later)"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-700"
            />
          </div>

          {/* Experience */}
          <div className="mb-6">
            <Label htmlFor="employeeExperience" className="text-slate-700 mb-2 block">
              Years of Experience
            </Label>
            <Input
              id="employeeExperience"
              type="number"
              min="0"
              placeholder="Optional: e.g., 5"
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-700"
            />
          </div>

          {/* Address */}
          <div className="mb-6">
            <Label htmlFor="employeeAddress" className="text-slate-700 mb-2 block">
              Address
            </Label>
            <textarea
              id="employeeAddress"
              placeholder="Optional: Enter address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px] text-slate-700"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Add Employee
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
