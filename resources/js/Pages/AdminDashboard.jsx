import { Head } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';


export default function AdminDashboard() {
    return (
        <AuthenticatedLayout>
        <div className="flex items-center justify-center min-h-screen bg-blue-100">
            <h1 className="text-4xl font-bold text-blue-800">Admin Dashboard</h1>
        </div>
         </AuthenticatedLayout>
    );
}
