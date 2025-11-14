'use client';

import { useState } from 'react';
import { Vehicle, Service, Employee } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Car, Wrench, User, Clock, CheckCircle2, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface BookingClientProps {
    vehicles: Vehicle[];
    services: Service[];
    employees: Employee[];
}

export default function BookingClient({ vehicles, services, employees }: BookingClientProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        vehicleId: '',
        serviceTypeId: '',
        employeeId: '',
        date: '',
        time: '',
        notes: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.vehicleId || !formData.serviceTypeId || !formData.date || !formData.time) {
            toast.error('Please fill all required fields');
            return;
        }

        setIsSubmitting(true);
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/bookings`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    vehicleId: formData.vehicleId,
                    serviceTypeId: parseInt(formData.serviceTypeId),
                    employeeId: formData.employeeId || null,
                    date: formData.date,
                    time: formData.time,
                    notes: formData.notes
                })
            });

            if (response.ok) {
                toast.success('Booking created successfully!');
                router.push('/customer/services');
            } else {
                toast.error('Failed to create booking');
            }
        } catch (error) {
            console.error('Booking error:', error);
            toast.error('An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto w-full">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#020079] mb-2">
                    Book Service / Project
                </h1>
                <p className="text-gray-600 text-base">
                    Schedule your vehicle service appointment
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Vehicle Selection */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#03009B] flex items-center justify-center text-white">
                                <Car className="w-4 h-4" />
                            </div>
                            Select Vehicle
                        </CardTitle>
                        <CardDescription>Choose the vehicle for service</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="vehicle">Vehicle *</Label>
                            <Select
                                value={formData.vehicleId}
                                onValueChange={(value) => setFormData({ ...formData, vehicleId: value })}
                            >
                                <SelectTrigger id="vehicle">
                                    <SelectValue placeholder="Select your vehicle" />
                                </SelectTrigger>
                                <SelectContent>
                                    {vehicles.map((vehicle) => (
                                        <SelectItem key={vehicle.vehicleId} value={vehicle.vehicleId.toString()}>
                                            {vehicle.brandName} {vehicle.model} - {vehicle.registrationNo}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Service Selection */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#03009B] flex items-center justify-center text-white">
                                <Wrench className="w-4 h-4" />
                            </div>
                            Select Service
                        </CardTitle>
                        <CardDescription>Choose the type of service needed</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="service">Service Type *</Label>
                            <Select
                                value={formData.serviceTypeId}
                                onValueChange={(value) => setFormData({ ...formData, serviceTypeId: value })}
                            >
                                <SelectTrigger id="service">
                                    <SelectValue placeholder="Select service type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {services.map((service) => (
                                        <SelectItem key={service.serviceId} value={service.serviceId.toString()}>
                                            {service.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Employee Selection (Optional) */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
                                <User className="w-4 h-4" />
                            </div>
                            Preferred Employee
                        </CardTitle>
                        <CardDescription>Optional - Choose a preferred service employee</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="employee">Employee (Optional)</Label>
                            <Select
                                value={formData.employeeId}
                                onValueChange={(value) => setFormData({ ...formData, employeeId: value })}
                            >
                                <SelectTrigger id="employee">
                                    <SelectValue placeholder="No preference" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">No preference</SelectItem>
                                    {employees.map((employee) => (
                                        <SelectItem key={employee.id} value={employee.id.toString()}>
                                            {employee.fullName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Date & Time Selection */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#03009B] flex items-center justify-center text-white">
                                <Clock className="w-4 h-4" />
                            </div>
                            Schedule Appointment
                        </CardTitle>
                        <CardDescription>Select date and time for your service</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date *</Label>
                                <Input
                                    type="date"
                                    id="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Time *</Label>
                                <Select
                                    value={formData.time}
                                    onValueChange={(value) => setFormData({ ...formData, time: value })}
                                >
                                    <SelectTrigger id="time">
                                        <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                                            <SelectItem key={time} value={time}>
                                                {time}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="notes">Additional Notes</Label>
                            <Textarea
                                id="notes"
                                placeholder="Any special requirements or notes for the service..."
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                rows={4}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#03009B] hover:bg-[#020079] min-w-[200px]"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                                Creating Booking...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Confirm Booking
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
