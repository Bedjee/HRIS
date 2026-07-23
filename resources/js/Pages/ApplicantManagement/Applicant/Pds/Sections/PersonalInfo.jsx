import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';      // ✅ Added
import { FileText } from 'lucide-react';     // ✅ Added

export default function PersonalInfo({ applicant, readonly = false }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        surname: applicant.personal_information?.surname || '',
        first_name: applicant.personal_information?.first_name || '',
        middle_name: applicant.personal_information?.middle_name || '',
        extension_name: applicant.personal_information?.extension_name || '',
        birth_date: applicant.personal_information?.birth_date || '',
        birth_place: applicant.personal_information?.birth_place || '',
        sex: applicant.personal_information?.sex || '',
        civil_status: applicant.personal_information?.civil_status || '',
        citizenship: applicant.personal_information?.citizenship || '',
        dual_citizenship_type: applicant.personal_information?.dual_citizenship_type || '',
        dual_country: applicant.personal_information?.dual_country || '',
        height: applicant.personal_information?.height || '',
        weight: applicant.personal_information?.weight || '',
        blood_type: applicant.personal_information?.blood_type || '',
        philhealth_no: applicant.personal_information?.philhealth_no || '',
        philsys_no: applicant.personal_information?.philsys_no || '',
        pagibig_no: applicant.personal_information?.pagibig_no || '',
        tin_no: applicant.personal_information?.tin_no || '',
        agency_employee_no: applicant.personal_information?.agency_employee_no || '',
        telephone: applicant.personal_information?.telephone || '',
        mobile: applicant.personal_information?.mobile || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('applicant.pds.personal'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => console.error('Server error:', errors),
        });
    };

    if (readonly) {
        const info = applicant.personal_information;
        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="space-y-1 bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div><span className="text-sm font-medium text-gray-500">Surname</span><p className="text-gray-900">{info?.surname || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">First Name</span><p className="text-gray-900">{info?.first_name || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Middle Name</span><p className="text-gray-900">{info?.middle_name || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Extension</span><p className="text-gray-900">{info?.extension_name || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Birth Date</span><p className="text-gray-900">{info?.birth_date || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Birth Place</span><p className="text-gray-900">{info?.birth_place || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Sex</span><p className="text-gray-900">{info?.sex || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Civil Status</span><p className="text-gray-900">{info?.civil_status || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Citizenship</span><p className="text-gray-900">{info?.citizenship || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Dual Citizenship</span><p className="text-gray-900">{info?.dual_citizenship_type || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Dual Country</span><p className="text-gray-900">{info?.dual_country || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Height (cm)</span><p className="text-gray-900">{info?.height || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Weight (kg)</span><p className="text-gray-900">{info?.weight || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Blood Type</span><p className="text-gray-900">{info?.blood_type || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">PhilHealth</span><p className="text-gray-900">{info?.philhealth_no || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Philsys</span><p className="text-gray-900">{info?.philsys_no || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Pag-IBIG</span><p className="text-gray-900">{info?.pagibig_no || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">TIN</span><p className="text-gray-900">{info?.tin_no || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Agency Emp. No.</span><p className="text-gray-900">{info?.agency_employee_no || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Telephone</span><p className="text-gray-900">{info?.telephone || '—'}</p></div>
                        <div><span className="text-sm font-medium text-gray-500">Mobile</span><p className="text-gray-900">{info?.mobile || '—'}</p></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Surname *</label>
                        <input type="text" value={data.surname} onChange={e => setData('surname', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name *</label>
                        <input type="text" value={data.first_name} onChange={e => setData('first_name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                        <input type="text" value={data.middle_name} onChange={e => setData('middle_name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Extension Name</label>
                        <input type="text" value={data.extension_name} onChange={e => setData('extension_name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Birth Date *</label>
                        <input type="date" value={data.birth_date} onChange={e => setData('birth_date', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        {errors.birth_date && <p className="text-red-500 text-sm mt-1">{errors.birth_date}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Birth Place *</label>
                        <input type="text" value={data.birth_place} onChange={e => setData('birth_place', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        {errors.birth_place && <p className="text-red-500 text-sm mt-1">{errors.birth_place}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sex *</label>
                        <select value={data.sex} onChange={e => setData('sex', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.sex && <p className="text-red-500 text-sm mt-1">{errors.sex}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Civil Status *</label>
                        <select value={data.civil_status} onChange={e => setData('civil_status', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Widowed">Widowed</option>
                            <option value="Separated">Separated</option>
                            <option value="Divorced">Divorced</option>
                        </select>
                        {errors.civil_status && <p className="text-red-500 text-sm mt-1">{errors.civil_status}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Citizenship *</label>
                        <input type="text" value={data.citizenship} onChange={e => setData('citizenship', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        {errors.citizenship && <p className="text-red-500 text-sm mt-1">{errors.citizenship}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dual Citizenship Type</label>
                        <input type="text" value={data.dual_citizenship_type} onChange={e => setData('dual_citizenship_type', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dual Country</label>
                        <input type="text" value={data.dual_country} onChange={e => setData('dual_country', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                        <input type="number" step="0.01" value={data.height} onChange={e => setData('height', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                        <input type="number" step="0.01" value={data.weight} onChange={e => setData('weight', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Blood Type</label>
                        <select value={data.blood_type} onChange={e => setData('blood_type', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="AB">AB</option>
                            <option value="O">O</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">PhilHealth No.</label>
                        <input type="text" value={data.philhealth_no} onChange={e => setData('philhealth_no', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Philsys No.</label>
                        <input type="text" value={data.philsys_no} onChange={e => setData('philsys_no', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pag-IBIG No.</label>
                        <input type="text" value={data.pagibig_no} onChange={e => setData('pagibig_no', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">TIN No.</label>
                        <input type="text" value={data.tin_no} onChange={e => setData('tin_no', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Agency Employee No.</label>
                        <input type="text" value={data.agency_employee_no} onChange={e => setData('agency_employee_no', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Telephone</label>
                        <input type="text" value={data.telephone} onChange={e => setData('telephone', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mobile</label>
                        <input type="text" value={data.mobile} onChange={e => setData('mobile', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 w-full sm:w-auto">
                        {processing ? 'Saving...' : 'Save Personal Information'}
                    </button>

                     {/* ✅ Preview PDS button – only if personal info exists */}
                    {applicant.personal_information && (
                        <Link
                            href={route('applicant.pds.preview')}
                            className="inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition w-full sm:w-auto"
                            download
                        >
                            <FileText className="h-4 w-4 mr-2" />
                            Preview PDS
                        </Link>
                    )}
                </div>
            </form>
        </div>
    );
}
