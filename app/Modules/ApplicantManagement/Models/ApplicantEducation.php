<?php

namespace App\Modules\ApplicantManagement\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApplicantEducation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'applicant_id',
        'level',
        'school_name',
        'degree',
        'from_year',
        'to_year',
        'units',
        'year_graduated',
        'honors',
        'is_skipped'
    ];

    protected $casts = [
        'from_year' => 'integer',
        'to_year' => 'integer',
        'year_graduated' => 'integer',
    ];

    public function applicant(): BelongsTo
    {
        return $this->belongsTo(Applicant::class);
    }
}
