<?php

namespace App\Modules\ApplicantManagement\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorkExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'company' => 'required|string|max:200',
            'position' => 'required|string|max:200',
            'date_from' => 'required|date',
            'date_to' => 'nullable|date|after_or_equal:date_from',
            'salary' => 'nullable|numeric|min:0',
            'appointment_status' => 'nullable|string|max:50',
            'government_service' => 'boolean',
        ];
    }
}
