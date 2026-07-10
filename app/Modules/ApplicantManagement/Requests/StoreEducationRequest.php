<?php

namespace App\Modules\ApplicantManagement\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEducationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'level' => 'required|string|max:50',
            'school_name' => 'required|string|max:200',
            'degree' => 'nullable|string|max:200',
            'from_year' => 'required|integer|digits:4|min:1900|max:' . (date('Y') + 1),
            'to_year' => 'required|integer|digits:4|min:1900|max:' . (date('Y') + 1),
            'units' => 'nullable|string|max:20',
            'year_graduated' => 'nullable|integer|digits:4|min:1900|max:' . (date('Y') + 1),
            'honors' => 'nullable|string|max:100',
        ];
    }
}
