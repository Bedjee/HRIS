<?php

namespace App\Modules\ApplicantManagement\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuestionnaireRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Existing fields (keep them)
            'criminal_case' => 'boolean',
            'administrative_case' => 'boolean',
            'candidate' => 'boolean',
            'resigned_before_election' => 'boolean',
            'indigenous' => 'boolean',
            'pwd' => 'boolean',
            'solo_parent' => 'boolean',
            'immigrant' => 'boolean',
            'remarks' => 'nullable|string',

            // Q34 - Relationship
            'q34_a' => 'boolean',
            'q34_a_third_degree' => 'boolean',
            'q34_a_fourth_degree' => 'boolean',
            'q34_a_details' => 'nullable|string',
            'q34_b' => 'boolean',

            // Q35 - Administrative/Criminal
            'q35_a' => 'boolean',
            'q35_a_details' => 'nullable|string',
            'q35_b' => 'boolean',
            'q35_b_details' => 'nullable|string',
            'q35_date_filed' => 'nullable|date',
            'q35_case_status' => 'nullable|string|max:100',

            // Q36 - Conviction
            'q36' => 'boolean',
            'q36_details' => 'nullable|string',

            // Q37 - Separation
            'q37' => 'boolean',
            'q37_details' => 'nullable|string',

            // Q38 - Candidacy
            'q38_a' => 'boolean',
            'q38_a_details' => 'nullable|string',
            'q38_b' => 'boolean',
            'q38_b_details' => 'nullable|string',

            // Q39 - Immigrant
            'q39' => 'boolean',
            'q39_country' => 'nullable|string|max:100',

            // Q40 - Indigenous/PWD/Solo Parent
            'q40_a' => 'boolean',
            'q40_a_specify' => 'nullable|string|max:200',
            'q40_b' => 'boolean',
            'q40_b_id' => 'nullable|string|max:100',
            'q40_c' => 'boolean',
            'q40_c_id' => 'nullable|string|max:100',
        ];
    }
}
