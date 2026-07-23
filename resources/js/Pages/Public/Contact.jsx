import { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    ArrowRight,
    Building2,
    Users,
    CheckCircle,
} from 'lucide-react';

export default function Contact() {
    const [isVisible, setIsVisible] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const fadeInClasses = `transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.send'), {
            onSuccess: () => reset(),
        });
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email Us',
            details: 'hrmo.opol@gmail.com',
            sub: 'We\'ll respond within 24 hours',
            href: 'mailto:hrmo.opol@gmail.com',
        },
        {
            icon: Phone,
            title: 'Call Us',
            details: '09090087629',
            sub: 'Mon–Fri, 8:00 AM – 5:00 PM',
            href: '09090087629',
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            details: 'Poblacion Opol',
            sub: 'Misamis Oriental, Philippines',
            href: '#',
        },
        {
            icon: Clock,
            title: 'Office Hours',
            details: '8:00 AM – 5:00 PM',
            sub: 'Monday to Friday',
        },
    ];

    const stats = [
        { icon: Building2, value: '10+', label: 'Institutions Served' },
        { icon: Users, value: '2,000+', label: 'Employees Supported' },
        { icon: CheckCircle, value: '100%', label: 'Client Satisfaction' },
    ];

    return (
        <PublicLayout>
            <Head title="Contact SyntraHR" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 sm:py-24">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className={fadeInClasses}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Touch</span>
                        </h1>
                        <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                            Have questions about SyntraHR? We're here to help. Reach out and we'll get
                            back to you as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-12 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${fadeInClasses}`}>
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.href || '#'}
                                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6 border border-gray-100/50 text-center block"
                            >
                                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                                    <info.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{info.title}</h3>
                                <p className="text-gray-700 font-medium text-sm mt-1">{info.details}</p>
                                <p className="text-xs text-gray-500 mt-1">{info.sub}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map Section */}
            <section className="py-12 lg:py-16 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 ${fadeInClasses}`}>
                        {/* Left: Contact Form */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100/50">
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Send a Message</h2>
                            <p className="text-sm text-gray-500 mb-6">
                                Fill out the form below and we'll get back to you promptly.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                                        placeholder="John Doe"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                                        placeholder="you@example.com"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                                        placeholder="How can we help?"
                                        required
                                    />
                                    {errors.subject && (
                                        <p className="text-xs text-red-600 mt-1">{errors.subject}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        rows="4"
                                        className="w-full rounded-lg border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none"
                                        placeholder="Your message here..."
                                        required
                                    />
                                    {errors.message && (
                                        <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-70"
                                >
                                    {processing ? 'Sending...' : 'Send Message'}
                                    <Send className="ml-2 h-4 w-4" />
                                </button>
                            </form>
                        </div>

                        {/* Right: Map / Location */}
                        <div className="flex flex-col space-y-6">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 flex-1">
                                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                        <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                                        Our Location
                                    </h3>
                                </div>
                                <div className="aspect-video bg-gray-200">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252015.5644558515!2d124.53285405539286!3d8.566738903176622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32548a357a49c419%3A0x9cf2fa63c01a39d5!2sOpol%2C%20Misamis%20Oriental!5e0!3m2!1sen!2sph!4v1700000000000"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="SyntraHR Location"
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 text-center border border-gray-100/50"
                                    >
                                        <stat.icon className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                                        <p className="text-xl font-extrabold text-gray-900">{stat.value}</p>
                                        <p className="text-xs text-gray-500">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call-to-Action */}
            <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className={fadeInClasses}>
                        <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to Get Started?</h2>
                        <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
                            Join the growing number of organizations that trust SyntraHR to manage their workforce.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="/register"
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-blue-700 bg-white hover:bg-blue-50 transition-all duration-200 hover:shadow-2xl hover:scale-105"
                            >
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-base font-medium rounded-xl shadow-lg text-white bg-transparent hover:bg-white/10 transition-all duration-200 hover:shadow-2xl hover:scale-105"
                            >
                                View Features
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
