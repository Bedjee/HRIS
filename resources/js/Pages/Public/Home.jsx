import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    Users,
    Briefcase,
    UserCheck,
    CalendarCheck,
    Wallet,
    BarChart3,
    ShieldCheck,
    Building2,
    Clock3,
    FileText,
    Database,
    TrendingUp,
    Zap,
    Settings,
    LayoutDashboard,
    ChevronRight,
    ArrowRight,
} from 'lucide-react';
import PublicLayout from '../../Layouts/PublicLayout';

export default function Home() {
    const { auth } = usePage().props;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const fadeInClasses = `transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`;

    // Statistics data
    const stats = [
        { icon: Users, value: '518', label: 'Employees Managed' },
        { icon: Building2, value: '37', label: 'Departments' },
        { icon: FileText, value: '86%', label: 'HR Processes Automated' },
        { icon: Clock3, value: '99.9%', label: 'System Availability' },
    ];

    // Modules data
    const modules = [
        {
            icon: Users,
            title: 'Employee Management',
            description: 'Complete employee lifecycle management from onboarding to offboarding.',
        },
        {
            icon: Briefcase,
            title: 'Recruitment',
            description: 'Streamline job postings, applicant tracking, and hiring workflows.',
        },
        {
            icon: Clock3,
            title: 'Attendance Tracking',
            description: 'Real-time attendance monitoring with integrated time recording.',
        },
        {
            icon: CalendarCheck,
            title: 'Leave Management',
            description: 'Automated leave requests, approvals, and balance tracking.',
        },
        {
            icon: Wallet,
            title: 'Payroll',
            description: 'Accurate and timely payroll processing with tax compliance.',
        },
        {
            icon: BarChart3,
            title: 'Pass slip Management',
            description: 'Data-driven performance reviews and goal setting.',
        },
    ];

    // Benefits data
    const benefits = [
        {
            icon: ShieldCheck,
            title: 'Secure Authentication',
            description: 'Enterprise-grade security with multi-factor authentication and role-based access.',
        },
        {
            icon: Zap,
            title: 'Fast Performance',
            description: 'Optimized for speed with instant data retrieval and response times.',
        },
        {
            icon: Database,
            title: 'Centralized Employee Records',
            description: 'All employee data stored securely in a single, accessible repository.',
        },
        {
            icon: TrendingUp,
            title: 'Smart Analytics',
            description: 'Actionable insights with advanced reporting and predictive analytics.',
        },
        {
            icon: LayoutDashboard,
            title: 'Responsive Design',
            description: 'Seamless experience across desktop, tablet, and mobile devices.',
        },
        {
            icon: Settings,
            title: 'Easy Administration',
            description: 'Intuitive admin controls for system configuration and user management.',
        },
    ];

    // Workflow steps
    const workflowSteps = [
        { icon: Briefcase, label: 'Recruitment' },
        { icon: UserCheck, label: 'Employee Registration' },
        { icon: Clock3, label: 'Attendance Monitoring' },
        { icon: Wallet, label: 'Leave Management' },
        { icon: BarChart3, label: 'Pass slip Management' },
        { icon: FileText, label: 'Reports & Analytics' },
    ];

    return (
        <PublicLayout>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Background blurred circles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left content */}
                        <div className={`space-y-6 ${fadeInClasses}`}>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                                Modern Human Resource
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Information System
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600 max-w-lg">
                                Streamline employee management, recruitment, attendance, leave, payroll,
                                performance evaluation, and reporting in one centralized platform.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                {auth.user ? (
                                    <Link
                                       href={
    auth.user?.roles?.includes('hr')
        ? route('hr.dashboard')
        : auth.user?.roles?.includes('applicant')
            ? route('applicant.dashboard')
            : route('login') // fallback if no role
}


                                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-lg hover:scale-105"
                                    >
                                        Go to Dashboard
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-lg hover:scale-105"
                                        >
                                            Get Started
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-xl shadow-sm text-gray-700 bg-white hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:scale-105"
                                        >
                                            Log In
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Right illustration - abstract dashboard preview */}
                        <div className={`hidden lg:flex justify-center ${fadeInClasses}`}>
                            <div className="relative w-full max-w-md">
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-100/50">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                        </div>
                                        <span className="text-xs font-medium text-gray-400">Dashboard</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="bg-blue-50/80 rounded-xl p-3 flex items-center space-x-2">
                                            <Users className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="text-xs text-gray-500">Employees</p>
                                                <p className="text-sm font-bold text-gray-800">518</p>
                                            </div>
                                        </div>
                                        <div className="bg-indigo-50/80 rounded-xl p-3 flex items-center space-x-2">
                                            <Briefcase className="h-5 w-5 text-indigo-600" />
                                            <div>
                                                <p className="text-xs text-gray-500">Departments</p>
                                                <p className="text-sm font-bold text-gray-800">37</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50/80 rounded-xl p-4 mb-3">
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Attendance</span>
                                            <span>89%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full w-4/5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="bg-green-50/80 rounded-xl p-2 text-center">
                                            <Clock3 className="h-4 w-4 text-green-600 mx-auto" />
                                            <p className="text-xs font-medium text-gray-700">On Time</p>
                                        </div>
                                        <div className="bg-yellow-50/80 rounded-xl p-2 text-center">
                                            <CalendarCheck className="h-4 w-4 text-yellow-600 mx-auto" />
                                            <p className="text-xs font-medium text-gray-700">Leave</p>
                                        </div>
                                        <div className="bg-red-50/80 rounded-xl p-2 text-center">
                                            <BarChart3 className="h-4 w-4 text-red-600 mx-auto" />
                                            <p className="text-xs font-medium text-gray-700">Reviews</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Decorative floating elements */}
                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-200/30 rounded-full blur-2xl"></div>
                                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-indigo-200/30 rounded-full blur-2xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Statistics Section */}
            <section className="py-16 lg:py-24 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${fadeInClasses}`}>
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6 border border-gray-100/50 flex items-center space-x-4"
                            >
                                <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                                    <stat.icon className="h-8 w-8 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HR Modules Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-12 ${fadeInClasses}`}>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Complete HR Management</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            All the tools you need to manage your workforce efficiently.
                        </p>
                    </div>
                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${fadeInClasses}`}>
                        {modules.map((module, index) => (
                            <div
                                key={index}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-6 border border-gray-100/50"
                            >
                                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl w-fit mb-4">
                                    <module.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                                <p className="mt-2 text-gray-600">{module.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Our HRIS */}
            <section className="py-16 lg:py-24 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-12 ${fadeInClasses}`}>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Why Choose Our SyntraHR</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Built for government agencies and enterprises that demand excellence.
                        </p>
                    </div>
                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${fadeInClasses}`}>
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 border border-gray-100/50"
                            >
                                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl w-fit mb-4">
                                    <benefit.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                                <p className="mt-2 text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-b from-blue-50/30 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-12 ${fadeInClasses}`}>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Streamlined Workflow</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            From recruitment to analytics, our system guides you every step of the way.
                        </p>
                    </div>
                    {/* Desktop horizontal timeline */}
                    <div className={`hidden lg:flex justify-between items-center ${fadeInClasses}`}>
                        {workflowSteps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center flex-1 relative">
                                {index < workflowSteps.length - 1 && (
                                    <div className="absolute top-8 left-1/2 w-full h-0.5 bg-blue-200 -z-10"></div>
                                )}
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg">
                                    <step.icon className="h-8 w-8" />
                                </div>
                                <p className="mt-3 text-sm font-medium text-gray-700 text-center">{step.label}</p>
                                {index < workflowSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 left-full transform -translate-y-1/2">
                                        <ChevronRight className="h-6 w-6 text-blue-300" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Mobile vertical timeline */}
                    <div className={`lg:hidden space-y-6 ${fadeInClasses}`}>
                        {workflowSteps.map((step, index) => (
                            <div key={index} className="flex items-start space-x-4">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md">
                                        <step.icon className="h-6 w-6" />
                                    </div>
                                    {index < workflowSteps.length - 1 && (
                                        <div className="w-0.5 h-8 bg-blue-200"></div>
                                    )}
                                </div>
                                <div className="pt-2">
                                    <p className="text-base font-medium text-gray-900">{step.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className={`${fadeInClasses}`}>
                        <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to Modernize Your HR Operations?</h2>
                        <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
                            Join leading government agencies and enterprises that have transformed their HR processes
                            with our comprehensive platform.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href={route('register')}
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 hover:shadow-2xl hover:scale-105"
                            >
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href="#"
                                className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-base font-medium rounded-xl shadow-lg text-white bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 hover:shadow-2xl hover:scale-105"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left: Logo & Description */}
                        <div>
                            <div className="flex items-center space-x-2">
                                <div className="p-2 bg-blue-600 rounded-lg">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">SyntraHR</span>
                            </div>
                            <p className="mt-4 text-sm text-gray-400 max-w-xs">
                                A comprehensive Human Resource Information System designed for government agencies
                                and enterprises to streamline workforce management.
                            </p>
                        </div>

                        {/* Center: Quick Links */}
                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h3>
                            <ul className="mt-4 space-y-2">
                                <li><Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link></li>
                                <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link></li>
                                <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link></li>
                                <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Right: System Information */}
                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">System Information</h3>
                            <ul className="mt-4 space-y-2">
                                <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom: Copyright */}
                    <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                        <p>&copy; {new Date().getFullYear()} SyntraHR. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </PublicLayout>
    );
}
