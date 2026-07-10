<?php

namespace App\Modules\ApplicantManagement\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApplicantEligibility extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'applicant_id',
        'eligibility_name',
        'rating',
        'exam_date',
        'exam_place',
        'license_number',
        'valid_until',
        'is_skipped'
    ];

    protected $casts = [
        'rating' => 'decimal:2',
        'exam_date' => 'date',
        'valid_until' => 'date',
    ];

    public function applicant(): BelongsTo
    {
        return $this->belongsTo(Applicant::class);
    }
}
