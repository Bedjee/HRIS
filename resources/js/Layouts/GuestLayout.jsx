
import Logo from '@/Components/Logo';
import { Link, usePage } from '@inertiajs/react';
import {
    Users,
    CalendarCheck,
    Wallet,
    ShieldCheck,
    BarChart3,
    Clock3,
    LayoutDashboard,
} from 'lucide-react';

export default function GuestLayout({ children }) {
    // Dynamic heading & subheading based on current route
    const { url } = usePage();
    const isLogin = url === '/login' || url === '/';
    const isRegister = url === '/register';
    const isForgotPassword = url === '/forgot-password';
    const isResetPassword = url.startsWith('/reset-password');
    const isVerifyEmail = url === '/verify-email';

    let heading = 'Welcome Back';
    let subheading = 'Sign in to continue to your account.';
    if (isRegister) {
        heading = 'Create Account';
        subheading = 'Sign up to start managing your workforce.';
    } else if (isForgotPassword) {
        heading = 'Reset Password';
        subheading = 'Enter your email to receive a reset link.';
    } else if (isResetPassword) {
        heading = 'Set New Password';
        subheading = 'Enter your new password below.';
    } else if (isVerifyEmail) {
        heading = 'Verify Your Email';
        subheading = 'Check your inbox for a verification link.';
    }

    // Desktop feature data
    const desktopFeatures = [
        {
            icon: Users,
            title: 'Employee Management',
            description: 'Manage employee records efficiently.',
        },
        {
            icon: CalendarCheck,
            title: 'Attendance Tracking',
            description: 'Monitor attendance accurately.',
        },
        {
            icon: Wallet,
            title: 'Payroll',
            description: 'Simplify salary processing.',
        },
        {
            icon: ShieldCheck,
            title: 'Secure Access',
            description: 'Role-based authentication and security.',
        },
        {
            icon: BarChart3,
            title: 'Reports & Analytics',
            description: 'Generate meaningful HR insights.',
        },
        {
            icon: Clock3,
            title: 'Leave Management',
            description: 'Manage employee leave requests digitally.',
        },
    ];

    // Mobile highlight features (only three)
    const mobileFeatures = [
        {
            icon: Users,
            title: 'Employee Management',
            description: 'Manage employee records efficiently.',
        },
        {
            icon: ShieldCheck,
            title: 'Secure Access',
            description: 'Role-based authentication and security.',
        },
        {
            icon: BarChart3,
            title: 'Analytics',
            description: 'Generate meaningful HR insights.',
        },
    ];

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-6 sm:px-6 lg:px-8">
            {/* Decorative blurred circles - adjusted for mobile */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl lg:opacity-100 opacity-50"></div>
                <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl lg:opacity-100 opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl lg:opacity-100 opacity-30"></div>
            </div>

            {/* Main container - different layouts for mobile vs desktop */}
            <div className="relative w-full max-w-6xl transition-all duration-700 ease-out opacity-100 translate-y-0">
                {/* ========== MOBILE LAYOUT (below lg) ========== */}
                <div className="lg:hidden flex flex-col items-center space-y-6">
                    {/* Header */}
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                            <Logo width={100} height={90} showName={true} />


                        </div>

                    </div>

                    {/* Hero */}
                    <div className="text-center max-w-sm">
                        <h1 className="text-3xl font-extrabold text-gray-900">{heading}</h1>
                        <p className="text-base text-gray-600 mt-2">{subheading}</p>
                        <div className="mt-4 flex justify-center">
                            <div className="p-4 bg-blue-50/80 rounded-2xl shadow-inner">
                                <LayoutDashboard className="h-12 w-12 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Authentication Card */}
                    <div className="w-full max-w-sm bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-6">
                        {children}
                    </div>

                    {/* Mobile Feature Highlights (3 cards) */}
                    <div className="w-full max-w-sm grid grid-cols-3 gap-2 mt-2">
                        {mobileFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center p-3 rounded-xl bg-white/70 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <div className="p-2 bg-blue-100/50 rounded-lg">
                                    <feature.icon className="h-5 w-5 text-blue-600" />
                                </div>
                                <p className="text-sm font-semibold text-gray-900 mt-1">{feature.title}</p>
                                <p className="text-xs text-gray-500 leading-tight">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ========== DESKTOP LAYOUT (lg and above) ========== */}
                <div className="hidden lg:flex bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    {/* Left - Branding */}
                    <div className="flex flex-col justify-between p-8 lg:p-12 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 w-1/2">
                        <div className="flex items-center space-x-3">

                            <span className="text-2xl font-bold text-gray-900">SyntraHR</span>
                        </div>

                        <div className="mt-8 space-y-6">
                            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                                Modern Human Resource Management,
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Built for Organizations.
                                </span>
                            </h1>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Centralize employee management, recruitment, attendance, leave, payroll,
                                performance evaluation, and reporting into one secure system.
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-3">
                            {desktopFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-start space-x-3 p-3 rounded-xl border border-gray-100 bg-white/60 hover:bg-blue-50/80 transition-all duration-200 hover:shadow-md"
                                >
                                    <div className="flex-shrink-0 p-2 bg-blue-100/50 rounded-lg">
                                        <feature.icon className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{feature.title}</p>
                                        <p className="text-xs text-gray-500">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200/50">
                            <p className="text-sm text-gray-500">
                                Trusted HR platform designed to simplify workforce management for modern organizations.
                            </p>
                        </div>
                    </div>

                    {/* Right - Authentication Form */}
                    <div className="flex flex-col justify-center items-center p-8 lg:p-12 bg-white w-1/2">
                        <div className="w-full max-w-sm">
                            <div className="mb-6 text-center lg:text-left">
                                <h2 className="text-3xl font-extrabold text-gray-900">{heading}</h2>
                                <p className="mt-1 text-sm text-gray-600">{subheading}</p>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
