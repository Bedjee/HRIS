import PublicLayout from '../../Layouts/PublicLayout';

export default function About() {
    return (
        <PublicLayout>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        About HRIS
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Built for government institutions to manage human resources efficiently.
                    </p>
                </div>
                <div className="mt-10">
                    <div className="prose prose-blue mx-auto text-gray-500">
                        <p>
                            The Human Resource Information System (HRIS) is a centralized platform
                            designed to streamline the entire employee lifecycle — from recruitment
                            and onboarding to performance evaluation, payroll, and retirement.
                        </p>
                        <p className="mt-4">
                            This system follows a modular architecture, ensuring scalability and
                            maintainability as your organization grows. Each module (Applicant Management,
                            Employee Management, Leave, Payroll, etc.) can be developed and extended
                            independently.
                        </p>
                        <p className="mt-4">
                            <strong>Key Features:</strong>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Applicant tracking with Personal Data Sheet (PDS) collection</li>
                                <li>Role-based access control with granular permissions</li>
                                <li>Document management and verification</li>
                                <li>Complete audit trails</li>
                                <li>Integration-ready for future modules</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
