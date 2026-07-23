<?php

namespace App\Modules\ApplicantManagement\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEducationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'level' => ['required', Rule::in(['elementary', 'secondary', 'vocational', 'college', 'graduate_studies'])],
            'school_name' => 'required|string|max:200',
            'degree' => 'nullable|string|max:200',
            'from_year' => 'required|integer|digits:4|min:1900|max:' . (date('Y') + 1),
            'to_year' => 'required|integer|digits:4|min:1900|max:' . (date('Y') + 1),
            // Units: required if year_graduated is not provided
            'units' => 'required_without:year_graduated|nullable|string|max:20',
            'year_graduated' => 'nullable|integer|digits:4|min:1900|max:' . (date('Y') + 1),
            'honors' => 'nullable|string|max:100',
        ];
    }
}
