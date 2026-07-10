import PublicLayout from '../../Layouts/PublicLayout';

export default function Contact() {
    return (
        <PublicLayout>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Contact Us
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        We'd love to hear from you. Reach out with any questions or feedback.
                    </p>
                </div>
                <div className="mt-10 max-w-xl mx-auto">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <p className="text-gray-600 mb-4">
                            For general inquiries, please contact our HR department:
                        </p>
                        <div className="space-y-2 text-gray-700">
                            <p><strong>Email:</strong> hrmo.opol@gmail.com</p>
                            <p><strong>Phone:</strong> (123) 456-7890</p>
                            <p><strong>Address:</strong> Poblacion Opol Misamis Oriental</p>
                        </div>
                        <p className="mt-4 text-sm text-gray-500">
                            (Contact form will be implemented soon.)
                        </p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
