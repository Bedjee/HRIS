import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';

const AddressForm = React.memo(({ type, data, setData, errors, processing, submit }) => (
    <form onSubmit={submit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium">{type} Address</h3>
        <input type="hidden" value={type} readOnly />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">House No.</label>
                <input type="text" value={data.house_no} onChange={e => setData('house_no', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Street</label>
                <input type="text" value={data.street} onChange={e => setData('street', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Subdivision</label>
                <input type="text" value={data.subdivision} onChange={e => setData('subdivision', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Barangay *</label>
                <input type="text" value={data.barangay} onChange={e => setData('barangay', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                {errors.barangay && <p className="text-red-500 text-sm mt-1">{errors.barangay}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">City/Municipality *</label>
                <input type="text" value={data.city} onChange={e => setData('city', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Province *</label>
                <input type="text" value={data.province} onChange={e => setData('province', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Zip Code *</label>
                <input type="text" value={data.zip_code} onChange={e => setData('zip_code', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                {errors.zip_code && <p className="text-red-500 text-sm mt-1">{errors.zip_code}</p>}
            </div>
        </div>
        <div className="flex justify-end">
            <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 w-full sm:w-auto">
                {processing ? 'Saving...' : `Save ${type} Address`}
            </button>
        </div>
    </form>
));

export default function Addresses({ applicant, readonly = false }) {
    const addresses = applicant.addresses || [];
    const residential = addresses.find(a => a.type === 'Residential');
    const permanent = addresses.find(a => a.type === 'Permanent');

    const { data, setData, post, processing, errors, reset } = useForm({
        type: 'Residential',
        house_no: '',
        street: '',
        subdivision: '',
        barangay: '',
        city: '',
        province: '',
        zip_code: '',
    });

    const [editingType, setEditingType] = useState(null);

    const startEditing = (type) => {
        const existing = type === 'Residential' ? residential : permanent;
        setData({
            type: type,
            house_no: existing?.house_no || '',
            street: existing?.street || '',
            subdivision: existing?.subdivision || '',
            barangay: existing?.barangay || '',
            city: existing?.city || '',
            province: existing?.province || '',
            zip_code: existing?.zip_code || '',
        });
        setEditingType(type);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('applicant.pds.address'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setEditingType(null);
            },
        });
    };

    if (readonly) {
        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">Addresses</h2>
                {addresses.length > 0 ? (
                    addresses.map((addr) => (
                        <div key={addr.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                            <p className="font-medium">{addr.type} Address</p>
                            <p className="text-sm text-gray-600">{addr.house_no} {addr.street}, {addr.barangay}, {addr.city}, {addr.province} {addr.zip_code}</p>
                        </div>
                    ))
                ) : <p className="text-gray-500 text-sm">No addresses provided.</p>}
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Addresses</h2>

            {residential ? (
                <div className="mb-4 p-4 bg-green-50 rounded-lg">
                    <p className="font-medium">Residential Address</p>
                    <p className="text-sm text-gray-600">{residential.house_no} {residential.street}, {residential.barangay}, {residential.city}, {residential.province} {residential.zip_code}</p>
                    <button onClick={() => startEditing('Residential')} className="mt-2 text-sm text-blue-600 hover:text-blue-800">Edit</button>
                </div>
            ) : (
                <button onClick={() => startEditing('Residential')} className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">Add Residential Address</button>
            )}

            {permanent ? (
                <div className="mb-4 p-4 bg-green-50 rounded-lg">
                    <p className="font-medium">Permanent Address</p>
                    <p className="text-sm text-gray-600">{permanent.house_no} {permanent.street}, {permanent.barangay}, {permanent.city}, {permanent.province} {permanent.zip_code}</p>
                    <button onClick={() => startEditing('Permanent')} className="mt-2 text-sm text-blue-600 hover:text-blue-800">Edit</button>
                </div>
            ) : (
                <button onClick={() => startEditing('Permanent')} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">Add Permanent Address</button>
            )}

            {editingType && (
                <div className="mt-4">
                    <AddressForm type={editingType} data={data} setData={setData} errors={errors} processing={processing} submit={submit} />
                    <button onClick={() => { setEditingType(null); reset(); }} className="mt-2 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                </div>
            )}
        </div>
    );
}
