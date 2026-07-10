<?php

namespace App\Modules\ApplicantManagement\Policies;

use App\Models\User;
use App\Modules\ApplicantManagement\Models\Applicant;

class ApplicantPolicy
{
    public function view(User $user, Applicant $applicant): bool
    {
        // User can view if they are the applicant OR have view_applicants permission
        return $user->id === $applicant->user_id || $user->hasPermission('view_applicants');
    }

    public function update(User $user, Applicant $applicant): bool
    {
        // Only the applicant can update their own data, and only if status allows
        if ($user->id !== $applicant->user_id) {
            return false;
        }
        return in_array($applicant->status, ['invited', 'pds_in_progress']);
    }

    public function delete(User $user, Applicant $applicant): bool
    {
        return $user->hasPermission('delete_applicants');
    }

    public function invite(User $user, Applicant $applicant): bool
    {
        // HR/Admin can invite
        return $user->hasPermission('manage_hiring') && $applicant->status === 'registered';
    }

    public function verify(User $user, Applicant $applicant): bool
    {
        return $user->hasPermission('verify_applicants') && $applicant->status === 'pds_submitted';
    }

    public function reject(User $user, Applicant $applicant): bool
    {
        return $user->hasPermission('verify_applicants') && in_array($applicant->status, ['pds_submitted', 'under_review']);
    }

    public function submit(User $user, Applicant $applicant): bool
    {
        if ($user->id !== $applicant->user_id) {
            return false;
        }
        return $applicant->status === 'pds_in_progress';
    }
}
