import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

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

export default function Trainings({ applicant, readonly = false }) {
    const trainings = applicant.trainings || [];
    const isSkipped = trainings.some(t => t.is_skipped) || false;
    const [expandedId, setExpandedId] = useState(null);
    const [isSkippedState, setIsSkippedState] = useState(isSkipped);

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        training_title: '',
        date_from: '',
        date_to: '',
        hours: '',
        type: '',
        conducted_by: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('applicant.pds.training'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => console.log('Validation errors:', errors),
        });
    };

    const deleteTraining = (id) => {
        if (confirm('Are you sure you want to delete this training?')) {
            destroy(route('applicant.pds.training.destroy', id), { preserveScroll: true });
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // Skip section
    const skipSection = () => {
        if (!confirm('Are you sure you want to skip this section? All existing data will be removed and marked as "N/A".')) return;
        post(route('applicant.pds.training.skip'), {
            preserveScroll: true,
            onSuccess: () => setIsSkippedState(true),
        });
    };

    // Unskip section
    const unskipSection = () => {
        post(route('applicant.pds.training.unskip'), {
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
                <h2 className="text-xl font-semibold mb-4">Learning & Development (Trainings)</h2>
                {trainings.length > 0 ? (
                    trainings.map((t) => (
                        <div key={t.id} className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="font-medium">{t.is_skipped ? 'N/A' : t.training_title}</p>
                            {!t.is_skipped && (
                                <>
                                    <p className="text-sm text-gray-600">{formatDate(t.date_from)} - {t.date_to ? formatDate(t.date_to) : 'Present'}</p>
                                    {t.type && <p className="text-sm text-gray-600">Type: {t.type}</p>}
                                    {t.hours && <p className="text-sm text-gray-600">Hours: {t.hours}</p>}
                                    <p className="text-sm text-gray-500">Conducted by: {t.conducted_by}</p>
                                </>
                            )}
                        </div>
                    ))
                ) : <p className="text-gray-500 text-sm">No trainings.</p>}
            </div>
        );
    }

    // Skipped state
    if (isSkippedState) {
        return (
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Learning & Development (Trainings)</h2>
                    <button
                        onClick={unskipSection}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Edit Section
                    </button>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-500">
                    <p>You have skipped this section. All fields have been marked as <strong>N/A</strong>.</p>
                    <p className="text-sm mt-1">Click the <strong>"Edit Section"</strong> button above to add training records.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Learning & Development (Trainings)</h2>
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
                    <strong>Note:</strong> Please add <strong>all</strong> relevant trainings, seminars, and workshops you have attended
                    (both local and international). Include the title, date, hours, type, and conducting organization.
                </p>
            </div>

            {/* Training list */}
            <div className="space-y-2 mb-4">
                {trainings.filter(t => !t.is_skipped).length > 0 ? (
                    trainings.filter(t => !t.is_skipped).map((training) => {
                        const isExpanded = expandedId === training.id;
                        return (
                            <div key={training.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <button
                                    onClick={() => toggleExpand(training.id)}
                                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition text-left"
                                >
                                    <span className="font-medium text-gray-800 truncate">{training.training_title}</span>
                                    <div className="flex items-center ml-4 flex-shrink-0">
                                        {isExpanded ? (
                                            <ChevronUp className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-gray-500" />
                                        )}
                                    </div>
                                </button>
                                {isExpanded && (
                                    <div className="p-4 bg-white border-t border-gray-200 space-y-1 animate-fade-in">
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Date:</span> {formatDate(training.date_from)} – {training.date_to ? formatDate(training.date_to) : 'Present'}
                                        </p>
                                        {training.type && (
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Type:</span> {training.type}
                                            </p>
                                        )}
                                        {training.hours && (
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Hours:</span> {training.hours}
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Conducted by:</span> {training.conducted_by}
                                        </p>
                                        <div className="mt-3 flex justify-end">
                                            <button
                                                onClick={() => deleteTraining(training.id)}
                                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500 text-sm">No trainings added yet.</p>
                )}
            </div>

            {/* Add form */}
            <form onSubmit={submit} className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium">Add Training</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Training Title *</label>
                        <input
                            type="text"
                            value={data.training_title}
                            onChange={e => setData('training_title', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.training_title && <p className="text-red-500 text-sm mt-1">{errors.training_title}</p>}
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
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <input
                            type="text"
                            value={data.type}
                            onChange={e => setData('type', e.target.value)}
                            placeholder="e.g., Managerial, Technical"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Conducted By *</label>
                        <input
                            type="text"
                            value={data.conducted_by}
                            onChange={e => setData('conducted_by', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.conducted_by && <p className="text-red-500 text-sm mt-1">{errors.conducted_by}</p>}
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Add Training'}
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
