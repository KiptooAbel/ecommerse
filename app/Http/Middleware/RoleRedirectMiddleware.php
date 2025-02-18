<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleRedirectMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return redirect('/login'); // Redirect to login if not authenticated
        }

        $user = Auth::user();

        // Prevent redirect loop by checking if the user is already on the correct dashboard
        if ($user->hasRole('admin') && !$request->is('admin/dashboard')) {
            return redirect('/admin/dashboard');
        }

        if ($user->hasRole('customer') && !$request->is('customer/dashboard')) {
            return redirect('/customer/dashboard');
        }

        return $next($request);
    }
}
