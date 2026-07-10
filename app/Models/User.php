<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
 use App\Modules\ApplicantManagement\Models\Applicant;
 use App\Modules\Authorization\Models\Role;
use App\Modules\Authorization\Models\Permission;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            
        ];
    }

public function applicant()
{
    return $this->hasOne(Applicant::class);
}

// Inside the User class:

public function roles(): BelongsToMany
{
    return $this->belongsToMany(Role::class, 'role_user')
                ->withTimestamps();
}

public function hasRole(string $roleSlug): bool
{
    return $this->roles()->where('slug', $roleSlug)->exists();
}

public function hasPermission(string $permissionSlug): bool
{
    // Super Admin has all permissions
    if ($this->hasRole('super-admin')) {
        return true;
    }

    // Check if any of the user's roles have the permission
    foreach ($this->roles as $role) {
        if ($role->hasPermission($permissionSlug)) {
            return true;
        }
    }

    return false;
}

public function isSuperAdmin(): bool
{
    return $this->hasRole('super-admin');
}



}
