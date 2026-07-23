<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Modules\ApplicantManagement\Controllers\Applicant\PdsController;
use App\Modules\ApplicantManagement\Controllers\HR\ApplicantManagementController;

use App\Modules\ApplicantManagement\Models\ApplicantDocument;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Pages
Route::get('/', function () {
    return Inertia::render('Public/Home');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('Public/About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Public/Contact');
})->name('contact');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



//APPLICANT MANAGEMENT MODULE ROUTES
//APPLICANT MANAGEMENT MODULE ROUTES
Route::middleware(['auth', 'verified'])->prefix('applicant')->name('applicant.')->group(function () {
    // Dashboard
   Route::get('/dashboard', function () {
    $applicant = auth()->user()->applicant;

    // Eager load all relationships needed for percentage calculation
    $applicant->load([
        'personalInformation',
        'addresses',

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
    ]);

    // Add computed attributes
    $applicant->completion_percentage = $applicant->completion_percentage;
    $applicant->days_active = $applicant->days_active;
    $applicant->timeline = $applicant->timeline;

    return Inertia::render('ApplicantManagement/Applicant/Dashboard', [
        'applicant' => $applicant,
    ]);
})->name('dashboard');



    // PDS Stepper
    Route::get('/pds', [PdsController::class, 'index'])->name('pds');


Route::get('/pds/preview', [PdsController::class, 'previewPds'])->name('pds.preview');

    // Personal Information (single record – update only)
    Route::post('/pds/personal', [PdsController::class, 'storePersonalInfo'])->name('pds.personal');


    // Addresses (add/update)
    Route::post('/pds/address', [PdsController::class, 'storeAddress'])->name('pds.address');

    // Family Background
Route::post('/pds/family', [PdsController::class, 'storeFamilyBackground'])->name('pds.family');
Route::post('/pds/children', [PdsController::class, 'addChild'])->name('pds.children.add');
Route::delete('/pds/children/{id}', [PdsController::class, 'destroyChild'])->name('pds.children.destroy');

    // Education (add/delete)
    Route::post('/pds/education', [PdsController::class, 'storeEducation'])->name('pds.education');
    Route::delete('/pds/education/{id}', [PdsController::class, 'destroyEducation'])->name('pds.education.destroy');

    Route::post('/pds/education/skip', [PdsController::class, 'skipEducation'])->name('pds.education.skip');
    Route::post('/pds/education/unskip', [PdsController::class, 'unskipEducation'])->name('pds.education.unskip');

    // Eligibility (add/delete)
    Route::post('/pds/eligibility', [PdsController::class, 'storeEligibility'])->name('pds.eligibility');
    Route::delete('/pds/eligibility/{id}', [PdsController::class, 'destroyEligibility'])->name('pds.eligibility.destroy');

    Route::post('/pds/eligibility/skip', [PdsController::class, 'skipEligibility'])->name('pds.eligibility.skip');
Route::post('/pds/eligibility/unskip', [PdsController::class, 'unskipEligibility'])->name('pds.eligibility.unskip');

    // Work Experience (add/delete)
    Route::post('/pds/work-experience', [PdsController::class, 'storeWorkExperience'])->name('pds.work-experience');
    Route::delete('/pds/work-experience/{id}', [PdsController::class, 'destroyWorkExperience'])->name('pds.work-experience.destroy');

    Route::post('/pds/work-experience/skip', [PdsController::class, 'skipWorkExperience'])->name('pds.work-experience.skip');
Route::post('/pds/work-experience/unskip', [PdsController::class, 'unskipWorkExperience'])->name('pds.work-experience.unskip');

    // Voluntary Work (add/delete)
    Route::post('/pds/voluntary-work', [PdsController::class, 'storeVoluntaryWork'])->name('pds.voluntary-work');
    Route::delete('/pds/voluntary-work/{id}', [PdsController::class, 'destroyVoluntaryWork'])->name('pds.voluntary-work.destroy');

    Route::post('/pds/voluntary-work/skip', [PdsController::class, 'skipVoluntaryWork'])->name('pds.voluntary-work.skip');
Route::post('/pds/voluntary-work/unskip', [PdsController::class, 'unskipVoluntaryWork'])->name('pds.voluntary-work.unskip');




    // Trainings (add/delete)
    Route::post('/pds/training', [PdsController::class, 'storeTraining'])->name('pds.training');
    Route::delete('/pds/training/{id}', [PdsController::class, 'destroyTraining'])->name('pds.training.destroy');

    Route::post('/pds/training/skip', [PdsController::class, 'skipTraining'])->name('pds.training.skip');
Route::post('/pds/training/unskip', [PdsController::class, 'unskipTraining'])->name('pds.training.unskip');

    // Skills (add/delete)
    Route::post('/pds/skill', [PdsController::class, 'storeSkill'])->name('pds.skill');
    Route::delete('/pds/skill/{id}', [PdsController::class, 'destroySkill'])->name('pds.skill.destroy');

    // Recognitions (add/delete)
    Route::post('/pds/recognition', [PdsController::class, 'storeRecognition'])->name('pds.recognition');
    Route::delete('/pds/recognition/{id}', [PdsController::class, 'destroyRecognition'])->name('pds.recognition.destroy');

    // Memberships (add/delete)
    Route::post('/pds/membership', [PdsController::class, 'storeMembership'])->name('pds.membership');
    Route::delete('/pds/membership/{id}', [PdsController::class, 'destroyMembership'])->name('pds.membership.destroy');


    Route::post('/pds/other-info/skip', [PdsController::class, 'skipOtherInfo'])->name('pds.other-info.skip');
Route::post('/pds/other-info/unskip', [PdsController::class, 'unskipOtherInfo'])->name('pds.other-info.unskip');

    // Questionnaire (single record – update only)
    Route::post('/pds/questionnaire', [PdsController::class, 'storeQuestionnaire'])->name('pds.questionnaire');

    // References (add/delete)
    Route::post('/pds/reference', [PdsController::class, 'storeReference'])->name('pds.reference');
    Route::delete('/pds/reference/{id}', [PdsController::class, 'destroyReference'])->name('pds.reference.destroy');

    Route::post('/pds/reference/skip', [PdsController::class, 'skipReferences'])->name('pds.reference.skip');
Route::post('/pds/reference/unskip', [PdsController::class, 'unskipReferences'])->name('pds.reference.unskip');

    // Documents (upload, download, delete, verify)
    Route::post('/pds/documents', [PdsController::class, 'uploadDocument'])->name('pds.documents');
    Route::delete('/pds/documents/{id}', [PdsController::class, 'destroyDocument'])->name('pds.documents.destroy');
    Route::get('/pds/documents/{id}/download', [PdsController::class, 'downloadDocument'])->name('pds.documents.download');
    Route::delete('/pds/documents/{id}', [PdsController::class, 'destroyDocument'])->name('pds.documents.destroy');







    // ===== GET FALLBACKS (Prevent 405 after exceptions) =====
Route::get('/pds/personal', function () {
    return redirect()->route('applicant.pds')->with('error', 'Something went wrong. Please try again.');
})->name('pds.personal.fallback');

Route::get('/pds/address', function () {
    return redirect()->route('applicant.pds')->with('error', 'Something went wrong. Please try again.');
})->name('pds.address.fallback');

Route::get('/pds/family', function () {
    return redirect()->route('applicant.pds')->with('error', 'Something went wrong. Please try again.');
})->name('pds.family.fallback');

Route::get('/pds/education', function () {
    return redirect()->route('applicant.pds')->with('error', 'Something went wrong. Please try again.');
})->name('pds.education.fallback');

Route::get('/pds/eligibility', function () {
    return redirect()->route('applicant.pds')->with('error', 'Something went wrong. Please try again.');
})->name('pds.eligibility.fallback');

Route::get('/pds/work-experience', function () {
    return redirect()->route('applicant.pds')->with('error', 'Something went wrong. Please try again.');
})->name('pds.work-experience.fallback');

Route::get('/pds/voluntary-work', function () {
    return redirect()->route('applicant.pds')->with('error', 'Something went wrong. Please try again.');
})->name('pds.voluntary-work.fallback');

Route::get('/pds/training', function () {
    return redirect()->route('applicant.pds')->with('error', 'Something went wrong. Please try again.');
})->name('pds.training.fallback');

Route::get('/pds/skill', function () {
    return redirect()->route('applicant.pds')->with('error', 'Something went wrong. Please try again.');
})->name('pds.skill.fallback');

Route::get('/pds/recognition', function () {
    return redirect()->route('applicant.pds')->with('error', 'Something went wrong. Please try again.');
})->name('pds.recognition.fallback');

Route::get('/pds/membership', function () {
    return redirect()->route('applicant.pds')->with('error', 'Something went wrong. Please try again.');
})->name('pds.membership.fallback');

Route::get('/pds/questionnaire', function () {
    return redirect()->route('applicant.pds')->with('error', 'Something went wrong. Please try again.');
})->name('pds.questionnaire.fallback');

Route::get('/pds/reference', function () {
    return redirect()->route('applicant.pds')->with('error', 'Something went wrong. Please try again.');
})->name('pds.reference.fallback');

Route::get('/pds/documents', function () {
    return redirect()->route('applicant.pds')->with('error', 'Something went wrong. Please try again.');
})->name('pds.documents.fallback');

Route::get('/pds/submit', function () {
    return redirect()->route('applicant.pds')->with('error', 'Something went wrong. Please try again.');
})->name('pds.submit.fallback');




    // Submit PDS
    Route::post('/pds/submit', [PdsController::class, 'submit'])->name('pds.submit');



});




Route::middleware(['auth', 'verified'])->prefix('hr')->name('hr.')->group(function () {
    // ✅ Dashboard with controller method and permission
    Route::get('/dashboard', [ApplicantManagementController::class, 'dashboard'])
        ->middleware('can:view_applicants')
        ->name('dashboard');

    Route::get('/applicants', [ApplicantManagementController::class, 'index'])
        ->middleware('can:view_applicants')
        ->name('applicants.index');

    Route::get('/applicants/{applicant}', [ApplicantManagementController::class, 'show'])
        ->middleware('can:view,applicant')
        ->name('applicants.show');

    Route::post('/applicants/{applicant}/invite', [ApplicantManagementController::class, 'invite'])
        ->middleware('can:invite,applicant')
        ->name('applicants.invite');

    Route::post('/applicants/{applicant}/verify', [ApplicantManagementController::class, 'verify'])
        ->middleware('can:verify,applicant')
        ->name('applicants.verify');

    Route::post('/applicants/{applicant}/reject', [ApplicantManagementController::class, 'reject'])
        ->middleware('can:reject,applicant')
        ->name('applicants.reject');

    Route::post('/applicants/{applicant}/documents/{document}/verify', [ApplicantManagementController::class, 'verifyDocument'])
        ->middleware('can:verify_documents')
        ->name('applicants.documents.verify');
});

//---------------------------------------------------------------------------------------------------------------------------------------------------------



require __DIR__.'/auth.php';
