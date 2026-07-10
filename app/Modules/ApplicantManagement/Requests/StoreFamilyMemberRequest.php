<?php

namespace App\Modules\ApplicantManagement\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreFamilyMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'relationship' => ['required', Rule::in(['Father', 'Mother', 'Spouse', 'Child', 'Sibling'])],
            'full_name' => 'required|string|max:200',
            'birth_date' => 'nullable|date',
            'occupation' => 'nullable|string|max:200',
            'contact_no' => 'nullable|string|max:15',
            'address' => 'nullable|string|max:255',
        ];
    }
}
