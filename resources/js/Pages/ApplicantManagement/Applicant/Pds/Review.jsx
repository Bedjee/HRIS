import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, MinusCircle } from 'lucide-react';

export default function Review({ applicant, readonly = false }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const { post, processing, errors } = useForm();

    const sections = [
        { key: 'personal_information', label: 'Personal Information' },
        { key: 'addresses', label: 'Addresses' },
        { key: 'family_members', label: 'Family Background' },
        { key: 'educations', label: 'Educational Background' },
        { key: 'eligibilities', label: 'Civil Service Eligibility' },
        { key: 'work_experiences', label: 'Work Experience' },
        { key: 'voluntary_works', label: 'Voluntary Work' },
        { key: 'trainings', label: 'Trainings' },
        { key: 'skills', label: 'Skills' },
        { key: 'recognitions', label: 'Recognitions' },
        { key: 'memberships', label: 'Memberships' },
        { key: 'questionnaire', label: 'Questionnaire' },
        { key: 'references', label: 'References' },
        { key: 'documents', label: 'Documents' },
    ];

    // Helper: check if a section is skipped (only for array sections)
    const isSectionSkipped = (sectionKey) => {
        const data = applicant[sectionKey];
        if (!Array.isArray(data)) return false;
        return data.some(item => item.is_skipped === true);
    };

    // Helper: check if section is complete (including skipped)
    const isComplete = (sectionKey) => {
        // If skipped, it's considered complete
        if (isSectionSkipped(sectionKey)) return true;

        const data = applicant[sectionKey];
        if (Array.isArray(data)) return data.length > 0;
        if (sectionKey === 'addresses') {
            const addresses = applicant.addresses || [];
            return addresses.length >= 2;
        }
        if (sectionKey === 'questionnaire') return applicant.questionnaire !== null;
        if (sectionKey === 'personal_information') return applicant.personal_information !== null;
        return !!data;
    };

    const allComplete = sections.every(s => isComplete(s.key));

    const submit = (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setShowConfirm(true);
    };

    const confirmSubmit = () => {
        setShowConfirm(false);
        post(route('applicant.pds.submit'), {
            preserveScroll: true,
            onSuccess: () => {},
            onError: (error) => {
                console.error('Submission error:', error);
                if (typeof error === 'object' && error !== null) {
                    const messages = Object.values(error).flat();
                    setErrorMessage(messages.join(' '));
                } else {
                    setErrorMessage('Unable to submit PDS. Please try again.');
                }
            },
        });
    };

    if (readonly) {
        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Your PDS has been submitted successfully.
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>

            {errorMessage && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{errorMessage}</p>
                </div>
            )}
            {errors?.missing && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm font-medium flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Missing required sections:
                    </p>
                    <ul className="list-disc list-inside text-red-600 text-sm">
                        {Array.isArray(errors.missing) ? (
                            errors.missing.map((msg, i) => <li key={i}>{msg}</li>)
                        ) : (
                            <li>{errors.missing}</li>
                        )}
                    </ul>
                </div>
            )}

            <div className="space-y-3 mb-6">
                {sections.map((section) => {
                    const skipped = isSectionSkipped(section.key);
                    const complete = isComplete(section.key);
                    const isIncomplete = !complete && !skipped;

                    let statusText = '';
                    let statusIcon = null;
                    let statusColor = '';

                    if (skipped) {
                        statusText = 'Skipped';
                        statusIcon = <MinusCircle className="h-4 w-4" />;
                        statusColor = 'text-gray-500';
                    } else if (complete) {
                        statusText = 'Complete';
                        statusIcon = <CheckCircle className="h-4 w-4" />;
                        statusColor = 'text-green-600';
                    } else {
                        statusText = 'Incomplete';
                        statusIcon = <XCircle className="h-4 w-4" />;
                        statusColor = 'text-red-500';
                    }

                    return (
                        <div key={section.key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-700">{section.label}</span>
                            <span className={`flex items-center gap-1 ${statusColor}`}>
                                {statusIcon}
                                {statusText}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className={`p-4 rounded-lg flex items-center gap-2 ${allComplete ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                {allComplete ? (
                    <CheckCircle className="h-5 w-5 text-green-700 flex-shrink-0" />
                ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-700 flex-shrink-0" />
                )}
                <p className={allComplete ? 'text-green-700' : 'text-yellow-700'}>
                    {allComplete
                        ? 'All sections are complete (including skipped ones). You are ready to submit your PDS.'
                        : 'Please complete all sections before submitting.'}
                </p>
            </div>

            <form onSubmit={submit} className="mt-6">
                <button
                    type="submit"
                    disabled={!allComplete || processing}
                    className={`w-full px-6 py-3 text-white rounded-md text-lg font-semibold transition flex items-center justify-center gap-2
                        ${allComplete && !processing
                            ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                >
                    {processing ? 'Submitting...' : 'Submit PDS'}
                    {!processing && allComplete && <CheckCircle className="h-5 w-5" />}
                </button>
            </form>

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900">Confirm PDS Submission</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Are you sure you want to submit your Personal Data Sheet? You will not be able to edit it after submission.
                        </p>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmSubmit}
                                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                            >
                                Confirm Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
