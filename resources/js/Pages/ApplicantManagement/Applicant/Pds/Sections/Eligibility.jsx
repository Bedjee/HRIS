import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { X, ChevronDown, ChevronUp, Info } from 'lucide-react';

// Helper: format date to "Aug 26, 2021"
const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

export default function Eligibility({ applicant, readonly = false }) {
    const eligibilities = applicant.eligibilities || [];
    const isSkipped = eligibilities.some(e => e.is_skipped) || false;
    const [isSkippedState, setIsSkippedState] = useState(isSkipped);
    const [expandedId, setExpandedId] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        eligibility_name: '',
        rating: '',
        exam_date: '',
        exam_place: '',
        license_number: '',
        valid_until: '',
    });

    const [editing, setEditing] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        post(route('applicant.pds.eligibility'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setEditing(null);
            },
        });
    };

    const deleteEligibility = (id) => {
        if (confirm('Are you sure you want to delete this eligibility?')) {
            destroy(route('applicant.pds.eligibility.destroy', id), { preserveScroll: true });
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // Skip section
    const skipSection = () => {
        if (!confirm('Are you sure you want to skip this section? All existing data will be removed and marked as "N/A".')) return;
        post(route('applicant.pds.eligibility.skip'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsSkippedState(true);
                reset();
            },
        });
    };

    // Unskip section
    const unskipSection = () => {
        post(route('applicant.pds.eligibility.unskip'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsSkippedState(false);
                reset();
            },
        });
    };

    // Read‑only mode
    if (readonly) {
        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">Civil Service Eligibility</h2>
                {eligibilities.length > 0 ? (
                    eligibilities.map((elig) => (
                        <div key={elig.id} className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="font-medium">{elig.is_skipped ? 'N/A' : elig.eligibility_name}</p>
                            {!elig.is_skipped && (
                                <p className="text-sm text-gray-600">
                                    {elig.rating ? `Rating: ${elig.rating}` : ''}
                                    {elig.exam_date ? ` | Exam: ${formatDate(elig.exam_date)}` : ''}
                                    {elig.license_number ? ` | License: ${elig.license_number}` : ''}
                                    {elig.valid_until ? ` | Valid Until: ${formatDate(elig.valid_until)}` : ''}
                                </p>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No eligibilities recorded.</p>
                )}
            </div>
        );
    }

    // Skipped state
    if (isSkippedState) {
        return (
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Civil Service Eligibility</h2>
                    <button
                        onClick={unskipSection}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Edit Section
                    </button>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-500">
                    <p>You have skipped this section. All fields have been marked as <strong>N/A</strong>.</p>
                    <p className="text-sm mt-1">Click the <strong>"Edit Section"</strong> button above to add eligibility records.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Civil Service Eligibility</h2>
                <button
                    onClick={skipSection}
                    className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    Skip This Section
                </button>
            </div>

            {/* ✅ Instructional message */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                    <strong>Note:</strong> If you have multiple civil service eligibilities (e.g., Career Service Professional,
                    Subprofessional, etc.), please add <strong>all</strong> of them. Each eligibility should be entered as a separate record
                    with its corresponding details.
                </p>
            </div>

            <div className="space-y-2 mb-4">
                {eligibilities.filter(e => !e.is_skipped).length > 0 ? (
                    eligibilities.filter(e => !e.is_skipped).map((elig) => {
                        const isExpanded = expandedId === elig.id;
                        return (
                            <div
                                key={elig.id}
                                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Clickable header – expands/collapses */}
                                <button
                                    onClick={() => toggleExpand(elig.id)}
                                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition text-left"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-800 truncate">{elig.eligibility_name}</p>
                                        <p className="text-sm text-gray-500 truncate">
                                            {elig.rating ? `Rating: ${elig.rating}` : ''}
                                            {elig.exam_date ? ` | Exam: ${formatDate(elig.exam_date)}` : ''}
                                            {elig.license_number ? ` | License: ${elig.license_number}` : ''}
                                            {elig.valid_until ? ` | Valid Until: ${formatDate(elig.valid_until)}` : ''}
                                        </p>
                                    </div>
                                    <div className="flex items-center ml-4 flex-shrink-0">
                                        {isExpanded ? (
                                            <ChevronUp className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-gray-500" />
                                        )}
                                    </div>
                                </button>

                                {/* Expandable content – full details + remove button */}
                                {isExpanded && (
                                    <div className="p-4 bg-white border-t border-gray-200 space-y-1 animate-fade-in">
                                        {elig.eligibility_name && (
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Eligibility:</span> {elig.eligibility_name}
                                            </p>
                                        )}
                                        {elig.rating && (
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Rating:</span> {elig.rating}
                                            </p>
                                        )}
                                        {elig.exam_date && (
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Exam Date:</span> {formatDate(elig.exam_date)}
                                            </p>
                                        )}
                                        {elig.exam_place && (
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Exam Place:</span> {elig.exam_place}
                                            </p>
                                        )}
                                        {elig.license_number && (
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">License Number:</span> {elig.license_number}
                                            </p>
                                        )}
                                        {elig.valid_until && (
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Valid Until:</span> {formatDate(elig.valid_until)}
                                            </p>
                                        )}
                                        <div className="mt-3 flex justify-end">
                                            <button
                                                onClick={() => deleteEligibility(elig.id)}
                                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition text-sm font-medium"
                                            >
                                                <span className="hidden sm:inline">Remove</span>
                                                <X className="h-4 w-4 sm:hidden" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500 text-sm">No eligibilities added yet.</p>
                )}
            </div>

            <form onSubmit={submit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Add Eligibility</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Eligibility Name *</label>
                        <input
                            type="text"
                            value={data.eligibility_name}
                            onChange={e => setData('eligibility_name', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.eligibility_name && <p className="text-red-500 text-sm mt-1">{errors.eligibility_name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rating</label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.rating}
                            onChange={e => setData('rating', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Exam Date</label>
                        <input
                            type="date"
                            value={data.exam_date}
                            onChange={e => setData('exam_date', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Exam Place</label>
                        <input
                            type="text"
                            value={data.exam_place}
                            onChange={e => setData('exam_place', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">License Number</label>
                        <input
                            type="text"
                            value={data.license_number}
                            onChange={e => setData('license_number', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Valid Until</label>
                        <input
                            type="date"
                            value={data.valid_until}
                            onChange={e => setData('valid_until', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Add Eligibility'}
                    </button>
                </div>
            </form>

            <style jsx>{`
                .animate-fade-in {
                    animation: fadeIn 0.2s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-4px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
