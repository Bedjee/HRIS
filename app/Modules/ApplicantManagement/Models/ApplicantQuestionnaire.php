<?php

namespace App\Modules\ApplicantManagement\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApplicantQuestionnaire extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'applicant_id',
        // Existing fields (keep them if still used)
        'criminal_case',
        'administrative_case',
        'candidate',
        'resigned_before_election',
        'indigenous',
        'pwd',
        'solo_parent',
        'immigrant',
        'remarks',
        // Q34 - Relationship
        'q34_a',
        'q34_a_third_degree',
        'q34_a_fourth_degree',
        'q34_a_details',
        'q34_b',
        // Q35 - Administrative/Criminal
        'q35_a',
        'q35_a_details',
        'q35_b',
        'q35_b_details',
        'q35_date_filed',
        'q35_case_status',
        // Q36 - Conviction
        'q36',
        'q36_details',
        // Q37 - Separation
        'q37',
        'q37_details',
        // Q38 - Candidacy
        'q38_a',
        'q38_a_details',
        'q38_b',
        'q38_b_details',
        // Q39 - Immigrant
        'q39',
        'q39_country',
        // Q40 - Indigenous/PWD/Solo Parent
        'q40_a',
        'q40_a_specify',
        'q40_b',
        'q40_b_id',
        'q40_c',
        'q40_c_id',
    ];

    protected $casts = [
        // Existing booleans
        'criminal_case' => 'boolean',
        'administrative_case' => 'boolean',
        'candidate' => 'boolean',
        'resigned_before_election' => 'boolean',
        'indigenous' => 'boolean',
        'pwd' => 'boolean',
        'solo_parent' => 'boolean',
        'immigrant' => 'boolean',
        // New booleans
        'q34_a' => 'boolean',
        'q34_a_third_degree' => 'boolean',
        'q34_a_fourth_degree' => 'boolean',
        'q34_b' => 'boolean',
        'q35_a' => 'boolean',
        'q35_b' => 'boolean',
        'q36' => 'boolean',
        'q37' => 'boolean',
        'q38_a' => 'boolean',
        'q38_b' => 'boolean',
        'q39' => 'boolean',
        'q40_a' => 'boolean',
        'q40_b' => 'boolean',
        'q40_c' => 'boolean',
        // Dates
        'q35_date_filed' => 'date',
    ];

    public function applicant(): BelongsTo
    {
        return $this->belongsTo(Applicant::class);
    }
}
