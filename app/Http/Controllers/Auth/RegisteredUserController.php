<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Modules\ApplicantManagement\Models\Applicant;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        // ✅ Assign default role (applicant)
        $applicantRole = \App\Modules\Authorization\Models\Role::where('is_default', true)->first();
        if ($applicantRole) {
            $user->roles()->attach($applicantRole);
        }

        // ✅ Create applicant record
        $applicant = Applicant::create([
            'user_id' => $user->id,
            'application_no' => 'APP-' . date('Y') . '-' . str_pad(Applicant::count() + 1, 6, '0', STR_PAD_LEFT),
            'status' => 'registered',
        ]);

        return redirect()->route('applicant.dashboard');
    }
}
