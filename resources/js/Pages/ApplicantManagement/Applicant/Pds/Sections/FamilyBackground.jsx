import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

// ✅ Helper: format date to "Jul 8, 2026"
const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export default function FamilyBackground({ applicant, readonly = false }) {
    const spouse = applicant.spouse || {};
    const father = applicant.father || {};
    const mother = applicant.mother || {};
    const children = applicant.children || [];

    const [sections, setSections] = useState({
        spouse: Object.keys(spouse).some(k => spouse[k] && spouse[k].length > 0),
        parents: true,
        children: children.length > 0,
    });

    const toggleSection = (section) => {
        setSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        spouse: {
            surname: spouse.surname || '',
            first_name: spouse.first_name || '',
            middle_name: spouse.middle_name || '',
            extension_name: spouse.extension_name || '',
            occupation: spouse.occupation || '',
            employer_business_name: spouse.employer_business_name || '',
            business_address: spouse.business_address || '',
            telephone_number: spouse.telephone_number || '',
        },
        father: {
            surname: father.surname || '',
            first_name: father.first_name || '',
            middle_name: father.middle_name || '',
            extension_name: father.extension_name || '',
        },
        mother: {
            surname: mother.surname || '',
            first_name: mother.first_name || '',
            middle_name: mother.middle_name || '',
            extension_name: mother.extension_name || '',
        },
    });

    const childForm = useForm({ full_name: '', birth_date: '' });

    const submitFamily = (e) => {
        e.preventDefault();
        post(route('applicant.pds.family'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const addChild = (e) => {
        e.preventDefault();
        childForm.post(route('applicant.pds.children.add'), {
            preserveScroll: true,
            onSuccess: () => childForm.reset(),
        });
    };

    const deleteChild = (id) => {
        if (confirm('Remove this child?')) {
            childForm.delete(route('applicant.pds.children.destroy', id), { preserveScroll: true });
        }
    };

    if (readonly) {
        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">Family Background</h2>
                <div className="space-y-4">
                    {spouse && Object.keys(spouse).length > 0 && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="font-medium">Spouse</p>
                            <p className="text-sm">{spouse.first_name} {spouse.surname}</p>
                        </div>
                    )}
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium">Father</p>
                        <p className="text-sm">{father.first_name} {father.surname}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium">Mother</p>
                        <p className="text-sm">{mother.first_name} {mother.surname}</p>
                    </div>
                    {children.length > 0 && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="font-medium">Children</p>
                            {children.map(c => (
                                <p key={c.id} className="text-sm">{c.full_name} {formatDate(c.birth_date)}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Family Background</h2>

            {/* ===== MAIN FORM – Spouse + Parents ===== */}
            <form onSubmit={submitFamily} className="space-y-4">
                {/* Spouse Section */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                        type="button"
                        onClick={() => toggleSection('spouse')}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition"
                    >
                        <span className="font-medium text-gray-700">Spouse (Optional)</span>
                        {sections.spouse ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                    </button>
                    {sections.spouse && (
                        <div className="p-4 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Surname</label>
                                    <input type="text" value={data.spouse.surname} onChange={e => setData('spouse.surname', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input type="text" value={data.spouse.first_name} onChange={e => setData('spouse.first_name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                                    <input type="text" value={data.spouse.middle_name} onChange={e => setData('spouse.middle_name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Extension</label>
                                    <input type="text" value={data.spouse.extension_name} onChange={e => setData('spouse.extension_name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Occupation</label>
                                    <input type="text" value={data.spouse.occupation} onChange={e => setData('spouse.occupation', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Employer/Business</label>
                                    <input type="text" value={data.spouse.employer_business_name} onChange={e => setData('spouse.employer_business_name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Business Address</label>
                                    <input type="text" value={data.spouse.business_address} onChange={e => setData('spouse.business_address', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Telephone</label>
                                    <input type="text" value={data.spouse.telephone_number} onChange={e => setData('spouse.telephone_number', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Parents Section */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                        type="button"
                        onClick={() => toggleSection('parents')}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition"
                    >
                        <span className="font-medium text-gray-700">Parents <span className="text-red-500">*</span></span>
                        {sections.parents ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                    </button>
                    {sections.parents && (
                        <div className="p-4 space-y-4">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Father</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Surname *</label>
                                        <input type="text" value={data.father.surname} onChange={e => setData('father.surname', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                        {errors['father.surname'] && <p className="text-red-500 text-sm">{errors['father.surname']}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">First Name *</label>
                                        <input type="text" value={data.father.first_name} onChange={e => setData('father.first_name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                        {errors['father.first_name'] && <p className="text-red-500 text-sm">{errors['father.first_name']}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                                        <input type="text" value={data.father.middle_name} onChange={e => setData('father.middle_name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Extension</label>
                                        <input type="text" value={data.father.extension_name} onChange={e => setData('father.extension_name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Mother</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Surname *</label>
                                        <input type="text" value={data.mother.surname} onChange={e => setData('mother.surname', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                        {errors['mother.surname'] && <p className="text-red-500 text-sm">{errors['mother.surname']}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">First Name *</label>
                                        <input type="text" value={data.mother.first_name} onChange={e => setData('mother.first_name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                        {errors['mother.first_name'] && <p className="text-red-500 text-sm">{errors['mother.first_name']}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                                        <input type="text" value={data.mother.middle_name} onChange={e => setData('mother.middle_name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Extension</label>
                                        <input type="text" value={data.mother.extension_name} onChange={e => setData('mother.extension_name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Save Button for Family Info */}
                <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm p-4 -mx-4 rounded-t-xl shadow-lg border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save Family Information'}
                    </button>
                </div>
            </form>

            {/* ===== CHILDREN SECTION – OUTSIDE THE MAIN FORM ===== */}
            <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
                <button
                    type="button"
                    onClick={() => toggleSection('children')}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition"
                >
                    <span className="font-medium text-gray-700">Children</span>
                    {sections.children ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                </button>
                {sections.children && (
                    <div className="p-4 space-y-4">
                        <div className="space-y-2">
                            {children.length > 0 ? (
                                children.map((child) => (
                                    <div key={child.id} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                                        <div>
                                            <p className="font-medium">{child.full_name}</p>
                                            {/* ✅ Formatted birth date */}
                                            <p className="text-sm text-gray-500">{formatDate(child.birth_date)}</p>
                                        </div>
                                        <button onClick={() => deleteChild(child.id)} className="text-red-600 hover:text-red-800">
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No children added.</p>
                            )}
                        </div>

                        <form onSubmit={addChild} className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="Full Name *"
                                value={childForm.data.full_name}
                                onChange={e => childForm.setData('full_name', e.target.value)}
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <input
                                type="date"
                                placeholder="Birth Date"
                                value={childForm.data.birth_date}
                                onChange={e => childForm.setData('birth_date', e.target.value)}
                                className="w-full sm:w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                disabled={childForm.processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                Add Child
                            </button>
                        </form>
                        {childForm.errors.full_name && <p className="text-red-500 text-sm mt-1">{childForm.errors.full_name}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
