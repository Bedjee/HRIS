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

export default function WorkExperience({ applicant, readonly = false }) {
    const experiences = applicant.work_experiences || [];
    const isSkipped = experiences.some(e => e.is_skipped) || false;
    const [isSkippedState, setIsSkippedState] = useState(isSkipped);
    const [expandedId, setExpandedId] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        company: '',
        position: '',
        date_from: '',
        date_to: '',
        salary: '',
        appointment_status: '',
        government_service: false,
    });

    const [editing, setEditing] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        post(route('applicant.pds.work-experience'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setEditing(null);
            },
        });
    };

    const deleteExperience = (id) => {
        if (confirm('Are you sure you want to delete this work experience?')) {
            destroy(route('applicant.pds.work-experience.destroy', id), { preserveScroll: true });
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // Skip section
    const skipSection = () => {
        if (!confirm('Are you sure you want to skip this section? All existing data will be removed and marked as "N/A".')) return;
        post(route('applicant.pds.work-experience.skip'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsSkippedState(true);
                reset();
            },
        });
    };

    // Unskip section
    const unskipSection = () => {
        post(route('applicant.pds.work-experience.unskip'), {
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
                <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
                {experiences.length > 0 ? (
                    experiences.map((exp) => (
                        <div key={exp.id} className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="font-medium">{exp.is_skipped ? 'N/A' : `${exp.position} - ${exp.company}`}</p>
                            {!exp.is_skipped && (
                                <>
                                    <p className="text-sm text-gray-600">{formatDate(exp.date_from)} - {exp.date_to ? formatDate(exp.date_to) : 'Present'}</p>
                                    {exp.salary && <p className="text-sm text-gray-600">Salary: ₱{exp.salary}</p>}
                                    {exp.appointment_status && <p className="text-sm text-gray-600">Status: {exp.appointment_status}</p>}
                                    <p className="text-sm text-gray-500">{exp.government_service ? 'Government Service' : 'Private Sector'}</p>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No work experience.</p>
                )}
            </div>
        );
    }

    // Skipped state
    if (isSkippedState) {
        return (
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Work Experience</h2>
                    <button
                        onClick={unskipSection}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Edit Section
                    </button>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-500">
                    <p>You have skipped this section. All fields have been marked as <strong>N/A</strong>.</p>
                    <p className="text-sm mt-1">Click the <strong>"Edit Section"</strong> button above to add work experience records.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Work Experience</h2>
                <button
                    onClick={skipSection}
                    className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    Skip This Section
                </button>
            </div>

            <div className="space-y-2 mb-4">
                {experiences.filter(e => !e.is_skipped).length > 0 ? (
                    experiences.filter(e => !e.is_skipped).map((exp) => {
                        const isExpanded = expandedId === exp.id;
                        return (
                            <div
                                key={exp.id}
                                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Clickable header – expands/collapses */}
                                <button
                                    onClick={() => toggleExpand(exp.id)}
                                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition text-left"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-800 truncate">{exp.position} - {exp.company}</p>
                                        <p className="text-sm text-gray-500 truncate">
                                            {formatDate(exp.date_from)} - {exp.date_to ? formatDate(exp.date_to) : 'Present'}
                                            {exp.government_service ? ' | Government Service' : ''}
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
                                            <span className="font-medium">Company:</span> {exp.company}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Position:</span> {exp.position}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Date From:</span> {formatDate(exp.date_from)}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Date To:</span> {exp.date_to ? formatDate(exp.date_to) : 'Present'}
                                        </p>
                                        {exp.salary && (
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Salary:</span> ₱{exp.salary}
                                            </p>
                                        )}
                                        {exp.appointment_status && (
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Appointment Status:</span> {exp.appointment_status}
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Sector:</span> {exp.government_service ? 'Government Service' : 'Private Sector'}
                                        </p>
                                        <div className="mt-3 flex justify-end">
                                            <button
                                                onClick={() => deleteExperience(exp.id)}
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
                    <p className="text-gray-500 text-sm">No work experience added yet.</p>
                )}
            </div>

            <form onSubmit={submit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Add Work Experience</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company *</label>
                        <input
                            type="text"
                            value={data.company}
                            onChange={e => setData('company', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
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
                        <label className="block text-sm font-medium text-gray-700">Salary</label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.salary}
                            onChange={e => setData('salary', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Appointment Status</label>
                        <input
                            type="text"
                            value={data.appointment_status}
                            onChange={e => setData('appointment_status', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={data.government_service}
                                onChange={e => setData('government_service', e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Government Service</span>
                        </label>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Add Work Experience'}
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
