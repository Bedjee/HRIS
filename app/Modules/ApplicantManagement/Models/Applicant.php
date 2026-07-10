<?php

namespace App\Modules\ApplicantManagement\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;

class Applicant extends Model
{
    use HasFactory, SoftDeletes;

   protected $fillable = [
    'user_id',
    'application_no',
    'status',
    'employee_id',
    'invited_at',      // ✅ Add this
    'invited_by',      // ✅ Add this
    'submitted_at',    // ✅ Already there
];



    protected $casts = [
    'user_id' => 'integer',
    'employee_id' => 'integer',
    'invited_at' => 'datetime',
    'submitted_at' => 'datetime',
    'created_at' => 'datetime',
    'updated_at' => 'datetime',
    'deleted_at' => 'datetime',
];


    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function personalInformation(): HasOne
    {
        return $this->hasOne(ApplicantPersonalInformation::class);
    }

    public function addresses(): HasMany
    {
        return $this->hasMany(ApplicantAddress::class);
    }

    public function familyMembers(): HasMany
    {
        return $this->hasMany(ApplicantFamilyMember::class);
    }

    public function educations(): HasMany
    {
        return $this->hasMany(ApplicantEducation::class);
    }

    public function eligibilities(): HasMany
    {
        return $this->hasMany(ApplicantEligibility::class);
    }

    public function workExperiences(): HasMany
    {
        return $this->hasMany(ApplicantWorkExperience::class);
    }

    public function voluntaryWorks(): HasMany
    {
        return $this->hasMany(ApplicantVoluntaryWork::class);
    }

    public function trainings(): HasMany
    {
        return $this->hasMany(ApplicantTraining::class);
    }

    public function skills(): HasMany
    {
        return $this->hasMany(ApplicantSkill::class);
    }

    public function recognitions(): HasMany
    {
        return $this->hasMany(ApplicantRecognition::class);
    }

    public function memberships(): HasMany
    {
        return $this->hasMany(ApplicantMembership::class);
    }

    public function questionnaire(): HasOne
    {
        return $this->hasOne(ApplicantQuestionnaire::class);
    }

    public function references(): HasMany
    {
        return $this->hasMany(ApplicantReference::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(ApplicantDocument::class);
    }

    // Add these methods inside the Applicant class

/**
 * Calculate the percentage of PDS completion.
 */
public function getCompletionPercentageAttribute(): int
{
    $filled = 0;
    $total = 0;

    // Personal Information
    $total++;
    if ($this->personalInformation) $filled++;

    // Addresses (need both Residential and Permanent)
    $total++;
    $addresses = $this->addresses;
    if ($addresses->contains('type', 'Residential') && $addresses->contains('type', 'Permanent')) $filled++;

    // Family Members (at least 1)
    $total++;
    if ($this->familyMembers->count() > 0) $filled++;

    // Education (at least 1)
    $total++;
    if ($this->educations->count() > 0) $filled++;

    // Eligibility (at least 1)
    $total++;
    if ($this->eligibilities->count() > 0) $filled++;

    // Work Experience (at least 1)
    $total++;
    if ($this->workExperiences->count() > 0) $filled++;

    // Voluntary Work (at least 1)
    $total++;
    if ($this->voluntaryWorks->count() > 0) $filled++;

    // Trainings (at least 1)
    $total++;
    if ($this->trainings->count() > 0) $filled++;

    // Skills (at least 1)
    $total++;
    if ($this->skills->count() > 0) $filled++;

    // Recognitions (at least 1)
    $total++;
    if ($this->recognitions->count() > 0) $filled++;

    // Memberships (at least 1)
    $total++;
    if ($this->memberships->count() > 0) $filled++;

    // Questionnaire
    $total++;
    if ($this->questionnaire) $filled++;

    // References (at least 1)
    $total++;
    if ($this->references->count() > 0) $filled++;

    // Documents (at least 1)
    $total++;
    if ($this->documents->count() > 0) $filled++;

    return $total > 0 ? round(($filled / $total) * 100) : 0;
}

/**
 * Get the number of days since registration.
 */
public function getDaysActiveAttribute(): int
{
    return $this->created_at ? $this->created_at->diffInDays(now()) : 0;
}

/**
 * Get timeline milestones with actual dates.
 */
public function getTimelineAttribute(): array
{
    $statusMap = [
        'registered' => 'created_at',
        'invited'    => 'invited_at',
        'submitted'  => 'submitted_at',
    ];

    $timeline = [];

    foreach ($statusMap as $label => $column) {
        $date = $this->$column;
        $timeline[$label] = [
            'label' => ucfirst($label),
            'date'  => $date ? $date->toDateString() : null,
            'status' => $date ? 'done' : 'pending',
        ];
    }

    // Add "Verified" and "Hired" based on status
    $verified = in_array($this->status, ['verified', 'hired']);
    $hired = $this->status === 'hired';

    $timeline['verified'] = [
        'label' => 'Verified',
        'date'  => $verified ? $this->updated_at?->toDateString() : null,
        'status' => $verified ? 'done' : 'pending',
    ];

    $timeline['hired'] = [
        'label' => 'Hired',
        'date'  => $hired ? $this->updated_at?->toDateString() : null,
        'status' => $hired ? 'done' : 'pending',
    ];

    return $timeline;
}



}
