import { Head } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default function CustomerDashboard() {
    return (        <AuthenticatedLayout>

        <div className="flex items-center justify-center min-h-screen bg-green-100">
            <h1 className="text-4xl font-bold text-green-800">Customer Dashboard</h1>
        </div>         </AuthenticatedLayout>

    );
}
