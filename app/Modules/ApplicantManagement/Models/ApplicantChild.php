<?php

namespace App\Modules\ApplicantManagement\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApplicantChild extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'applicant_id',
        'full_name',
        'birth_date',
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];

    public function applicant(): BelongsTo
    {
        return $this->belongsTo(Applicant::class);
    }
}
