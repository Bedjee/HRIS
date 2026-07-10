import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

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

export default function VoluntaryWork({ applicant, readonly = false }) {
    const works = applicant.voluntary_works || [];
    const isSkipped = works.some(w => w.is_skipped) || false;
    const [isSkippedState, setIsSkippedState] = useState(isSkipped);
    const [expandedId, setExpandedId] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        organization: '',
        position: '',
        date_from: '',
        date_to: '',
        hours: '',
    });

    const [editing, setEditing] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        post(route('applicant.pds.voluntary-work'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setEditing(null);
            },
        });
    };

    const deleteWork = (id) => {
        if (confirm('Are you sure you want to delete this voluntary work?')) {
            destroy(route('applicant.pds.voluntary-work.destroy', id), { preserveScroll: true });
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // Skip section
    const skipSection = () => {
        if (!confirm('Are you sure you want to skip this section? All existing data will be removed and marked as "N/A".')) return;
        post(route('applicant.pds.voluntary-work.skip'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsSkippedState(true);
                reset();
            },
        });
    };

    // Unskip section
    const unskipSection = () => {
        post(route('applicant.pds.voluntary-work.unskip'), {
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
                <h2 className="text-xl font-semibold mb-4">Voluntary Work</h2>
                {works.length > 0 ? (
                    works.map((work) => (
                        <div key={work.id} className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="font-medium">{work.is_skipped ? 'N/A' : `${work.position} - ${work.organization}`}</p>
                            {!work.is_skipped && (
                                <>
                                    <p className="text-sm text-gray-600">{formatDate(work.date_from)} - {work.date_to ? formatDate(work.date_to) : 'Present'}</p>
                                    {work.hours && <p className="text-sm text-gray-600">Hours: {work.hours}</p>}
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No voluntary work.</p>
                )}
            </div>
        );
    }

    // Skipped state
    if (isSkippedState) {
        return (
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Voluntary Work</h2>
                    <button
                        onClick={unskipSection}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Edit Section
                    </button>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-500">
                    <p>You have skipped this section. All fields have been marked as <strong>N/A</strong>.</p>
                    <p className="text-sm mt-1">Click the <strong>"Edit Section"</strong> button above to add voluntary work records.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Voluntary Work</h2>
                <button
                    onClick={skipSection}
                    className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    Skip This Section
                </button>
            </div>

            <div className="space-y-2 mb-4">
                {works.filter(w => !w.is_skipped).length > 0 ? (
                    works.filter(w => !w.is_skipped).map((work) => {
                        const isExpanded = expandedId === work.id;
                        return (
                            <div
                                key={work.id}
                                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Clickable header – expands/collapses */}
                                <button
                                    onClick={() => toggleExpand(work.id)}
                                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition text-left"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-800 truncate">{work.position} - {work.organization}</p>
                                        <p className="text-sm text-gray-500 truncate">
                                            {formatDate(work.date_from)} - {work.date_to ? formatDate(work.date_to) : 'Present'}
                                            {work.hours && ` | ${work.hours}`}
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
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Organization:</span> {work.organization}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Position:</span> {work.position}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Date From:</span> {formatDate(work.date_from)}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Date To:</span> {work.date_to ? formatDate(work.date_to) : 'Present'}
                                        </p>
                                        {work.hours && (
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Hours:</span> {work.hours}
                                            </p>
                                        )}
                                        <div className="mt-3 flex justify-end">
                                            <button
                                                onClick={() => deleteWork(work.id)}
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
                    <p className="text-gray-500 text-sm">No voluntary work added yet.</p>
                )}
            </div>

            <form onSubmit={submit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Add Voluntary Work</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Organization *</label>
                        <input
                            type="text"
                            value={data.organization}
                            onChange={e => setData('organization', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.organization && <p className="text-red-500 text-sm mt-1">{errors.organization}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Position *</label>
                        <input
                            type="text"
                            value={data.position}
                            onChange={e => setData('position', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date From *</label>
                        <input
                            type="date"
                            value={data.date_from}
                            onChange={e => setData('date_from', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.date_from && <p className="text-red-500 text-sm mt-1">{errors.date_from}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date To</label>
                        <input
                            type="date"
                            value={data.date_to}
                            onChange={e => setData('date_to', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hours</label>
                        <input
                            type="text"
                            value={data.hours}
                            onChange={e => setData('hours', e.target.value)}
                            placeholder="e.g., 40 hours/week"
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
                        {processing ? 'Saving...' : 'Add Voluntary Work'}
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
