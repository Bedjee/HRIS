import { useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';

export default function Documents({ applicant, readonly = false }) {
    const documents = applicant.documents || [];
    const fileInputRef = useRef(null);

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        document_type: '',
        file: null,
    });

    const [uploading, setUploading] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setUploading(true);
        post(route('applicant.pds.documents'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setUploading(false);
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
            onError: () => setUploading(false),
        });
    };

    const removeDocument = (id) => {
        if (confirm('Are you sure you want to remove this document?')) {
            destroy(route('applicant.pds.documents.destroy', id), { preserveScroll: true });
        }
    };

    if (readonly) {
        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>
                {documents.length > 0 ? (
                    documents.map((doc) => (
                        <div key={doc.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2">
                            <div>
                                <p className="font-medium">{doc.document_type}</p>
                                <p className="text-sm text-gray-600">{doc.file_name}</p>
                                <p className={`text-sm ${doc.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {doc.verified ? '✅ Verified' : '⏳ Pending Verification'}
                                    {doc.rejection_reason && ` - ${doc.rejection_reason}`}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No documents uploaded.</p>
                )}
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>

            <div className="space-y-2 mb-4">
                {documents.map((doc) => (
                    <div key={doc.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{doc.document_type}</p>
                            <p className="text-sm text-gray-600 truncate">{doc.file_name}</p>
                            {doc.verified !== undefined && (
                                <p className={`text-sm ${doc.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {doc.verified ? '✅ Verified' : '⏳ Pending Verification'}
                                    {doc.rejection_reason && ` - ${doc.rejection_reason}`}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => removeDocument(doc.id)}
                            className="ml-2 text-red-600 hover:text-red-800 text-xl font-bold leading-none px-2"
                            title="Remove document"
                        >
                            ×
                        </button>
                    </div>
                ))}
                {documents.length === 0 && <p className="text-gray-500 text-sm">No documents uploaded yet.</p>}
            </div>

            <form onSubmit={submit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Upload Document</h3>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Document Type *</label>
                        <select
                            value={data.document_type}
                            onChange={e => setData('document_type', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Select type</option>
                            <option value="birth_certificate">Birth Certificate</option>
                            <option value="diploma">Diploma</option>
                            <option value="tor">Transcript of Records</option>
                            <option value="eligibility">Eligibility Certificate</option>
                            <option value="resume">Resume/CV</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.document_type && <p className="text-red-500 text-sm mt-1">{errors.document_type}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">File *</label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={e => setData('file', e.target.files[0])}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-gray-500 mt-1">Allowed: PDF, JPG, PNG, GIF, DOC, DOCX (max 5MB)</p>
                        {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing || uploading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {uploading ? 'Uploading...' : 'Upload Document'}
                    </button>
                </div>
            </form>
        </div>
    );
}
