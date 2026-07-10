import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function OtherInfo({ applicant, readonly = false }) {
    const skills = applicant.skills || [];
    const recognitions = applicant.recognitions || [];
    const memberships = applicant.memberships || [];

    // Check if any sub‑section is skipped (we check all three)
    const isSkipped = skills.some(s => s.is_skipped) ||
                     recognitions.some(r => r.is_skipped) ||
                     memberships.some(m => m.is_skipped);

    const [isSkippedState, setIsSkippedState] = useState(isSkipped);

    // Forms for each sub‑section
    const skillForm = useForm({ skill: '' });
    const recognitionForm = useForm({ recognition: '' });
    const membershipForm = useForm({ organization: '' });

    // Skip / Unskip
    const skipSection = () => {
        if (!confirm('Are you sure you want to skip this section? All existing data will be removed and marked as "N/A".')) return;
        skillForm.post(route('applicant.pds.other-info.skip'), {
            preserveScroll: true,
            onSuccess: () => setIsSkippedState(true),
        });
    };

    const unskipSection = () => {
        skillForm.post(route('applicant.pds.other-info.unskip'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsSkippedState(false);
                // Reset all forms
                skillForm.reset();
                recognitionForm.reset();
                membershipForm.reset();
            },
        });
    };

    // Add methods
    const addSkill = (e) => {
        e.preventDefault();
        skillForm.post(route('applicant.pds.skill'), {
            preserveScroll: true,
            onSuccess: () => skillForm.reset(),
        });
    };

    const addRecognition = (e) => {
        e.preventDefault();
        recognitionForm.post(route('applicant.pds.recognition'), {
            preserveScroll: true,
            onSuccess: () => recognitionForm.reset(),
        });
    };

    const addMembership = (e) => {
        e.preventDefault();
        membershipForm.post(route('applicant.pds.membership'), {
            preserveScroll: true,
            onSuccess: () => membershipForm.reset(),
        });
    };

    // Delete
    const deleteItem = (type, id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            const routes = {
                skill: route('applicant.pds.skill.destroy', id),
                recognition: route('applicant.pds.recognition.destroy', id),
                membership: route('applicant.pds.membership.destroy', id),
            };
            skillForm.delete(routes[type], { preserveScroll: true });
        }
    };

    // Read‑only mode
    if (readonly) {
        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">Other Information</h2>
                {skills.length > 0 && skills.some(s => !s.is_skipped) && (
                    <div className="mb-4">
                        <h3 className="text-lg font-medium mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-1">
                            {skills.filter(s => !s.is_skipped).map((s) => (
                                <span key={s.id} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">{s.skill}</span>
                            ))}
                        </div>
                    </div>
                )}
                {recognitions.length > 0 && recognitions.some(r => !r.is_skipped) && (
                    <div className="mb-4">
                        <h3 className="text-lg font-medium mb-2">Recognitions</h3>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                            {recognitions.filter(r => !r.is_skipped).map((r) => <li key={r.id}>{r.recognition}</li>)}
                        </ul>
                    </div>
                )}
                {memberships.length > 0 && memberships.some(m => !m.is_skipped) && (
                    <div>
                        <h3 className="text-lg font-medium mb-2">Memberships</h3>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                            {memberships.filter(m => !m.is_skipped).map((m) => <li key={m.id}>{m.organization}</li>)}
                        </ul>
                    </div>
                )}
                {skills.every(s => s.is_skipped) && recognitions.every(r => r.is_skipped) && memberships.every(m => m.is_skipped) && (
                    <p className="text-gray-500 text-sm">All sub‑sections have been marked as N/A.</p>
                )}
                {skills.length === 0 && recognitions.length === 0 && memberships.length === 0 && (
                    <p className="text-gray-500 text-sm">No other information provided.</p>
                )}
            </div>
        );
    }

    // Skipped state
    if (isSkippedState) {
        return (
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Other Information</h2>
                    <button
                        onClick={unskipSection}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Edit Section
                    </button>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-500">
                    <p>You have skipped this section. All fields have been marked as <strong>N/A</strong>.</p>
                    <p className="text-sm mt-1">Click the <strong>"Edit Section"</strong> button above to add records.</p>
                </div>
            </div>
        );
    }

    // Normal (editable) state – render all three sub‑sections
    const renderList = (items, label, type, form, addHandler, formErrors) => (
        <div className="space-y-2">
            {items.filter(item => !item.is_skipped).length > 0 ? (
                items.filter(item => !item.is_skipped).map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>{item[type] || item.organization || item.recognition}</span>
                        <button
                            onClick={() => deleteItem(type, item.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                        >
                            Remove
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 text-sm">No {label} added yet.</p>
            )}
            <form onSubmit={addHandler} className="mt-2 flex gap-2">
                <input
                    type="text"
                    value={form.data[type] || form.data.organization || ''}
                    onChange={e => form.setData(type, e.target.value)}
                    placeholder={`Enter ${label.slice(0, -1)}`}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={form.processing}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    Add
                </button>
            </form>
            {formErrors && <p className="text-red-500 text-sm mt-1">{formErrors}</p>}
        </div>
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Other Information</h2>
                <button
                    onClick={skipSection}
                    className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    Skip This Section
                </button>
            </div>

            {/* Skills */}
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Skills</h3>
                {renderList(
                    skills,
                    'skills',
                    'skill',
                    skillForm,
                    addSkill,
                    skillForm.errors.skill
                )}
            </div>

            {/* Recognitions */}
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Recognitions</h3>
                {renderList(
                    recognitions,
                    'recognitions',
                    'recognition',
                    recognitionForm,
                    addRecognition,
                    recognitionForm.errors.recognition
                )}
            </div>

            {/* Memberships */}
            <div>
                <h3 className="text-lg font-medium mb-2">Memberships</h3>
                {renderList(
                    memberships,
                    'memberships',
                    'organization',
                    membershipForm,
                    addMembership,
                    membershipForm.errors.organization
                )}
            </div>
        </div>
    );
}
