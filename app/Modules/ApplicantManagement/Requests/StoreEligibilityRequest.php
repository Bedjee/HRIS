<?php

namespace App\Modules\ApplicantManagement\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEligibilityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'eligibility_name' => 'required|string|max:200',
            'rating' => 'nullable|numeric|between:0,100',
            'exam_date' => 'nullable|date',
            'exam_place' => 'nullable|string|max:200',
            'license_number' => 'nullable|string|max:50',
            'valid_until' => 'nullable|date',
        ];
    }
}
