import { useState } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import HRLayout from '@/Layouts/HRLayout';
import { Eye, Mail, Check, X, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

export default function Index() {
    const { applicants } = usePage().props;
    const [filterStatus, setFilterStatus] = useState('');
    const [showInviteModal, setShowInviteModal] = useState(null);
    const [showVerifyModal, setShowVerifyModal] = useState(null);
    const [showRejectModal, setShowRejectModal] = useState(null);

    const { post, processing } = useForm();

    const statusColors = {
        registered: 'bg-yellow-100 text-yellow-800',
        invited: 'bg-blue-100 text-blue-800',
        pds_in_progress: 'bg-indigo-100 text-indigo-800',
        pds_submitted: 'bg-purple-100 text-purple-800',
        under_review: 'bg-orange-100 text-orange-800',
        verified: 'bg-green-100 text-green-800',
        hired: 'bg-emerald-100 text-emerald-800',
        rejected: 'bg-red-100 text-red-800',
    };

    const handleInvite = (applicantId) => {
        post(route('hr.applicants.invite', applicantId), {
            preserveScroll: true,
            onSuccess: () => setShowInviteModal(null),
        });
    };

    const handleVerify = (applicantId) => {
        post(route('hr.applicants.verify', applicantId), {
            preserveScroll: true,
            onSuccess: () => setShowVerifyModal(null),
        });
    };

    const handleReject = (applicantId) => {
        post(route('hr.applicants.reject', applicantId), {
            preserveScroll: true,
            onSuccess: () => setShowRejectModal(null),
        });
    };

    const ActionModal = ({ title, message, confirmLabel, onConfirm, onCancel, confirmColor = 'bg-blue-600 hover:bg-blue-700' }) => (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{message}</p>
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${confirmColor}`}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );

    // Filter by status
    const filteredApplicants = filterStatus
        ? applicants.data.filter(app => app.status === filterStatus)
        : applicants.data;

    return (
        <HRLayout>
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
                    <div className="flex items-center space-x-2">
                        <Search className="h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            value={filterStatus}
                            onChange={e => setFilterStatus(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Statuses</option>
                            {Object.keys(statusColors).map(status => (
                                <option key={status} value={status}>{status.replace('_', ' ').toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-4 py-3">Application No.</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Invited At</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplicants.map((applicant) => (
                                <tr key={applicant.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{applicant.application_no}</td>
                                    <td className="px-4 py-3">{applicant.personal_information?.first_name} {applicant.personal_information?.last_name}</td>
                                    <td className="px-4 py-3">{applicant.user?.email}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[applicant.status] || 'bg-gray-100 text-gray-800'}`}>
                                            {applicant.status.replace('_', ' ').toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{applicant.invited_at ? new Date(applicant.invited_at).toLocaleDateString() : '—'}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center space-x-2">
                                            <Link href={route('hr.applicants.show', applicant.id)} className="text-blue-600 hover:text-blue-800">
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            {applicant.status === 'registered' && (
                                                <button onClick={() => setShowInviteModal(applicant.id)} className="text-green-600 hover:text-green-800">
                                                    <Mail className="h-4 w-4" />
                                                </button>
                                            )}
                                            {applicant.status === 'pds_submitted' && (
                                                <>
                                                    <button onClick={() => setShowVerifyModal(applicant.id)} className="text-emerald-600 hover:text-emerald-800">
                                                        <Check className="h-4 w-4" />
                                                    </button>
                                                    <button onClick={() => setShowRejectModal(applicant.id)} className="text-red-600 hover:text-red-800">
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredApplicants.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">No applicants found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-600">Showing {applicants.from || 0} to {applicants.to || 0} of {applicants.total || 0} results</p>
                    <div className="flex space-x-1">
                        {applicants.links?.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-3 py-1 rounded border ${link.active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showInviteModal && (
                <ActionModal
                    title="Invite Applicant"
                    message="Are you sure you want to invite this applicant to complete their PDS?"
                    confirmLabel="Invite"
                    onConfirm={() => handleInvite(showInviteModal)}
                    onCancel={() => setShowInviteModal(null)}
                    confirmColor="bg-green-600 hover:bg-green-700"
                />
            )}
            {showVerifyModal && (
                <ActionModal
                    title="Verify Applicant"
                    message="Are you sure you want to verify this applicant? This will mark them as a candidate for hiring."
                    confirmLabel="Verify"
                    onConfirm={() => handleVerify(showVerifyModal)}
                    onCancel={() => setShowVerifyModal(null)}
                    confirmColor="bg-emerald-600 hover:bg-emerald-700"
                />
            )}
            {showRejectModal && (
                <ActionModal
                    title="Reject Applicant"
                    message="Are you sure you want to reject this applicant? This action cannot be undone."
                    confirmLabel="Reject"
                    onConfirm={() => handleReject(showRejectModal)}
                    onCancel={() => setShowRejectModal(null)}
                    confirmColor="bg-red-600 hover:bg-red-700"
                />
            )}
        </HRLayout>
    );
}
