import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function FamilyMembers({ applicant, readonly = false }) {
    const familyMembers = applicant.family_members || [];
    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        relationship: '',
        full_name: '',
        birth_date: '',
        occupation: '',
        contact_no: '',
        address: '',
    });
    const [editing, setEditing] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        post(route('applicant.pds.family'), {
            preserveScroll: true,
            onSuccess: () => { reset(); setEditing(null); },
        });
    };

    const deleteMember = (id) => {
        if (confirm('Are you sure you want to delete this family member?')) {
            destroy(route('applicant.pds.family.destroy', id), { preserveScroll: true });
        }
    };

    if (readonly) {
        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">Family Background</h2>
                {familyMembers.length > 0 ? (
                    familyMembers.map((member) => (
                        <div key={member.id} className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="font-medium">{member.full_name}</p>
                            <p className="text-sm text-gray-600">{member.relationship} {member.occupation ? `- ${member.occupation}` : ''}</p>
                        </div>
                    ))
                ) : <p className="text-gray-500 text-sm">No family members listed.</p>}
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Family Background</h2>
            <div className="space-y-2 mb-4">
                {familyMembers.map((member) => (
                    <div key={member.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium">{member.full_name}</p>
                            <p className="text-sm text-gray-600">{member.relationship} {member.occupation ? `- ${member.occupation}` : ''}</p>
                        </div>
                        <button onClick={() => deleteMember(member.id)} className="text-red-600 hover:text-red-800 text-sm mt-1 sm:mt-0">Remove</button>
                    </div>
                ))}
                {familyMembers.length === 0 && <p className="text-gray-500 text-sm">No family members added yet.</p>}
            </div>

            <form onSubmit={submit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Add Family Member</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Relationship *</label>
                        <select value={data.relationship} onChange={e => setData('relationship', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Child">Child</option>
                            <option value="Sibling">Sibling</option>
                        </select>
                        {errors.relationship && <p className="text-red-500 text-sm mt-1">{errors.relationship}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                        <input type="text" value={data.full_name} onChange={e => setData('full_name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Birth Date</label>
                        <input type="date" value={data.birth_date} onChange={e => setData('birth_date', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Occupation</label>
                        <input type="text" value={data.occupation} onChange={e => setData('occupation', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contact No.</label>
                        <input type="text" value={data.contact_no} onChange={e => setData('contact_no', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" value={data.address} onChange={e => setData('address', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 w-full sm:w-auto">
                        {processing ? 'Saving...' : 'Add Family Member'}
                    </button>
                </div>
            </form>
        </div>
    );
}
