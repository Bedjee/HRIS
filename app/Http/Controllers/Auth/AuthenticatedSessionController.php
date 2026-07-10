<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Modules\Authorization\Models\Role;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function store(LoginRequest $request): RedirectResponse
{
    $request->authenticate();
    $request->session()->regenerate();

    $user = Auth::user();

    if ($user->hasRole('applicant')) {
        return redirect()->route('applicant.dashboard');
    }

    if ($user->hasRole('hr') || $user->hasRole('admin') || $user->hasRole('super-admin')) {
        return redirect()->route('hr.dashboard');
    }

    // Fallback – if no role, assign default applicant role and redirect
    $defaultRole = Role::where('is_default', true)->first();
    if ($defaultRole) {
        $user->roles()->attach($defaultRole);
        return redirect()->route('applicant.dashboard');
    }

    // Ultimate fallback
    return redirect('/');
}



    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
