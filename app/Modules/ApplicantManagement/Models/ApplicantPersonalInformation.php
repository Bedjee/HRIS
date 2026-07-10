<?php

namespace App\Modules\ApplicantManagement\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApplicantPersonalInformation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'applicant_id',
        'surname',
        'first_name',
        'middle_name',
        'extension_name',
        'birth_date',
        'birth_place',
        'sex',
        'civil_status',
        'citizenship',
        'dual_citizenship_type',
        'dual_country',
        'height',
        'weight',
        'blood_type',
        'philhealth_no',
        'philsys_no',
        'pagibig_no',
        'tin_no',
        'agency_employee_no',
        'telephone',
        'mobile',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'height' => 'decimal:2',
        'weight' => 'decimal:2',
    ];

    public function applicant(): BelongsTo
    {
        return $this->belongsTo(Applicant::class);
    }
}
