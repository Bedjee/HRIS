<?php

namespace App\Modules\Authorization\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Modules\Authorization\Models\Permission;

class AuthorizationServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Register all permissions as Gates
        try {
            Permission::all()->each(function ($permission) {
                Gate::define($permission->slug, function ($user) use ($permission) {
                    return $user->hasPermission($permission->slug);
                });
            });
        } catch (\Exception $e) {
            // Handle case when permissions table doesn't exist yet (e.g., during migration)
            // Optionally log a warning
        }
    }
}
