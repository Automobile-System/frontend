import CustomerLayout from '@/components/layout/customer/CustomerLayout';
import BookingClient from './BookingClient';
import { cookies } from 'next/headers';
import { Vehicle, Service, Employee } from '@/types/booking';

// Force dynamic rendering since we use cookies
export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';

// Server-side data fetching functions
async function getVehicles(): Promise<Vehicle[]> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken');

        if (!accessToken) {
            console.error('No access token found');
            return [];
        }

        const response = await fetch(`${BASE_URL}/api/customer/vehicles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `accessToken=${accessToken.value}`,
            },
            credentials: 'include',
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error('Failed to fetch vehicles:', response.status);
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        return [];
    }
}

async function getServices(): Promise<Service[]> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken');

        if (!accessToken) {
            console.error('No access token found');
            return [];
        }

        const response = await fetch(`${BASE_URL}/api/services`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `accessToken=${accessToken.value}`,
            },
            credentials: 'include',
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error('Failed to fetch services:', response.status);
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

async function getEmployees(): Promise<Employee[]> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken');

        if (!accessToken) {
            console.error('No access token found');
            return [];
        }

        const response = await fetch(`${BASE_URL}/api/customer/all-employees`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `accessToken=${accessToken.value}`,
            },
            credentials: 'include',
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error('Failed to fetch employees:', response.status);
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching employees:', error);
        return [];
    }
}

export default async function BookService() {
    // Fetch all data on the server
    const [vehicles, services, employees] = await Promise.all([
        getVehicles(),
        getServices(),
        getEmployees(),
    ]);

    return (
        <CustomerLayout>
            <BookingClient 
                vehicles={vehicles}
                services={services}
                employees={employees}
            />
        </CustomerLayout>
    );
}