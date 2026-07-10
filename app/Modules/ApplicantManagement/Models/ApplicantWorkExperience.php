<?php

namespace App\Modules\ApplicantManagement\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApplicantWorkExperience extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'applicant_id',
        'company',
        'position',
        'date_from',
        'date_to',
        'salary',
        'appointment_status',
        'government_service',
        'is_skipped'
    ];

    protected $casts = [
        'date_from' => 'date',
        'date_to' => 'date',
        'salary' => 'decimal:2',
        'government_service' => 'boolean',
    ];

    public function applicant(): BelongsTo
    {
        return $this->belongsTo(Applicant::class);
    }
}
