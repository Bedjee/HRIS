<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Modules\Authorization\Models\Role;
use App\Modules\Authorization\Models\Permission;
use Illuminate\Support\Facades\DB;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Define Permissions (Grouped by module)
        $permissions = [
            // Applicant Management
            ['name' => 'View Applicants', 'slug' => 'view_applicants', 'group' => 'applicant_management'],
            ['name' => 'Create Applicants', 'slug' => 'create_applicants', 'group' => 'applicant_management'],
            ['name' => 'Edit Applicants', 'slug' => 'edit_applicants', 'group' => 'applicant_management'],
            ['name' => 'Delete Applicants', 'slug' => 'delete_applicants', 'group' => 'applicant_management'],
            ['name' => 'Verify Applicants', 'slug' => 'verify_applicants', 'group' => 'applicant_management'],
            ['name' => 'View Documents', 'slug' => 'view_documents', 'group' => 'applicant_management'],
            ['name' => 'Upload Documents', 'slug' => 'upload_documents', 'group' => 'applicant_management'],
            ['name' => 'Verify Documents', 'slug' => 'verify_documents', 'group' => 'applicant_management'],

            // User Management (future)
            ['name' => 'View Users', 'slug' => 'view_users', 'group' => 'user_management'],
            ['name' => 'Create Users', 'slug' => 'create_users', 'group' => 'user_management'],
            ['name' => 'Edit Users', 'slug' => 'edit_users', 'group' => 'user_management'],
            ['name' => 'Delete Users', 'slug' => 'delete_users', 'group' => 'user_management'],
            ['name' => 'Manage Roles', 'slug' => 'manage_roles', 'group' => 'user_management'],

            // HR Specific
            ['name' => 'Manage Hiring', 'slug' => 'manage_hiring', 'group' => 'recruitment'],
            ['name' => 'Approve PDS', 'slug' => 'approve_pds', 'group' => 'recruitment'],
        ];

        foreach ($permissions as $perm) {
            Permission::updateOrCreate(
                ['slug' => $perm['slug']],
                $perm
            );
        }

        // 2. Define Roles and assign permissions
        $roles = [
            'super-admin' => [
                'name' => 'Super Admin',
                'description' => 'Full system access',
                'is_default' => false,
                'permissions' => Permission::pluck('slug')->toArray(), // All permissions
            ],
            'admin' => [
                'name' => 'Admin',
                'description' => 'System administration without super permissions',
                'is_default' => false,
                'permissions' => [
                    'view_users', 'create_users', 'edit_users', 'delete_users', 'manage_roles',
                    'view_applicants', 'verify_applicants', 'view_documents', 'verify_documents',
                    'manage_hiring', 'approve_pds',
                ],
            ],
            'hr' => [
                'name' => 'HR Officer',
                'description' => 'Human Resources staff',
                'is_default' => false,
                'permissions' => [
                    'view_applicants', 'edit_applicants', 'verify_applicants',
                    'view_documents', 'upload_documents', 'verify_documents',
                    'manage_hiring', 'approve_pds',
                ],
            ],
            'department-head' => [
                'name' => 'Department Head',
                'description' => 'Head of department (can review applicants)',
                'is_default' => false,
                'permissions' => [
                    'view_applicants', 'verify_applicants',
                    'view_documents',
                ],
            ],
            'employee' => [
                'name' => 'Employee',
                'description' => 'Regular employee (view own profile)',
                'is_default' => false,
                'permissions' => [
                    'view_applicants', // Limited to own (via policy later)
                ],
            ],
            'applicant' => [
                'name' => 'Applicant',
                'description' => 'Job applicant (can manage own PDS)',
                'is_default' => true, // New registrations get this role
                'permissions' => [
                    'create_applicants', 'edit_applicants',
                    'upload_documents', 'view_documents', // Only their own
                ],
            ],
            'mayor' => [
                'name' => 'Mayor',
                'description' => 'Mayor (view reports)',
                'is_default' => false,
                'permissions' => [
                    'view_applicants', 'view_documents',
                ],
            ],
            'officials' => [
                'name' => 'Officials',
                'description' => 'LGU Officials',
                'is_default' => false,
                'permissions' => [
                    'view_applicants', 'view_documents',
                ],
            ],
        ];

        foreach ($roles as $slug => $data) {
            $role = Role::updateOrCreate(
                ['slug' => $slug],
                [
                    'name' => $data['name'],
                    'description' => $data['description'],
                    'is_default' => $data['is_default'],
                ]
            );

            // Sync permissions
            $permissionIds = Permission::whereIn('slug', $data['permissions'])->pluck('id');
            $role->permissions()->sync($permissionIds);
        }

        // 3. Assign default role to existing users (optional)
        // Find the 'applicant' role and assign to any user without a role
        $defaultRole = Role::where('is_default', true)->first();
        if ($defaultRole) {
            $users = \App\Models\User::doesntHave('roles')->get();
            foreach ($users as $user) {
                $user->roles()->attach($defaultRole);
            }
        }
    }
}
