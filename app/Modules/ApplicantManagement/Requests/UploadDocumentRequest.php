<?php

namespace App\Modules\ApplicantManagement\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class UploadDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'document_type' => 'required|string|max:50',
            'file' => [
                'required',
                File::types(['pdf', 'jpg', 'jpeg', 'png', 'gif', 'doc', 'docx'])
                    ->max(5 * 1024), // 5 MB
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'file.max' => 'The file must not exceed 5 MB.',
            'file.types' => 'Only PDF, JPG, PNG, GIF, DOC, and DOCX files are allowed.',
        ];
    }
}
