<?php

namespace App\Modules\ApplicantManagement\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Modules\ApplicantManagement\Services\ApplicantService;
use App\Modules\ApplicantManagement\Models\Applicant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ApplicantManagementController extends Controller
{
    public function __construct(
        protected ApplicantService $applicantService
    ) {}


public function dashboard()
{
    Gate::authorize('view_applicants');

    // Total and status counts (same as before)
    $total = Applicant::count();
    $statusCounts = Applicant::selectRaw('status, count(*) as count')
        ->groupBy('status')
        ->pluck('count', 'status')
        ->toArray();

    // Monthly trend – last 12 months
    $monthlyData = [];
    for ($i = 11; $i >= 0; $i--) {
        $month = now()->subMonths($i);
        $count = Applicant::whereYear('created_at', $month->year)
            ->whereMonth('created_at', $month->month)
            ->count();
        $monthlyData[] = [
            'month' => $month->format('M Y'), // e.g., "Jan 2025"
            'count' => $count,
        ];
    }

    // Status distribution for donut chart – group into 4 categories
    $statusGroups = [
        'Hired' => ['hired'],
        'Verified' => ['verified'],
        'Rejected' => ['rejected'],
        'Pending' => ['registered', 'invited', 'pds_in_progress', 'pds_submitted', 'under_review'],
    ];
    $distribution = [];
    foreach ($statusGroups as $label => $statuses) {
        $distribution[$label] = Applicant::whereIn('status', $statuses)->count();
    }

    // Recent applicants (unchanged)
    $recentApplicants = Applicant::with(['user', 'personalInformation'])
        ->latest()
        ->limit(5)
        ->get();

    return Inertia::render('ApplicantManagement/HR/Dashboard', [
        'stats' => [
            'total' => $total,
            'statuses' => $statusCounts,
            'invited' => Applicant::where('status', 'invited')->count(),
            'submitted' => Applicant::where('status', 'pds_submitted')->count(),
            'verified' => Applicant::where('status', 'verified')->count(),
            'hired' => Applicant::where('status', 'hired')->count(),
            'rejected' => Applicant::where('status', 'rejected')->count(),
        ],
        'monthlyTrend' => $monthlyData,
        'statusDistribution' => $distribution,
        'recentApplicants' => $recentApplicants,
    ]);
}





    public function index(Request $request)
    {
        Gate::authorize('view_applicants');

        $query = Applicant::with(['user', 'personalInformation']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $applicants = $query->paginate(20);

       return Inertia::render('ApplicantManagement/HR/Applicants/Index', [
    'applicants' => $applicants,
]);
    }

   public function show(Applicant $applicant)
{
    Gate::authorize('view', $applicant);

    $applicant->load([
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
        'documents.verifier',
        'user',
    ]);

    return Inertia::render('ApplicantManagement/HR/Applicants/Show', [
        'applicant' => $applicant,
    ]);


    }

    public function invite(Applicant $applicant)
    {
        Gate::authorize('invite', $applicant);

        $this->applicantService->invite($applicant, auth()->user());

        return redirect()->back()->with('success', 'Applicant invited successfully.');
    }

    public function verify(Applicant $applicant)
    {
        Gate::authorize('verify', $applicant);

        $this->applicantService->verify($applicant);

        return redirect()->back()->with('success', 'Applicant verified successfully.');
    }

    public function reject(Applicant $applicant)
    {
        Gate::authorize('reject', $applicant);

        $this->applicantService->reject($applicant);

        return redirect()->back()->with('success', 'Applicant rejected.');
    }

    // Optional: Document verification
    public function verifyDocument(Request $request, Applicant $applicant, $documentId)
    {
        $request->validate([
            'verified' => 'required|boolean',
            'rejection_reason' => 'nullable|string|max:500',
        ]);

        $document = $applicant->documents()->findOrFail($documentId);
        Gate::authorize('verify_documents');

        $document->update([
            'verified' => $request->verified,
            'verified_by' => auth()->id(),
            'verified_at' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return redirect()->back()->with('success', 'Document verification updated.');
    }
}
