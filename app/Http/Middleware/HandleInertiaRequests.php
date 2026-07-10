<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();
        $userData = null;

        if ($user) {
            $userData = array_merge(
                $user->toArray(),
                ['roles' => $user->roles->pluck('slug')->toArray()]
            );
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $userData,
            ],
            // ✅ Add this to pass flash messages
            'flash' => [
                'success' => session('success'),
                'error'   => session('error'),
                'warning' => session('warning'),
            ],
        ]);
    }
}
