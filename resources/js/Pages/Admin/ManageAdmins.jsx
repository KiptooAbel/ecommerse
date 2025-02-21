import { useState } from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';

export default function ManageAdmins({ admins }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.store"), {
            onSuccess: () => reset(), // Reset form after successful submission
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Manage Admins</h2>

                {/* Admin List */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Existing Admins</h3>
                    <ul className="bg-gray-100 p-4 rounded-lg">
                        {admins.length > 0 ? (
                            admins.map((admin) => (
                                <li key={admin.id} className="p-2 border-b">
                                    {admin.name} - {admin.email}
                                </li>
                            ))
                        ) : (
                            <p>No admins found.</p>
                        )}
                    </ul>
                </div>

                {/* Add New Admin Form */}
                <h3 className="text-xl font-semibold mb-2">Add New Admin</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        {processing ? "Adding..." : "Add Admin"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}