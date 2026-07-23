<?php

namespace App\Modules\ApplicantManagement\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApplicantFather extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'applicant_id',
        'surname',
        'first_name',
        'middle_name',
        'extension_name',
    ];

    public function applicant(): BelongsTo
    {
        return $this->belongsTo(Applicant::class);
    }
}
