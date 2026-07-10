<?php

namespace App\Modules\ApplicantManagement\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePersonalInformationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Authorization handled by policy
    }

    public function rules(): array
    {
        return [
            'surname' => 'required|string|max:100',
            'first_name' => 'required|string|max:100',
            'middle_name' => 'nullable|string|max:100',
            'extension_name' => 'nullable|string|max:20',
            'birth_date' => 'required|date',
            'birth_place' => 'required|string|max:200',
            'sex' => ['required', Rule::in(['Male', 'Female'])],
            'civil_status' => ['required', Rule::in(['Single', 'Married', 'Widowed', 'Separated', 'Divorced'])],
            'citizenship' => 'required|string|max:50',
            'dual_citizenship_type' => 'nullable|string|max:50',
            'dual_country' => 'nullable|string|max:100',
            'height' => 'nullable|numeric|between:0,300',
            'weight' => 'nullable|numeric|between:0,500',
            'blood_type' => ['nullable', Rule::in(['A', 'B', 'AB', 'O'])],
            'philhealth_no' => 'nullable|string|max:20',
            'philsys_no' => 'nullable|string|max:20',
            'pagibig_no' => 'nullable|string|max:20',
            'tin_no' => 'nullable|string|max:20',
            'agency_employee_no' => 'nullable|string|max:30',
            'telephone' => 'nullable|string|max:20',
            'mobile' => 'nullable|string|max:15',
        ];
    }
}
