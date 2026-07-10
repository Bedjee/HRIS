import { useForm } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function Questionnaire({ applicant, readonly = false }) {
    const questionnaire = applicant.questionnaire || {};
    const [toast, setToast] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        q34_a: questionnaire.q34_a ?? false,
        q34_a_third_degree: questionnaire.q34_a_third_degree ?? false,
        q34_a_fourth_degree: questionnaire.q34_a_fourth_degree ?? false,
        q34_a_details: questionnaire.q34_a_details ?? '',
        q34_b: questionnaire.q34_b ?? false,
        q35_a: questionnaire.q35_a ?? false,
        q35_a_details: questionnaire.q35_a_details ?? '',
        q35_b: questionnaire.q35_b ?? false,
        q35_b_details: questionnaire.q35_b_details ?? '',
        q35_date_filed: questionnaire.q35_date_filed ?? '',
        q35_case_status: questionnaire.q35_case_status ?? '',
        q36: questionnaire.q36 ?? false,
        q36_details: questionnaire.q36_details ?? '',
        q37: questionnaire.q37 ?? false,
        q37_details: questionnaire.q37_details ?? '',
        q38_a: questionnaire.q38_a ?? false,
        q38_a_details: questionnaire.q38_a_details ?? '',
        q38_b: questionnaire.q38_b ?? false,
        q38_b_details: questionnaire.q38_b_details ?? '',
        q39: questionnaire.q39 ?? false,
        q39_country: questionnaire.q39_country ?? '',
        q40_a: questionnaire.q40_a ?? false,
        q40_a_specify: questionnaire.q40_a_specify ?? '',
        q40_b: questionnaire.q40_b ?? false,
        q40_b_id: questionnaire.q40_b_id ?? '',
        q40_c: questionnaire.q40_c ?? false,
        q40_c_id: questionnaire.q40_c_id ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('applicant.pds.questionnaire'), {
            preserveScroll: true,
            onSuccess: () => {
                setToast('Questionnaire saved successfully!');
                setTimeout(() => setToast(null), 3000);
            },
            onError: () => {
                setToast('Failed to save. Please check the form.');
                setTimeout(() => setToast(null), 3000);
            },
        });
    };

    const Toast = () => {
        if (!toast) return null;
        const isError = toast.includes('Failed');
        return (
            <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white ${isError ? 'bg-red-500' : 'bg-green-500'}`}>
                {toast}
            </div>
        );
    };

    const QuestionGroup = ({ number, label, children }) => (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">{number}. {label}</h3>
            <div className="space-y-4">{children}</div>
        </div>
    );

    const YesNoDisplay = ({ label, value, details }) => (
        <div className="py-1 border-b border-gray-100 last:border-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-sm text-gray-700 flex-1">{label}</span>
                <span className="text-sm font-medium">{value ? 'Yes' : 'No'}</span>
            </div>
            {value && details && <p className="mt-1 text-sm text-gray-600">Details: {details}</p>}
        </div>
    );

    if (readonly) {
        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">Questionnaire</h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <YesNoDisplay label="Q34a – within third degree?" value={questionnaire.q34_a} details={questionnaire.q34_a_details} />
                    <YesNoDisplay label="Q34a – within fourth degree?" value={questionnaire.q34_a_fourth_degree} />
                    <YesNoDisplay label="Q35a – Administrative offense?" value={questionnaire.q35_a} details={questionnaire.q35_a_details} />
                    <YesNoDisplay label="Q35b – Criminally charged?" value={questionnaire.q35_b} details={questionnaire.q35_b_details} />
                    {questionnaire.q35_b && (
                        <>
                            <div><span className="text-sm font-medium text-gray-500">Date Filed:</span> {questionnaire.q35_date_filed || '—'}</div>
                            <div><span className="text-sm font-medium text-gray-500">Case Status:</span> {questionnaire.q35_case_status || '—'}</div>
                        </>
                    )}
                    <YesNoDisplay label="Q36 – Convicted?" value={questionnaire.q36} details={questionnaire.q36_details} />
                    <YesNoDisplay label="Q37 – Separated from service?" value={questionnaire.q37} details={questionnaire.q37_details} />
                    <YesNoDisplay label="Q38a – Candidate in election?" value={questionnaire.q38_a} details={questionnaire.q38_a_details} />
                    <YesNoDisplay label="Q38b – Resigned for election?" value={questionnaire.q38_b} details={questionnaire.q38_b_details} />
                    <YesNoDisplay label="Q39 – Immigrant/permanent resident?" value={questionnaire.q39} details={questionnaire.q39_country} />
                    <YesNoDisplay label="Q40a – Indigenous group?" value={questionnaire.q40_a} details={questionnaire.q40_a_specify} />
                    <YesNoDisplay label="Q40b – Person with disability?" value={questionnaire.q40_b} details={questionnaire.q40_b_id} />
                    <YesNoDisplay label="Q40c – Solo parent?" value={questionnaire.q40_c} details={questionnaire.q40_c_id} />
                </div>
            </div>
        );
    }

    const YesNoField = ({ field, label, showDetails, detailsField, detailsLabel, detailsPlaceholder, showExtra = null }) => {
        const detailsRef = useRef(null);
        useEffect(() => {
            if (data[field] === true && detailsRef.current) {
                detailsRef.current.focus();
            }
        }, [data[field]]);

        return (
            <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-sm text-gray-700 flex-1">{label}</span>
                    <div className="flex gap-4">
                        <label className="inline-flex items-center">
                            <input type="radio" checked={data[field] === true} onChange={() => setData(field, true)} className="w-4 h-4 text-blue-600 border-gray-300" />
                            <span className="ml-1 text-sm text-gray-700">YES</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="radio" checked={data[field] === false} onChange={() => setData(field, false)} className="w-4 h-4 text-blue-600 border-gray-300" />
                            <span className="ml-1 text-sm text-gray-700">NO</span>
                        </label>
                    </div>
                </div>
                {showDetails && data[field] === true && (
                    <div className="ml-0 sm:ml-6 mt-2">
                        {showExtra && showExtra}
                        {detailsField && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">{detailsLabel || 'Details:'}</label>
                                <textarea
                                    ref={detailsRef}
                                    value={data[detailsField] || ''}
                                    onChange={e => setData(detailsField, e.target.value)}
                                    rows="2"
                                    placeholder={detailsPlaceholder || 'Provide details...'}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                />
                                {errors[detailsField] && <p className="text-red-500 text-sm mt-1">{errors[detailsField]}</p>}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div>
            <Toast />
            <h2 className="text-xl font-semibold mb-4">Questionnaire</h2>
            <p className="text-sm text-gray-600 mb-4">Please answer all questions honestly and completely.</p>
            <form onSubmit={submit} className="space-y-4">
                {/* Q34 */}
                <QuestionGroup number="34" label="Are you related by consanguinity or affinity to the appointing or recommending authority, or to the chief of bureau or office or to the person who has immediate supervision over you in the Office, Bureau or Department where you will be appointed:">
                    <YesNoField
                        field="q34_a"
                        label="a. within the third degree?"
                        showDetails={true}
                        detailsField="q34_a_details"
                        detailsLabel="If YES, give details:"
                        detailsPlaceholder="Provide relationship details..."
                        showExtra={data.q34_a === true && (
                            <div className="mt-2 space-y-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">a. within the third degree?</label>
                                    <div className="flex gap-4 mt-1">
                                        <label className="inline-flex items-center">
                                            <input type="radio" checked={data.q34_a_third_degree === true} onChange={() => setData('q34_a_third_degree', true)} className="w-4 h-4 text-blue-600 border-gray-300" />
                                            <span className="ml-1 text-sm text-gray-700">YES</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input type="radio" checked={data.q34_a_third_degree === false} onChange={() => setData('q34_a_third_degree', false)} className="w-4 h-4 text-blue-600 border-gray-300" />
                                            <span className="ml-1 text-sm text-gray-700">NO</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">b. within the fourth degree (for Local Government Unit - Career Employees)?</label>
                                    <div className="flex gap-4 mt-1">
                                        <label className="inline-flex items-center">
                                            <input type="radio" checked={data.q34_a_fourth_degree === true} onChange={() => setData('q34_a_fourth_degree', true)} className="w-4 h-4 text-blue-600 border-gray-300" />
                                            <span className="ml-1 text-sm text-gray-700">YES</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input type="radio" checked={data.q34_a_fourth_degree === false} onChange={() => setData('q34_a_fourth_degree', false)} className="w-4 h-4 text-blue-600 border-gray-300" />
                                            <span className="ml-1 text-sm text-gray-700">NO</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </QuestionGroup>

                {/* Q35 */}
                <QuestionGroup number="35" label="">
                    <YesNoField field="q35_a" label="a. Have you ever been found guilty of any administrative offense?" showDetails={true} detailsField="q35_a_details" detailsLabel="If YES, give details:" detailsPlaceholder="Provide details of administrative offense..." />
                    <YesNoField
                        field="q35_b"
                        label="b. Have you been criminally charged before any court?"
                        showDetails={true}
                        detailsField="q35_b_details"
                        detailsLabel="If YES, give details:"
                        detailsPlaceholder="Provide details of criminal charges..."
                        showExtra={data.q35_b === true && (
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date Filed:</label>
                                    <input type="date" value={data.q35_date_filed || ''} onChange={e => setData('q35_date_filed', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status of Case/s:</label>
                                    <input type="text" value={data.q35_case_status || ''} onChange={e => setData('q35_case_status', e.target.value)} placeholder="e.g., Pending, Dismissed, etc." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm" />
                                </div>
                            </div>
                        )}
                    />
                </QuestionGroup>

                {/* Q36 */}
                <QuestionGroup number="36" label="Have you ever been convicted of any crime or violation of any law, decree, ordinance or regulation by any court or tribunal?">
                    <YesNoField field="q36" label="" showDetails={true} detailsField="q36_details" detailsLabel="If YES, give details:" detailsPlaceholder="Provide details of conviction..." />
                </QuestionGroup>

                {/* Q37 */}
                <QuestionGroup number="37" label="Have you ever been separated from the service in any of the following modes: resignation, retirement, dropped from the rolls, dismissal, termination, end of term, finished contract or phased out (abolition) in the public or private sector?">
                    <YesNoField field="q37" label="" showDetails={true} detailsField="q37_details" detailsLabel="If YES, give details:" detailsPlaceholder="Provide details of separation..." />
                </QuestionGroup>

                {/* Q38 */}
                <QuestionGroup number="38" label="">
                    <YesNoField field="q38_a" label="a. Have you ever been a candidate in a national or local election held within the last year (except Barangay election)?" showDetails={true} detailsField="q38_a_details" detailsLabel="If YES, give details:" detailsPlaceholder="Provide details of candidacy..." />
                    <YesNoField field="q38_b" label="b. Have you resigned from the government service during the three (3)-month period before the last election to promote/actively campaign for a national or local candidate?" showDetails={true} detailsField="q38_b_details" detailsLabel="If YES, give details:" detailsPlaceholder="Provide details of resignation..." />
                </QuestionGroup>

                {/* Q39 */}
                <QuestionGroup number="39" label="Have you acquired the status of an immigrant or permanent resident of another country?">
                    <YesNoField field="q39" label="" showDetails={true} detailsField="q39_country" detailsLabel="If YES, give details (country):" detailsPlaceholder="Enter country..." />
                </QuestionGroup>

                {/* Q40 */}
                <QuestionGroup number="40" label="Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta for Disabled Persons (RA 7277, as amended); and (c) Expanded Solo Parents Welfare Act (RA 11861), please answer the following items:">
                    <YesNoField field="q40_a" label="a. Are you a member of any indigenous group?" showDetails={true} detailsField="q40_a_specify" detailsLabel="If YES, please specify:" detailsPlaceholder="Specify indigenous group..." />
                    <YesNoField field="q40_b" label="b. Are you a person with disability?" showDetails={true} detailsField="q40_b_id" detailsLabel="If YES, please specify ID No:" detailsPlaceholder="Enter ID number..." />
                    <YesNoField field="q40_c" label="c. Are you a solo parent?" showDetails={true} detailsField="q40_c_id" detailsLabel="If YES, please specify ID No:" detailsPlaceholder="Enter ID number..." />
                </QuestionGroup>

                {!readonly && (
                    <div className="flex justify-end pt-4 border-t border-gray-200">
                        <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
                            {processing ? 'Saving...' : 'Save Questionnaire'}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
