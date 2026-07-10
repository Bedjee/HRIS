<?php

namespace App\Modules\ApplicantManagement\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Modules\ApplicantManagement\Models\Applicant;
use App\Modules\ApplicantManagement\Policies\ApplicantPolicy;

class ApplicantManagementServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Register policies for models in this module
        Gate::policy(Applicant::class, ApplicantPolicy::class);
    }

    public function register(): void
    {
        // Optionally register module-specific bindings or config
    }
}
