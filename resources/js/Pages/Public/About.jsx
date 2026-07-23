import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';
import {
    Building2,
    Users,
    FileText,
    ShieldCheck,
    Award,
    Target,
    Clock,
    CheckCircle,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

export default function About() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Sample images – replace these with your own image URLs
    const slides = [
        { id: 1, src: 'https://picsum.photos/seed/office/1200/600', alt: 'Office Building' },
        { id: 2, src: 'https://picsum.photos/seed/team/1200/600', alt: 'Team Collaboration' },
        { id: 3, src: 'https://picsum.photos/seed/meeting/1200/600', alt: 'Meeting Room' },
        { id: 4, src: 'https://picsum.photos/seed/technology/1200/600', alt: 'Technology' },
    ];

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Auto-play slides
    useEffect(() => {
        if (slides.length === 0) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const fadeInClasses = `transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`;

    // Statistics data
    const stats = [
        { icon: Building2, value: '10+', label: 'Institutions Served' },
        { icon: Users, value: '2,000+', label: 'Employees Managed' },
        { icon: FileText, value: '5,000+', label: 'Records Digitized' },
        { icon: Clock, value: '99.9%', label: 'Uptime Guaranteed' },
    ];

    // Feature cards
    const features = [
        {
            icon: ShieldCheck,
            title: 'Secure & Compliant',
            description: 'Enterprise-grade security with role-based access and full audit trails.',
        },
        {
            icon: Award,
            title: 'Trusted by Government',
            description: 'Designed specifically to meet the needs of public sector organizations.',
        },
        {
            icon: Target,
            title: 'Mission‑Driven',
            description: 'Committed to improving workforce efficiency and employee satisfaction.',
        },
        {
            icon: CheckCircle,
            title: 'Modular & Scalable',
            description: 'Built with a modular architecture that grows with your organization.',
        },
    ];

    return (
        <PublicLayout>
            <Head title="About SyntraHR" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 sm:py-24">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className={fadeInClasses}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">SyntraHR</span>
                        </h1>
                        <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                            Built for government institutions and enterprises to manage human resources
                            efficiently, securely, and at scale.
                        </p>
                    </div>
                </div>
            </section>

            {/* Slideshow Section */}
            <section className="py-12 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`${fadeInClasses}`}>
                        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                            A Glimpse Inside SyntraHR
                        </h2>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            {/* Slides */}
                            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gray-200">
                                {slides.map((slide, index) => (
                                    <div
                                        key={slide.id}
                                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    >
                                        <img
                                            src={slide.src}
                                            alt={slide.alt}
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Optional overlay with caption */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                            <p className="text-white text-sm sm:text-base font-medium">{slide.alt}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                            </button>

                            {/* Dot Indicators */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                                            index === currentSlide
                                                ? 'bg-white w-6 sm:w-8'
                                                : 'bg-white/50 hover:bg-white/80'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
<section className="py-12 bg-white/50 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${fadeInClasses}`}>
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-4 sm:p-6 border border-gray-100/50 flex items-center space-x-2 sm:space-x-4 min-w-0"
                >
                    <div className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                        <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 truncate">{stat.value}</p>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>


            {/* Feature Cards */}
            <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-12 ${fadeInClasses}`}>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Why SyntraHR</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            We combine modern technology with a deep understanding of public sector needs.
                        </p>
                    </div>
                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${fadeInClasses}`}>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-6 border border-gray-100/50 text-center"
                            >
                                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl w-fit mx-auto mb-4">
                                    <feature.icon className="h-8 w-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                                <p className="mt-2 text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call-to-Action */}
            <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className={fadeInClasses}>
                        <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to Transform Your HR?</h2>
                        <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
                            Join the growing number of organizations that trust SyntraHR to manage their workforce.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-blue-700 bg-white hover:bg-blue-50 transition-all duration-200 hover:shadow-2xl hover:scale-105"
                            >
                                Contact Us
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-base font-medium rounded-xl shadow-lg text-white bg-transparent hover:bg-white/10 transition-all duration-200 hover:shadow-2xl hover:scale-105"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
