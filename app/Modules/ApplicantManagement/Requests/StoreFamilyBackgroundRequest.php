<?php

namespace App\Modules\ApplicantManagement\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFamilyBackgroundRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Authorization handled by policy
    }

    public function rules(): array
    {
        return [
            // Spouse (all nullable)
            'spouse.surname' => 'nullable|string|max:100',
            'spouse.first_name' => 'nullable|string|max:100',
            'spouse.middle_name' => 'nullable|string|max:100',
            'spouse.extension_name' => 'nullable|string|max:20',
            'spouse.occupation' => 'nullable|string|max:200',
            'spouse.employer_business_name' => 'nullable|string|max:200',
            'spouse.business_address' => 'nullable|string|max:255',
            'spouse.telephone_number' => 'nullable|string|max:20',

            // Father (required)
            'father.surname' => 'required|string|max:100',
            'father.first_name' => 'required|string|max:100',
            'father.middle_name' => 'nullable|string|max:100',
            'father.extension_name' => 'nullable|string|max:20',

            // Mother (required)
            'mother.surname' => 'required|string|max:100',
            'mother.first_name' => 'required|string|max:100',
            'mother.middle_name' => 'nullable|string|max:100',
            'mother.extension_name' => 'nullable|string|max:20',
        ];
    }
}
