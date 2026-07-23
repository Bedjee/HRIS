import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { X, ChevronDown, ChevronUp, Info } from 'lucide-react';

// Predefined education levels (matching PDS)
const LEVELS = [
    { value: 'elementary', label: 'Elementary' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'vocational', label: 'Vocational/Trade Course' },
    { value: 'college', label: 'College' },
    { value: 'graduate_studies', label: 'Graduate Studies' },
];

const LEVELS_WITH_DEGREE = ['vocational', 'college', 'graduate_studies'];

// Helper to get label from value
const getLevelLabel = (value) => {
    const found = LEVELS.find(l => l.value === value);
    return found ? found.label : value;
};

export default function Education({ applicant, readonly = false }) {
    const educations = applicant.educations || [];
    const isSkipped = educations.some(e => e.is_skipped) || false;
    const [isSkippedState, setIsSkippedState] = useState(isSkipped);
    const [expandedId, setExpandedId] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        level: '',
        school_name: '',
        degree: '',
        from_year: '',
        to_year: '',
        units: '',
        year_graduated: '',
        honors: '',
    });

    const [editing, setEditing] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        post(route('applicant.pds.education'), {
            preserveScroll: true,
            onSuccess: () => { reset(); setEditing(null); },
        });
    };

    const deleteEducation = (id) => {
        if (confirm('Are you sure you want to delete this education record?')) {
            destroy(route('applicant.pds.education.destroy', id), { preserveScroll: true });
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const showDegree = LEVELS_WITH_DEGREE.includes(data.level);

    // Skip section
    const skipSection = () => {
        if (!confirm('Are you sure you want to skip this section? All existing data will be removed and marked as "N/A".')) return;
        post(route('applicant.pds.education.skip'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsSkippedState(true);
                reset();
            },
        });
    };

    const unskipSection = () => {
        post(route('applicant.pds.education.unskip'), {
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
                <h2 className="text-xl font-semibold mb-4">Educational Background</h2>
                {educations.map((edu) => (
                    <div key={edu.id} className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="font-medium">{edu.is_skipped ? 'N/A' : getLevelLabel(edu.level)}</p>
                        {!edu.is_skipped && (
                            <>
                                <p className="text-sm text-gray-600">{edu.school_name} ({edu.from_year} - {edu.to_year})</p>
                                {edu.degree && <p className="text-sm text-gray-600">Degree: {edu.degree}</p>}
                                {edu.year_graduated && <p className="text-sm text-gray-500">Graduated: {edu.year_graduated}</p>}
                                {edu.units && <p className="text-sm text-gray-500">Units: {edu.units}</p>}
                                {edu.honors && <p className="text-sm text-gray-500">Honors: {edu.honors}</p>}
                            </>
                        )}
                    </div>
                ))}
                {educations.length === 0 && <p className="text-gray-500 text-sm">No education records.</p>}
            </div>
        );
    }

    // Skipped state
    if (isSkippedState) {
        return (
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Educational Background</h2>
                    <button
                        onClick={unskipSection}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Edit Section
                    </button>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-500">
                    <p>You have skipped this section. All fields have been marked as <strong>N/A</strong>.</p>
                    <p className="text-sm mt-1">Click the <strong>"Edit Section"</strong> button above to add education records.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Educational Background</h2>
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
                    <strong>Note:</strong> If you have completed multiple levels of education (e.g., Elementary, Secondary, College, etc.),
                    please add <strong>all</strong> of your educational background records, not just your highest level of education.
                    Select each applicable education level and provide the corresponding details.
                </p>
            </div>

            {/* Education records – expandable cards */}
            <div className="space-y-2 mb-4">
                {educations.filter(e => !e.is_skipped).length > 0 ? (
                    educations.filter(e => !e.is_skipped).map((edu) => {
                        const isExpanded = expandedId === edu.id;
                        return (
                            <div
                                key={edu.id}
                                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Clickable header – expands/collapses */}
                                <button
                                    onClick={() => toggleExpand(edu.id)}
                                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition text-left"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-800 truncate">{getLevelLabel(edu.level)}</p>
                                        <p className="text-sm text-gray-500 truncate">
                                            {edu.school_name} ({edu.from_year} - {edu.to_year})
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
                                        {edu.degree && (
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Degree:</span> {edu.degree}
                                            </p>
                                        )}
                                        {edu.units && (
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Units:</span> {edu.units}
                                            </p>
                                        )}
                                        {edu.year_graduated && (
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Year Graduated:</span> {edu.year_graduated}
                                            </p>
                                        )}
                                        {edu.honors && (
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Honors:</span> {edu.honors}
                                            </p>
                                        )}
                                        <div className="mt-3 flex justify-end">
                                            <button
                                                onClick={() => deleteEducation(edu.id)}
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
                    <p className="text-gray-500 text-sm">No education records added yet.</p>
                )}
            </div>

            {/* Add form */}
            <form onSubmit={submit} className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium">Add Education</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Level *</label>
                        <select
                            value={data.level}
                            onChange={e => setData('level', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Select Level</option>
                            {LEVELS.map((level) => (
                                <option key={level.value} value={level.value}>{level.label}</option>
                            ))}
                        </select>
                        {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">School Name *</label>
                        <input
                            type="text"
                            value={data.school_name}
                            onChange={e => setData('school_name', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.school_name && <p className="text-red-500 text-sm mt-1">{errors.school_name}</p>}
                    </div>

                    {showDegree && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Degree / Course</label>
                            <input
                                type="text"
                                value={data.degree}
                                onChange={e => setData('degree', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree}</p>}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">From Year *</label>
                        <input
                            type="number"
                            value={data.from_year}
                            onChange={e => setData('from_year', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.from_year && <p className="text-red-500 text-sm mt-1">{errors.from_year}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">To Year *</label>
                        <input
                            type="number"
                            value={data.to_year}
                            onChange={e => setData('to_year', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.to_year && <p className="text-red-500 text-sm mt-1">{errors.to_year}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Highest Level / Units Earned</label>
                        <input
                            type="text"
                            value={data.units}
                            onChange={e => setData('units', e.target.value)}
                            placeholder="e.g., 72 units, 3rd year, etc."
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.units && <p className="text-red-500 text-sm mt-1">{errors.units}</p>}
                        <p className="text-xs text-gray-400 mt-1">Required if not graduated.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Year Graduated</label>
                        <input
                            type="number"
                            value={data.year_graduated}
                            onChange={e => setData('year_graduated', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.year_graduated && <p className="text-red-500 text-sm mt-1">{errors.year_graduated}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Honors / Awards</label>
                        <input
                            type="text"
                            value={data.honors}
                            onChange={e => setData('honors', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.honors && <p className="text-red-500 text-sm mt-1">{errors.honors}</p>}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 w-full sm:w-auto">
                        {processing ? 'Saving...' : 'Add Education'}
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
