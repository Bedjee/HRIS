import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { X, ChevronDown, ChevronUp, Info } from 'lucide-react';

export default function References({ applicant, readonly = false }) {
    const references = applicant.references || [];
    const [expandedId, setExpandedId] = useState(null);
    const referenceCount = references.filter(r => !r.is_skipped).length;
    const isComplete = referenceCount === 3;

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        address: '',
        contact: '',
    });

    const [editing, setEditing] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        post(route('applicant.pds.reference'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setEditing(null);
            },
        });
    };

    const deleteReference = (id) => {
        if (confirm('Are you sure you want to delete this reference?')) {
            destroy(route('applicant.pds.reference.destroy', id), { preserveScroll: true });
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // Read‑only mode
    if (readonly) {
        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">References</h2>
                {references.length > 0 ? (
                    references.map((ref) => (
                        <div key={ref.id} className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="font-medium">{ref.name}</p>
                            <p className="text-sm text-gray-600">{ref.address}</p>
                            <p className="text-sm text-gray-500">Contact: {ref.contact}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No references.</p>
                )}
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">References</h2>
                <span className="text-sm font-medium text-gray-500">
                    {referenceCount} / 3
                </span>
            </div>

            {/* ✅ Instructional message */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Please provide exactly <strong>three (3)</strong> references as required by the PDS.
                    Each reference should include the name, office/residential address, and contact number or email address.
                </p>
            </div>

            {/* Progress indicator */}
            {!isComplete && (
                <p className="text-sm text-gray-600 mb-4">
                    You have added {referenceCount} of 3 required references. Please add {3 - referenceCount} more.
                </p>
            )}
            {isComplete && (
                <p className="text-sm text-green-600 mb-4">
                    ✅ All 3 references have been added.
                </p>
            )}

            {/* Reference list */}
            <div className="space-y-2 mb-4">
                {references.length > 0 ? (
                    references.map((ref) => {
                        const isExpanded = expandedId === ref.id;
                        return (
                            <div
                                key={ref.id}
                                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                <button
                                    onClick={() => toggleExpand(ref.id)}
                                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition text-left"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-800 truncate">{ref.name}</p>
                                        <p className="text-sm text-gray-500 truncate">{ref.address}</p>
                                    </div>
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
                                            <span className="font-medium">Name:</span> {ref.name}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Address:</span> {ref.address}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Contact:</span> {ref.contact}
                                        </p>
                                        <div className="mt-3 flex justify-end">
                                            <button
                                                onClick={() => deleteReference(ref.id)}
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
                    <p className="text-gray-500 text-sm">No references added yet.</p>
                )}
            </div>

            {/* Add form – only shown when fewer than 3 references */}
            {!isComplete && (
                <form onSubmit={submit} className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-medium">Add Reference</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name *</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact *</label>
                            <input
                                type="text"
                                value={data.contact}
                                onChange={e => setData('contact', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Address *</label>
                            <input
                                type="text"
                                value={data.address}
                                onChange={e => setData('address', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Add Reference'}
                        </button>
                    </div>
                </form>
            )}

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
