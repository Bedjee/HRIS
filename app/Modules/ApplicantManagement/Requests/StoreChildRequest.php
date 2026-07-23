<?php

namespace App\Modules\ApplicantManagement\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreChildRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Authorization handled by policy
    }

    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:200',
            'birth_date' => 'nullable|date',
        ];
    }
}
