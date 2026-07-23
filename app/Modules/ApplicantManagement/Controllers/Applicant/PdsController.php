<?php

namespace App\Modules\ApplicantManagement\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Modules\ApplicantManagement\Services\ApplicantService;
use App\Modules\ApplicantManagement\Services\DocumentService;
use App\Modules\ApplicantManagement\Requests\StorePersonalInformationRequest;
use App\Modules\ApplicantManagement\Requests\StoreAddressRequest;


use App\Modules\ApplicantManagement\Requests\StoreFamilyBackgroundRequest;
use App\Modules\ApplicantManagement\Requests\StoreChildRequest;

use App\Modules\ApplicantManagement\Requests\StoreEducationRequest;
use App\Modules\ApplicantManagement\Requests\StoreEligibilityRequest;
use App\Modules\ApplicantManagement\Requests\StoreWorkExperienceRequest;
use App\Modules\ApplicantManagement\Requests\StoreVoluntaryWorkRequest;
use App\Modules\ApplicantManagement\Requests\StoreTrainingRequest;
use App\Modules\ApplicantManagement\Requests\StoreSkillRequest;
use App\Modules\ApplicantManagement\Requests\StoreRecognitionRequest;
use App\Modules\ApplicantManagement\Requests\StoreMembershipRequest;
use App\Modules\ApplicantManagement\Requests\StoreQuestionnaireRequest;
use App\Modules\ApplicantManagement\Requests\StoreReferenceRequest;
use App\Modules\ApplicantManagement\Requests\UploadDocumentRequest;
use App\Modules\ApplicantManagement\Requests\SubmitPdsRequest;
use App\Modules\ApplicantManagement\Models\Applicant;
use App\Modules\ApplicantManagement\Models\ApplicantDocument;
use App\Modules\ApplicantManagement\Models\ApplicantFamilyMember;
use App\Modules\ApplicantManagement\Models\ApplicantEducation;
use App\Modules\ApplicantManagement\Models\ApplicantEligibility;
use App\Modules\ApplicantManagement\Models\ApplicantWorkExperience;
use App\Modules\ApplicantManagement\Models\ApplicantVoluntaryWork;
use App\Modules\ApplicantManagement\Models\ApplicantTraining;
use App\Modules\ApplicantManagement\Models\ApplicantSkill;
use App\Modules\ApplicantManagement\Models\ApplicantRecognition;
use App\Modules\ApplicantManagement\Models\ApplicantMembership;
use App\Modules\ApplicantManagement\Models\ApplicantReference;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use App\Modules\ApplicantManagement\Models\ApplicantChild;

use App\Modules\ApplicantManagement\Services\PDSGeneratorService;
use Inertia\Inertia;

class PdsController extends Controller
{
    public function __construct(
        protected ApplicantService $applicantService,
        protected DocumentService $documentService
    ) {}

    /**
     * Show the PDS stepper page.
     */
   public function index()
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('view', $applicant);

    return Inertia::render('ApplicantManagement/Applicant/Pds/Stepper', [
        'applicant' => $applicant->load([
            'personalInformation',
            'addresses',
            'spouse',      // ✅ new
            'father',      // ✅ new
            'mother',      // ✅ new
            'children',    // ✅ new
            'educations',
            'eligibilities',
            'workExperiences',
            'voluntaryWorks',
            'trainings',
            'skills',
            'recognitions',
            'memberships',
            'questionnaire',
            'references',
            'documents',
        ]),
    ]);
}

    // ================================================
    // STORE METHODS – Single Record Updates
    // ================================================

    public function storePersonalInfo(StorePersonalInformationRequest $request)
{
    \Log::info('storePersonalInfo called');
    $applicant = auth()->user()->applicant;
    \Log::info('Applicant ID: ' . ($applicant ? $applicant->id : 'null'));
    Gate::authorize('update', $applicant);
    \Log::info('Policy passed');
    $validated = $request->validated();
    \Log::info('Validated data: ', $validated);
    $result = $this->applicantService->updatePersonalInfo($applicant, $validated);
    \Log::info('Service executed, result: ' . ($result ? 'success' : 'failed'));
    return redirect()->route('applicant.pds')->with('success', 'Personal information saved.');
}

    public function storeAddress(StoreAddressRequest $request)
    {
        $applicant = auth()->user()->applicant;
        Gate::authorize('update', $applicant);

        $this->applicantService->addAddress($applicant, $request->validated());

        return redirect()->route('applicant.pds')->with('success', 'Address added.');
    }

public function storeFamilyBackground(StoreFamilyBackgroundRequest $request)
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('update', $applicant);




  $validated = $request->validated();

    // Update or create spouse
    $applicant->spouse()->updateOrCreate(
        ['applicant_id' => $applicant->id],
        $validated['spouse'] ?? []
    );

    // Update or create father
    $applicant->father()->updateOrCreate(
        ['applicant_id' => $applicant->id],
        $validated['father']
    );

    // Update or create mother
    $applicant->mother()->updateOrCreate(
        ['applicant_id' => $applicant->id],
        $validated['mother']
    );

    return redirect()->back()->with('success', 'Family background saved.');
}

public function addChild(StoreChildRequest $request)
{
    $validated = $request->validated();
    \Log::info('Child data validated:', $validated);

    $applicant = auth()->user()->applicant;
    Gate::authorize('update', $applicant);

    $child = $applicant->children()->create($validated);
    \Log::info('Child saved:', $child->toArray());

   return redirect()->route('applicant.pds', ['step' => 'family'])
                 ->with('success', 'Child added.');

}


    public function storeEducation(StoreEducationRequest $request)
    {
        $applicant = auth()->user()->applicant;
        Gate::authorize('update', $applicant);

        $this->applicantService->addEducation($applicant, $request->validated());

        return redirect()->route('applicant.pds')->with('success', 'Education record added.');
    }

    public function storeEligibility(StoreEligibilityRequest $request)
    {
        $applicant = auth()->user()->applicant;
        Gate::authorize('update', $applicant);

        $this->applicantService->addEligibility($applicant, $request->validated());

        return redirect()->route('applicant.pds')->with('success', 'Eligibility added.');
    }

    public function storeWorkExperience(StoreWorkExperienceRequest $request)
    {
        $applicant = auth()->user()->applicant;
        Gate::authorize('update', $applicant);

        $this->applicantService->addWorkExperience($applicant, $request->validated());

        return redirect()->route('applicant.pds')->with('success', 'Work experience added.');
    }

    public function storeVoluntaryWork(StoreVoluntaryWorkRequest $request)
    {
        $applicant = auth()->user()->applicant;
        Gate::authorize('update', $applicant);

        $this->applicantService->addVoluntaryWork($applicant, $request->validated());

        return redirect()->route('applicant.pds')->with('success', 'Voluntary work added.');
    }

    public function storeTraining(StoreTrainingRequest $request)
    {
        $applicant = auth()->user()->applicant;
        Gate::authorize('update', $applicant);

        $this->applicantService->addTraining($applicant, $request->validated());

        return redirect()->route('applicant.pds')->with('success', 'Training added.');
    }

    public function storeSkill(StoreSkillRequest $request)
    {
        $applicant = auth()->user()->applicant;
        Gate::authorize('update', $applicant);

        $this->applicantService->addSkill($applicant, $request->validated());

        return redirect()->route('applicant.pds')->with('success', 'Skill added.');
    }

    public function storeRecognition(StoreRecognitionRequest $request)
    {
        $applicant = auth()->user()->applicant;
        Gate::authorize('update', $applicant);

        $this->applicantService->addRecognition($applicant, $request->validated());

        return redirect()->route('applicant.pds')->with('success', 'Recognition added.');
    }

    public function storeMembership(StoreMembershipRequest $request)
    {
        $applicant = auth()->user()->applicant;
        Gate::authorize('update', $applicant);

        $this->applicantService->addMembership($applicant, $request->validated());

        return redirect()->route('applicant.pds')->with('success', 'Membership added.');
    }

  public function storeQuestionnaire(StoreQuestionnaireRequest $request)
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('update', $applicant);

    $validated = $request->validated();
    \Log::info('Questionnaire data before save:', $validated);

    // ✅ Direct save (bypass service)
    $record = $applicant->questionnaire()->updateOrCreate(
        ['applicant_id' => $applicant->id],
        $validated
    );
    \Log::info('Saved record:', $record->toArray());

    return redirect()->route('applicant.pds')->with('success', 'Questionnaire saved.');
}






    public function storeReference(StoreReferenceRequest $request)
    {
        $applicant = auth()->user()->applicant;
        Gate::authorize('update', $applicant);

        $this->applicantService->addReference($applicant, $request->validated());

        return redirect()->route('applicant.pds')->with('success', 'Reference added.');
    }

    // ================================================
    // DESTROY METHODS – Remove Individual Records
    // ================================================



    public function destroyEducation($id)
    {
        $record = ApplicantEducation::findOrFail($id);
        $applicant = $record->applicant;
        Gate::authorize('update', $applicant);

        $record->delete();
        return redirect()->route('applicant.pds')->with('success', 'Education record removed.');
    }


    public function destroyChild($id)
{
    $child = ApplicantChild::findOrFail($id);
    $applicant = $child->applicant;
    Gate::authorize('update', $applicant);
    $child->delete();
    return redirect()->back()->with('success', 'Child removed.');
}

    public function destroyEligibility($id)
    {
        $record = ApplicantEligibility::findOrFail($id);
        $applicant = $record->applicant;
        Gate::authorize('update', $applicant);

        $record->delete();
        return redirect()->route('applicant.pds')->with('success', 'Eligibility removed.');
    }

    public function destroyWorkExperience($id)
    {
        $record = ApplicantWorkExperience::findOrFail($id);
        $applicant = $record->applicant;
        Gate::authorize('update', $applicant);

        $record->delete();
        return redirect()->route('applicant.pds')->with('success', 'Work experience removed.');
    }

    public function destroyVoluntaryWork($id)
    {
        $record = ApplicantVoluntaryWork::findOrFail($id);
        $applicant = $record->applicant;
        Gate::authorize('update', $applicant);

        $record->delete();
        return redirect()->route('applicant.pds')->with('success', 'Voluntary work removed.');
    }

    public function destroyTraining($id)
    {
        $record = ApplicantTraining::findOrFail($id);
        $applicant = $record->applicant;
        Gate::authorize('update', $applicant);

        $record->delete();
        return redirect()->route('applicant.pds')->with('success', 'Training removed.');
    }

    public function destroySkill($id)
    {
        $record = ApplicantSkill::findOrFail($id);
        $applicant = $record->applicant;
        Gate::authorize('update', $applicant);

        $record->delete();
        return redirect()->route('applicant.pds')->with('success', 'Skill removed.');
    }

    public function destroyRecognition($id)
    {
        $record = ApplicantRecognition::findOrFail($id);
        $applicant = $record->applicant;
        Gate::authorize('update', $applicant);

        $record->delete();
        return redirect()->route('applicant.pds')->with('success', 'Recognition removed.');
    }

    public function destroyMembership($id)
    {
        $record = ApplicantMembership::findOrFail($id);
        $applicant = $record->applicant;
        Gate::authorize('update', $applicant);

        $record->delete();
        return redirect()->route('applicant.pds')->with('success', 'Membership removed.');
    }

    public function destroyReference($id)
    {
        $record = ApplicantReference::findOrFail($id);
        $applicant = $record->applicant;
        Gate::authorize('update', $applicant);

        $record->delete();
        return redirect()->route('applicant.pds')->with('success', 'Reference removed.');
    }

    public function destroyDocument($id)
    {
        $document = ApplicantDocument::with('applicant')->findOrFail($id);
        $applicant = $document->applicant;
        Gate::authorize('update', $applicant);

        $this->documentService->delete($document);

        return redirect()->route('applicant.pds')->with('success', 'Document removed.');
    }

    // ================================================
    // DOCUMENT UPLOAD
    // ================================================

    public function uploadDocument(UploadDocumentRequest $request)
    {
        $applicant = auth()->user()->applicant;
        Gate::authorize('update', $applicant);

        $file = $request->file('file');
        $documentType = $request->input('document_type');

        $this->documentService->upload($applicant, $file, $documentType);

        return redirect()->route('applicant.pds')->with('success', 'Document uploaded.');
    }

    // ================================================
    // SUBMIT PDS
    // ================================================

    public function submit(SubmitPdsRequest $request)
    {
        $applicant = auth()->user()->applicant;
        Gate::authorize('submit', $applicant);

        $this->applicantService->submitPds($applicant);

        return redirect()->route('applicant.pds')->with('success', 'PDS submitted for review.');
    }





    // ================================================
    // SKIP/UNSKIP METHODS
    // ================================================
    public function skipTraining()
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('update', $applicant);

    // Delete all existing trainings
    $applicant->trainings()->delete();

    // Create placeholder with "N/A" for strings, NULL for dates
    $applicant->trainings()->create([
        'is_skipped' => true,
        'training_title' => 'N/A',
        'date_from' => null,
        'date_to' => null,
        'hours' => null,
        'type' => 'N/A',
        'conducted_by' => 'N/A',
    ]);

    return redirect()->back()->with('success', 'Training section skipped.');
}

public function unskipTraining()
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('update', $applicant);

    // Remove the skipped placeholder
    $applicant->trainings()->where('is_skipped', true)->delete();

    return redirect()->back()->with('success', 'Training section is now editable.');
}



public function skipEducation()
{
    try {
        $applicant = auth()->user()->applicant;
        Gate::authorize('update', $applicant);

        $applicant->educations()->delete();

        $applicant->educations()->create([
            'is_skipped' => true,
            'level' => 'N/A',
            'school_name' => 'N/A',
            'degree' => 'N/A',
            'from_year' => null,
            'to_year' => null,
            'units' => 'N/A',
            'year_graduated' => null,
            'honors' => 'N/A',
        ]);

        return redirect()->back()->with('success', 'Education section skipped.');
    } catch (\Exception $e) {
        dd($e->getMessage()); // Show the actual error
    }
}




public function unskipEducation()
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('update', $applicant);

    // Remove the skipped placeholder
    $applicant->educations()->where('is_skipped', true)->delete();

    return redirect()->back()->with('success', 'Education section is now editable.');
}




public function skipEligibility()
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('update', $applicant);

    $applicant->eligibilities()->delete();

    $applicant->eligibilities()->create([
        'is_skipped' => true,
        'eligibility_name' => 'N/A',
        'rating' => null,
        'exam_date' => null,
        'exam_place' => 'N/A',
        'license_number' => 'N/A',
        'valid_until' => null,
    ]);

    return redirect()->back()->with('success', 'Eligibility section skipped.');
}

public function unskipEligibility()
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('update', $applicant);

    $applicant->eligibilities()->where('is_skipped', true)->delete();

    return redirect()->back()->with('success', 'Eligibility section is now editable.');
}



public function skipWorkExperience()
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('update', $applicant);

    $applicant->workExperiences()->delete();

    $applicant->workExperiences()->create([
        'is_skipped' => true,
        'company' => 'N/A',
        'position' => 'N/A',
        'date_from' => null,
        'date_to' => null,
        'salary' => null,
        'appointment_status' => 'N/A',
        'government_service' => false,
    ]);

    return redirect()->back()->with('success', 'Work Experience section skipped.');
}

public function unskipWorkExperience()
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('update', $applicant);

    $applicant->workExperiences()->where('is_skipped', true)->delete();

    return redirect()->back()->with('success', 'Work Experience section is now editable.');
}


public function skipVoluntaryWork()
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('update', $applicant);

    $applicant->voluntaryWorks()->delete();

    $applicant->voluntaryWorks()->create([
        'is_skipped' => true,
        'organization' => 'N/A',
        'position' => 'N/A',
        'date_from' => null,
        'date_to' => null,
        'hours' => 'N/A',
    ]);

    return redirect()->back()->with('success', 'Voluntary Work section skipped.');
}

public function unskipVoluntaryWork()
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('update', $applicant);

    $applicant->voluntaryWorks()->where('is_skipped', true)->delete();

    return redirect()->back()->with('success', 'Voluntary Work section is now editable.');
}


public function skipOtherInfo()
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('update', $applicant);

    // Delete all existing records
    $applicant->skills()->delete();
    $applicant->recognitions()->delete();
    $applicant->memberships()->delete();

    // Create placeholder in each table
    $applicant->skills()->create([
        'is_skipped' => true,
        'skill' => 'N/A',
    ]);
    $applicant->recognitions()->create([
        'is_skipped' => true,
        'recognition' => 'N/A',
    ]);
    $applicant->memberships()->create([
        'is_skipped' => true,
        'organization' => 'N/A',
    ]);

    return redirect()->back()->with('success', 'Other Information section skipped.');
}

public function unskipOtherInfo()
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('update', $applicant);

    // Remove all skipped placeholders
    $applicant->skills()->where('is_skipped', true)->delete();
    $applicant->recognitions()->where('is_skipped', true)->delete();
    $applicant->memberships()->where('is_skipped', true)->delete();

    return redirect()->back()->with('success', 'Other Information section is now editable.');
}


public function skipReferences()
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('update', $applicant);

    $applicant->references()->delete();

    $applicant->references()->create([
        'is_skipped' => true,
        'name' => 'N/A',
        'address' => 'N/A',
        'contact' => 'N/A',
    ]);

    return redirect()->back()->with('success', 'References section skipped.');
}

public function unskipReferences()
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('update', $applicant);

    $applicant->references()->where('is_skipped', true)->delete();

    return redirect()->back()->with('success', 'References section is now editable.');
}



public function previewPds()
{
    $applicant = auth()->user()->applicant;
    Gate::authorize('view', $applicant);

    if (!$applicant->personalInformation) {
        return redirect()->back()->with('error', 'Please complete your Personal Information first.');
    }

    try {
        $generator = app(PDSGeneratorService::class); // now resolves correctly
        $filePath = $generator->generatePersonalInfoPreview($applicant);
        return response()->download($filePath, 'PDS_Preview.xlsx')->deleteFileAfterSend(true);
    } catch (\Exception $e) {
        \Log::error('PDS Preview Generation Error: ' . $e->getMessage());
        return redirect()->back()->with('error', 'Failed to generate PDS preview. Please try again.');
    }
}

}
