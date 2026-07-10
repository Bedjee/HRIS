import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Education({ applicant, readonly = false }) {
    const educations = applicant.educations || [];
    const isSkipped = educations.some(e => e.is_skipped) || false;
    const [isSkippedState, setIsSkippedState] = useState(isSkipped);

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

    // Unskip section
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
                        <p className="font-medium">{edu.is_skipped ? 'N/A' : edu.school_name}</p>
                        {!edu.is_skipped && (
                            <>
                                <p className="text-sm text-gray-600">{edu.level} {edu.degree ? `- ${edu.degree}` : ''} ({edu.from_year} - {edu.to_year})</p>
                                {edu.year_graduated && <p className="text-sm text-gray-500">Graduated: {edu.year_graduated}</p>}
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

            <div className="space-y-2 mb-4">
                {educations.filter(e => !e.is_skipped).length > 0 ? (
                    educations.filter(e => !e.is_skipped).map((edu) => (
                        <div key={edu.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium">{edu.school_name}</p>
                                <p className="text-sm text-gray-600">{edu.level} {edu.degree ? `- ${edu.degree}` : ''} ({edu.from_year} - {edu.to_year})</p>
                            </div>
                            <button onClick={() => deleteEducation(edu.id)} className="text-red-600 hover:text-red-800 text-sm mt-1 sm:mt-0">Remove</button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No education records added yet.</p>
                )}
            </div>

            <form onSubmit={submit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Add Education</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Level *</label>
                        <input type="text" value={data.level} onChange={e => setData('level', e.target.value)} placeholder="e.g., Elementary, High School, College" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">School Name *</label>
                        <input type="text" value={data.school_name} onChange={e => setData('school_name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        {errors.school_name && <p className="text-red-500 text-sm mt-1">{errors.school_name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Degree</label>
                        <input type="text" value={data.degree} onChange={e => setData('degree', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">From Year *</label>
                        <input type="number" value={data.from_year} onChange={e => setData('from_year', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        {errors.from_year && <p className="text-red-500 text-sm mt-1">{errors.from_year}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">To Year *</label>
                        <input type="number" value={data.to_year} onChange={e => setData('to_year', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        {errors.to_year && <p className="text-red-500 text-sm mt-1">{errors.to_year}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Units</label>
                        <input type="text" value={data.units} onChange={e => setData('units', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Year Graduated</label>
                        <input type="number" value={data.year_graduated} onChange={e => setData('year_graduated', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Honors</label>
                        <input type="text" value={data.honors} onChange={e => setData('honors', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 w-full sm:w-auto">
                        {processing ? 'Saving...' : 'Add Education'}
                    </button>
                </div>
            </form>
        </div>
    );
}
