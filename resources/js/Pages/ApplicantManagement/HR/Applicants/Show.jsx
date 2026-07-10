import { useState } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import HRLayout from '@/Layouts/HRLayout';
import {
    User,
    Mail,
    Calendar,
    MapPin,
    Users,
    GraduationCap,
    Award,
    Briefcase,
    HeartHandshake,
    BookOpen,
    CheckCircle,
    XCircle,
    FileText,
    Download,
    Eye,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';

export default function Show() {
    const { applicant } = usePage().props;
    const [activeTab, setActiveTab] = useState('profile');
    const [verifyModal, setVerifyModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);

    const { post, processing } = useForm();

    // ✅ Helper: format dates consistently
    const formatDate = (dateString) => {
        if (!dateString) return '—';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

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

    const handleVerify = () => {
        post(route('hr.applicants.verify', applicant.id), {
            preserveScroll: true,
            onSuccess: () => setVerifyModal(false),
        });
    };

    const handleReject = () => {
        post(route('hr.applicants.reject', applicant.id), {
            preserveScroll: true,
            onSuccess: () => setRejectModal(false),
        });
    };

    const handleDocumentVerify = (documentId, verified) => {
        const reason = verified ? '' : prompt('Rejection reason (optional):');
        if (verified || reason !== null) {
            post(route('hr.applicants.documents.verify', [applicant.id, documentId]), {
                data: { verified, rejection_reason: reason || '' },
                preserveScroll: true,
            });
        }
    };

    // Accordion section component
    const SectionCard = ({ title, icon: Icon, children, defaultOpen = false }) => {
        const [open, setOpen] = useState(defaultOpen);
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
                >
                    <div className="flex items-center space-x-2">
                        <Icon className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    </div>
                    {open ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                {open && <div className="p-4 pt-0 border-t border-gray-100">{children}</div>}
            </div>
        );
    };

    const InfoRow = ({ label, value, emptyText = '—' }) => (
        <div className="flex py-1.5 border-b border-gray-50 last:border-0">
            <span className="w-1/3 text-sm font-medium text-gray-500">{label}</span>
            <span className="w-2/3 text-sm text-gray-900">{value || emptyText}</span>
        </div>
    );

    // Tabs configuration
    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'education-work', label: 'Education & Work', icon: GraduationCap },
        { id: 'other-info', label: 'Other Info', icon: FileText },
        { id: 'documents', label: 'Documents', icon: FileText },
    ];

    // Render functions for each tab
    const renderProfileTab = () => (
        <>
            <SectionCard title="Personal Information" icon={User}>
                {applicant.personal_information ? (
                    <>
                        <InfoRow label="Surname" value={applicant.personal_information.surname} />
                        <InfoRow label="First Name" value={applicant.personal_information.first_name} />
                        <InfoRow label="Middle Name" value={applicant.personal_information.middle_name} />
                        <InfoRow label="Extension" value={applicant.personal_information.extension_name} />
                        {/* ✅ Formatted birth date */}
                        <InfoRow label="Birth Date" value={formatDate(applicant.personal_information.birth_date)} />
                        <InfoRow label="Birth Place" value={applicant.personal_information.birth_place} />
                        <InfoRow label="Sex" value={applicant.personal_information.sex} />
                        <InfoRow label="Civil Status" value={applicant.personal_information.civil_status} />
                        <InfoRow label="Citizenship" value={applicant.personal_information.citizenship} />
                        <InfoRow label="Dual Citizenship" value={applicant.personal_information.dual_citizenship_type} />
                        <InfoRow label="Dual Country" value={applicant.personal_information.dual_country} />
                        <InfoRow label="Height" value={applicant.personal_information.height} />
                        <InfoRow label="Weight" value={applicant.personal_information.weight} />
                        <InfoRow label="Blood Type" value={applicant.personal_information.blood_type} />
                        <InfoRow label="PhilHealth" value={applicant.personal_information.philhealth_no} />
                        <InfoRow label="Philsys" value={applicant.personal_information.philsys_no} />
                        <InfoRow label="Pag-IBIG" value={applicant.personal_information.pagibig_no} />
                        <InfoRow label="TIN" value={applicant.personal_information.tin_no} />
                        <InfoRow label="Agency Employee No." value={applicant.personal_information.agency_employee_no} />
                        <InfoRow label="Telephone" value={applicant.personal_information.telephone} />
                        <InfoRow label="Mobile" value={applicant.personal_information.mobile} />
                    </>
                ) : (
                    <p className="text-gray-500 text-sm">No personal information provided yet.</p>
                )}
            </SectionCard>

            <SectionCard title="Addresses" icon={MapPin}>
                {applicant.addresses?.length > 0 ? (
                    applicant.addresses.map((addr) => (
                        <div key={addr.id} className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="font-medium text-gray-700">{addr.type} Address</p>
                            <p className="text-sm text-gray-600">
                                {addr.house_no} {addr.street}, {addr.barangay}, {addr.city}, {addr.province} {addr.zip_code}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No addresses provided.</p>
                )}
            </SectionCard>

            <SectionCard title="Family Background" icon={Users}>
                {applicant.family_members?.length > 0 ? (
                    applicant.family_members.map((member) => (
                        <div key={member.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 mb-2">
                            <p className="font-medium">{member.full_name}</p>
                            <p className="text-sm text-gray-600">Relationship: {member.relationship}</p>
                            {member.occupation && <p className="text-sm text-gray-600">Occupation: {member.occupation}</p>}
                            {/* ✅ Formatted birth date for family members */}
                            {member.birth_date && <p className="text-sm text-gray-600">Birth: {formatDate(member.birth_date)}</p>}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No family members listed.</p>
                )}
            </SectionCard>
        </>
    );

    const renderEducationWorkTab = () => (
        <>
            <SectionCard title="Educational Background" icon={GraduationCap}>
                {applicant.educations?.length > 0 ? (
                    applicant.educations.map((edu) => (
                        <div key={edu.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 mb-2">
                            <p className="font-medium">{edu.school_name}</p>
                            <p className="text-sm text-gray-600">{edu.level} {edu.degree ? `- ${edu.degree}` : ''}</p>
                            <p className="text-sm text-gray-500">{edu.from_year} - {edu.to_year}</p>
                            {edu.year_graduated && <p className="text-sm text-gray-500">Graduated: {edu.year_graduated}</p>}
                            {edu.honors && <p className="text-sm text-gray-500">Honors: {edu.honors}</p>}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No education records.</p>
                )}
            </SectionCard>

            <SectionCard title="Civil Service Eligibility" icon={Award}>
                {applicant.eligibilities?.length > 0 ? (
                    applicant.eligibilities.map((elig) => (
                        <div key={elig.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 mb-2">
                            <p className="font-medium">{elig.eligibility_name}</p>
                            {elig.rating && <p className="text-sm text-gray-600">Rating: {elig.rating}</p>}
                            {/* ✅ Formatted exam date */}
                            {elig.exam_date && <p className="text-sm text-gray-600">Exam: {formatDate(elig.exam_date)}</p>}
                            {elig.license_number && <p className="text-sm text-gray-600">License: {elig.license_number}</p>}
                            {/* ✅ Formatted valid until date */}
                            {elig.valid_until && <p className="text-sm text-gray-600">Valid Until: {formatDate(elig.valid_until)}</p>}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No eligibilities recorded.</p>
                )}
            </SectionCard>

            <SectionCard title="Work Experience" icon={Briefcase}>
                {applicant.work_experiences?.length > 0 ? (
                    applicant.work_experiences.map((exp) => (
                        <div key={exp.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 mb-2">
                            <p className="font-medium">{exp.position} - {exp.company}</p>
                            {/* ✅ Formatted dates */}
                            <p className="text-sm text-gray-600">{formatDate(exp.date_from)} - {exp.date_to ? formatDate(exp.date_to) : 'Present'}</p>
                            {exp.salary && <p className="text-sm text-gray-600">Salary: ₱{exp.salary}</p>}
                            {exp.appointment_status && <p className="text-sm text-gray-600">Status: {exp.appointment_status}</p>}
                            <p className="text-sm text-gray-500">{exp.government_service ? 'Government Service' : 'Private Sector'}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No work experience.</p>
                )}
            </SectionCard>

            <SectionCard title="Voluntary Work" icon={HeartHandshake}>
                {applicant.voluntary_works?.length > 0 ? (
                    applicant.voluntary_works.map((vw) => (
                        <div key={vw.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 mb-2">
                            <p className="font-medium">{vw.position} - {vw.organization}</p>
                            {/* ✅ Formatted dates */}
                            <p className="text-sm text-gray-600">{formatDate(vw.date_from)} - {vw.date_to ? formatDate(vw.date_to) : 'Present'}</p>
                            {vw.hours && <p className="text-sm text-gray-600">Hours: {vw.hours}</p>}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No voluntary work.</p>
                )}
            </SectionCard>

            <SectionCard title="Trainings" icon={BookOpen}>
                {applicant.trainings?.length > 0 ? (
                    applicant.trainings.map((t) => (
                        <div key={t.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 mb-2">
                            <p className="font-medium">{t.training_title}</p>
                            {/* ✅ Formatted dates */}
                            <p className="text-sm text-gray-600">{formatDate(t.date_from)} - {t.date_to ? formatDate(t.date_to) : 'Present'}</p>
                            {t.type && <p className="text-sm text-gray-600">Type: {t.type}</p>}
                            {t.hours && <p className="text-sm text-gray-600">Hours: {t.hours}</p>}
                            <p className="text-sm text-gray-500">Conducted by: {t.conducted_by}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No trainings.</p>
                )}
            </SectionCard>
        </>
    );

    const renderOtherInfoTab = () => (
        <>
            <SectionCard title="Other Information" icon={FileText}>
                {applicant.skills?.length > 0 && (
                    <div className="mb-3">
                        <p className="font-medium text-gray-700">Skills</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {applicant.skills.map((s) => (
                                <span key={s.id} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">{s.skill}</span>
                            ))}
                        </div>
                    </div>
                )}
                {applicant.recognitions?.length > 0 && (
                    <div className="mb-3">
                        <p className="font-medium text-gray-700">Recognitions</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                            {applicant.recognitions.map((r) => (
                                <li key={r.id}>{r.recognition}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {applicant.memberships?.length > 0 && (
                    <div>
                        <p className="font-medium text-gray-700">Memberships</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                            {applicant.memberships.map((m) => (
                                <li key={m.id}>{m.organization}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {!applicant.skills?.length && !applicant.recognitions?.length && !applicant.memberships?.length && (
                    <p className="text-gray-500 text-sm">No other information provided.</p>
                )}
            </SectionCard>

            <SectionCard title="Questionnaire" icon={CheckCircle}>
                {applicant.questionnaire ? (
                    <div className="space-y-2 text-sm">
                        <InfoRow label="Q34a - Third degree" value={applicant.questionnaire.q34_a ? 'Yes' : 'No'} />
                        <InfoRow label="Q34a - Fourth degree" value={applicant.questionnaire.q34_a_fourth_degree ? 'Yes' : 'No'} />
                        <InfoRow label="Q34a Details" value={applicant.questionnaire.q34_a_details} />
                        <InfoRow label="Q35a - Administrative offense" value={applicant.questionnaire.q35_a ? 'Yes' : 'No'} />
                        <InfoRow label="Q35a Details" value={applicant.questionnaire.q35_a_details} />
                        <InfoRow label="Q35b - Criminal charged" value={applicant.questionnaire.q35_b ? 'Yes' : 'No'} />
                        <InfoRow label="Q35b Details" value={applicant.questionnaire.q35_b_details} />
                        {/* ✅ Formatted date filed */}
                        <InfoRow label="Date Filed" value={formatDate(applicant.questionnaire.q35_date_filed)} />
                        <InfoRow label="Case Status" value={applicant.questionnaire.q35_case_status} />
                        <InfoRow label="Q36 - Conviction" value={applicant.questionnaire.q36 ? 'Yes' : 'No'} />
                        <InfoRow label="Q36 Details" value={applicant.questionnaire.q36_details} />
                        <InfoRow label="Q37 - Separation" value={applicant.questionnaire.q37 ? 'Yes' : 'No'} />
                        <InfoRow label="Q37 Details" value={applicant.questionnaire.q37_details} />
                        <InfoRow label="Q38a - Candidacy" value={applicant.questionnaire.q38_a ? 'Yes' : 'No'} />
                        <InfoRow label="Q38a Details" value={applicant.questionnaire.q38_a_details} />
                        <InfoRow label="Q38b - Resignation" value={applicant.questionnaire.q38_b ? 'Yes' : 'No'} />
                        <InfoRow label="Q38b Details" value={applicant.questionnaire.q38_b_details} />
                        <InfoRow label="Q39 - Immigrant" value={applicant.questionnaire.q39 ? 'Yes' : 'No'} />
                        <InfoRow label="Q39 Country" value={applicant.questionnaire.q39_country} />
                        <InfoRow label="Q40a - Indigenous" value={applicant.questionnaire.q40_a ? 'Yes' : 'No'} />
                        <InfoRow label="Q40a Specify" value={applicant.questionnaire.q40_a_specify} />
                        <InfoRow label="Q40b - PWD" value={applicant.questionnaire.q40_b ? 'Yes' : 'No'} />
                        <InfoRow label="Q40b ID" value={applicant.questionnaire.q40_b_id} />
                        <InfoRow label="Q40c - Solo Parent" value={applicant.questionnaire.q40_c ? 'Yes' : 'No'} />
                        <InfoRow label="Q40c ID" value={applicant.questionnaire.q40_c_id} />
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">Questionnaire not answered yet.</p>
                )}
            </SectionCard>

            <SectionCard title="References" icon={Users}>
                {applicant.references?.length > 0 ? (
                    applicant.references.map((ref) => (
                        <div key={ref.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 mb-2">
                            <p className="font-medium">{ref.name}</p>
                            <p className="text-sm text-gray-600">{ref.address}</p>
                            <p className="text-sm text-gray-500">Contact: {ref.contact}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No references.</p>
                )}
            </SectionCard>
        </>
    );

    const renderDocumentsTab = () => (
        <SectionCard title="Uploaded Documents" icon={FileText} defaultOpen={true}>
            {applicant.documents?.length > 0 ? (
                <div className="space-y-2">
                    {applicant.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div>
                                <p className="font-medium">{doc.document_type}</p>
                                <p className="text-sm text-gray-600">{doc.file_name}</p>
                                <p className="text-xs text-gray-500">
                                    {doc.verified ? '✅ Verified' : '⏳ Pending'}
                                    {doc.verified_by && ` by ${doc.verifier?.name || 'HR'}`}
                                    {doc.rejection_reason && ` | Reason: ${doc.rejection_reason}`}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <a
                                    href={route('applicant.pds.documents.download', doc.id)}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    <Download className="h-4 w-4" />
                                </a>
                                {!doc.verified && (
                                    <>
                                        <button
                                            onClick={() => handleDocumentVerify(doc.id, true)}
                                            className="text-emerald-600 hover:text-emerald-800 text-sm"
                                        >
                                            <CheckCircle className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDocumentVerify(doc.id, false)}
                                            className="text-red-600 hover:text-red-800 text-sm"
                                        >
                                            <XCircle className="h-4 w-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-sm">No documents uploaded.</p>
            )}
        </SectionCard>
    );

    const renderTabContent = {
        profile: renderProfileTab,
        'education-work': renderEducationWorkTab,
        'other-info': renderOtherInfoTab,
        documents: renderDocumentsTab,
    };

    return (
        <HRLayout>
            <div className="space-y-6">
                {/* Back button */}
                <Link href={route('hr.applicants.index')} className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                    ← Back to Applicants
                </Link>

                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {applicant.personal_information?.first_name} {applicant.personal_information?.last_name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                <span className="text-sm text-gray-500">Application #{applicant.application_no}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[applicant.status] || 'bg-gray-100 text-gray-800'}`}>
                                    {applicant.status.replace('_', ' ').toUpperCase()}
                                </span>
                                <span className="text-sm text-gray-500">Email: {applicant.user?.email}</span>
                                {applicant.invited_at && (
                                    <span className="text-sm text-gray-500">Invited: {formatDate(applicant.invited_at)}</span>
                                )}
                            </div>
                        </div>
                        <div className="flex space-x-2 mt-4 md:mt-0">
                            {applicant.status === 'registered' && (
                                <button
                                    onClick={() => post(route('hr.applicants.invite', applicant.id), { preserveScroll: true })}
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    Invite
                                </button>
                            )}
                            {applicant.status === 'pds_submitted' && (
                                <>
                                    <button
                                        onClick={() => setVerifyModal(true)}
                                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                                    >
                                        Verify
                                    </button>
                                    <button
                                        onClick={() => setRejectModal(true)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-1 px-4 overflow-x-auto scrollbar-hide" aria-label="Tabs">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap
                                            ${activeTab === tab.id
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                                        `}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="p-4">
                        {renderTabContent[activeTab]()}
                    </div>
                </div>

                {/* Modals (unchanged) */}
                {verifyModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setVerifyModal(false)} />
                        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-900">Verify Applicant</h3>
                            <p className="mt-2 text-sm text-gray-600">Are you sure you want to verify this applicant? They will become a candidate for hiring.</p>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button onClick={() => setVerifyModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                                    Cancel
                                </button>
                                <button onClick={handleVerify} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">
                                    Verify
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {rejectModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setRejectModal(false)} />
                        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-900">Reject Applicant</h3>
                            <p className="mt-2 text-sm text-gray-600">Are you sure you want to reject this applicant? This action cannot be undone.</p>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button onClick={() => setRejectModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                                    Cancel
                                </button>
                                <button onClick={handleReject} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </HRLayout>
    );
}
