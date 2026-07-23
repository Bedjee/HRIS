<?php

namespace App\Modules\ApplicantManagement\Services;

use App\Modules\ApplicantManagement\Models\Applicant;
use App\Modules\ApplicantManagement\Models\ApplicantPersonalInformation;
use App\Modules\ApplicantManagement\Models\ApplicantAddress;
use App\Modules\ApplicantManagement\Models\ApplicantFamilyMember;
use App\Modules\ApplicantManagement\Models\ApplicantEducation;
use App\Modules\ApplicantManagement\Models\ApplicantEligibility;
use App\Modules\ApplicantManagement\Models\ApplicantWorkExperience;
use App\Modules\ApplicantManagement\Models\ApplicantVoluntaryWork;
use App\Modules\ApplicantManagement\Models\ApplicantTraining;
use App\Modules\ApplicantManagement\Models\ApplicantSkill;
use App\Modules\ApplicantManagement\Models\ApplicantRecognition;
use App\Modules\ApplicantManagement\Models\ApplicantMembership;
use App\Modules\ApplicantManagement\Models\ApplicantQuestionnaire;
use App\Modules\ApplicantManagement\Models\ApplicantReference;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ApplicantService
{
    public function invite(Applicant $applicant, User $inviter): void
    {
        $applicant->update([
            'status' => 'invited',
            'invited_at' => now(),
            'invited_by' => $inviter->id,
        ]);
    }

    public function updatePersonalInfo(Applicant $applicant, array $data): ApplicantPersonalInformation
{
    $this->ensureEditable($applicant);

    // ✅ Transform empty strings to "N/A" for nullable text fields
    $data = $this->preparePersonalInfoData($data);

    return $applicant->personalInformation()->updateOrCreate(
        ['applicant_id' => $applicant->id],
        $data
    );
}


    public function addAddress(Applicant $applicant, array $data): ApplicantAddress
    {
        $this->ensureEditable($applicant);
        return $applicant->addresses()->create($data);
    }

    public function addFamilyMember(Applicant $applicant, array $data): ApplicantFamilyMember
    {
        $this->ensureEditable($applicant);
        return $applicant->familyMembers()->create($data);
    }

    public function addEducation(Applicant $applicant, array $data): ApplicantEducation
    {
        $this->ensureEditable($applicant);
        return $applicant->educations()->create($data);
    }

    public function addEligibility(Applicant $applicant, array $data): ApplicantEligibility
{
    $this->ensureEditable($applicant);

    // Convert empty strings to NULL for nullable fields
    $nullableFields = ['rating', 'exam_date', 'exam_place', 'license_number', 'valid_until'];
    foreach ($nullableFields as $field) {
        if (array_key_exists($field, $data) && $data[$field] === '') {
            $data[$field] = null;
        }
    }

    return $applicant->eligibilities()->create($data);
}



    public function addWorkExperience(Applicant $applicant, array $data): ApplicantWorkExperience
    {
        $this->ensureEditable($applicant);
        return $applicant->workExperiences()->create($data);
    }

    public function addVoluntaryWork(Applicant $applicant, array $data): ApplicantVoluntaryWork
    {
        $this->ensureEditable($applicant);
        return $applicant->voluntaryWorks()->create($data);
    }

    public function addTraining(Applicant $applicant, array $data): ApplicantTraining
    {
        $this->ensureEditable($applicant);
        return $applicant->trainings()->create($data);
    }

    public function addSkill(Applicant $applicant, array $data): ApplicantSkill
    {
        $this->ensureEditable($applicant);
        return $applicant->skills()->create($data);
    }

    public function addRecognition(Applicant $applicant, array $data): ApplicantRecognition
    {
        $this->ensureEditable($applicant);
        return $applicant->recognitions()->create($data);
    }

    public function addMembership(Applicant $applicant, array $data): ApplicantMembership
    {
        $this->ensureEditable($applicant);
        return $applicant->memberships()->create($data);
    }

public function updateQuestionnaire(Applicant $applicant, array $data): ApplicantQuestionnaire
{
    \Log::info('updateQuestionnaire called with data:', $data);

    $this->ensureEditable($applicant);
    \Log::info('ensureEditable passed');

    $result = $applicant->questionnaire()->updateOrCreate(
        ['applicant_id' => $applicant->id],
        $data
    );

    \Log::info('updateOrCreate result:', $result->toArray());

    return $result;
}

   public function addReference(Applicant $applicant, array $data): ApplicantReference
{
    $this->ensureEditable($applicant);

    // Count existing references (excluding skipped ones)
    $existingCount = $applicant->references()->where('is_skipped', false)->count();
    if ($existingCount >= 3) {
        throw ValidationException::withMessages([
            'reference' => 'You have already added the maximum of 3 references.'
        ]);
    }

    return $applicant->references()->create($data);
}




    public function submitPds(Applicant $applicant): void
{
    // ✅ Add 'references' to the required sections array
    $requiredSections = [
        'personalInformation',
        'addresses',
        'father',
        'mother',
        'educations',
        'questionnaire',
        'references',   // 👈 now required
    ];

    $missing = [];
    foreach ($requiredSections as $section) {
        if ($section === 'references') {
            // Check exactly 3 references (excluding skipped ones, if any)
            $count = $applicant->references()->where('is_skipped', false)->count();
            if ($count !== 3) {
                $missing[] = 'Exactly 3 references are required.';
            }
        } elseif ($section === 'addresses') {
            if ($applicant->addresses()->count() < 2) {
                $missing[] = 'Both Residential and Permanent addresses are required.';
            }
        } elseif ($section === 'father' || $section === 'mother') {
            if ($applicant->$section === null) {
                $missing[] = ucfirst($section) . ' information is required.';
            }
        } else {
            // For other sections that are relationships (e.g., educations, questionnaire)
            if ($applicant->{$section}()->count() === 0) {
                $missing[] = ucfirst(str_replace('_', ' ', $section)) . ' is required.';
            }
        }
    }

    if (!empty($missing)) {
        throw ValidationException::withMessages(['missing' => $missing]);
    }

    $applicant->update([
        'status' => 'pds_submitted',
        'submitted_at' => now(),
    ]);
}





    public function verify(Applicant $applicant): void
    {
        $applicant->update(['status' => 'verified']);
    }

    public function reject(Applicant $applicant): void
    {
        $applicant->update(['status' => 'rejected']);
    }

    private function ensureEditable(Applicant $applicant): void
    {
        if (!in_array($applicant->status, ['invited', 'pds_in_progress'])) {
            throw ValidationException::withMessages([
                'status' => 'The applicant PDS is not editable at this stage.',
            ]);
        }
        // If status is 'invited', we can set it to 'pds_in_progress' on first save
        if ($applicant->status === 'invited') {
            $applicant->update(['status' => 'pds_in_progress']);
        }
    }


    /**
 * Prepare personal information data: replace empty strings with "N/A"
 * for nullable text fields (excluding dates, numbers, and required fields).
 */
private function preparePersonalInfoData(array $data): array
{
    // List of fields that are nullable strings and should get "N/A" when empty
    $nullableStringFields = [
        'middle_name',
        'extension_name',
        'dual_citizenship_type',
        'dual_country',
        'blood_type',
        'philhealth_no',
        'philsys_no',
        'pagibig_no',
        'tin_no',
        'agency_employee_no',
        'telephone',
        'mobile',
    ];

    foreach ($nullableStringFields as $field) {
        if (array_key_exists($field, $data) && $data[$field] === '') {
            $data[$field] = 'N/A';
        }
    }

    return $data;
}


}
