<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    private $role;

    public function __construct($role = null)
    {
        $this->role = $role;
    }

    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            return redirect('/login');
        }

        if (!Auth::user()->hasAnyRole($roles)) {
            abort(403, 'Unauthorized access');
        }

        return $next($request);
    }
}
