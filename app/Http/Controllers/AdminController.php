<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class AdminController extends Controller
{
    /**
     * Display all admins and the form to add a new admin.
     */
    public function index(): Response
    {
        $admins = User::role('admin')->get(); // Fetch all users with the 'admin' role
        return Inertia::render('Admin/ManageAdmins', ['admins' => $admins]);
    }

    /**
     * Store a new admin with default password as their email.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users',
        ]);

        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->email), // Default password is the email
        ]);

        // Assign the "admin" role
        $admin->assignRole('admin');

        return redirect()->route('admin.manage')->with('success', 'Admin added successfully! Default password is their email.');
    }
}
