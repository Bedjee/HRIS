import Logo from '@/Components/Logo';
import { usePage } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    const { url } = usePage();

    // Dynamic heading & subheading
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

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-6 sm:px-6 lg:px-8">
            {/* Decorative blurred circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl opacity-30"></div>
            </div>

            {/* Main container */}
            <div className="relative w-full max-w-6xl transition-all duration-700 ease-out opacity-100 translate-y-0">
                {/* ========== MOBILE LAYOUT (below lg) - ultra clean ========== */}
                <div className="lg:hidden flex flex-col items-center justify-center min-h-[calc(100vh-3rem)] space-y-6">
                    {/* Logo - smaller */}
                    <Logo width={60} height={54} showName={true} className="scale-90" />

                    {/* Heading & subheading - minimal */}
                    <div className="text-center max-w-xs">
                        <h1 className="text-2xl font-bold text-gray-900">{heading}</h1>
                        <p className="text-sm text-gray-500 mt-1">{subheading}</p>
                    </div>

                    {/* Authentication Card - reduced padding */}
                    <div className="w-full max-w-xs bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 p-5">
                        {children}
                    </div>
                </div>

                {/* ========== DESKTOP LAYOUT (lg and above) ========== */}
                <div className="hidden lg:flex bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    {/* Left - Branding */}
                    <div className="flex flex-col justify-center p-8 lg:p-12 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 w-1/2">
                        <div className="flex items-center space-x-3 mb-8">
                            <Logo width={50} height={50} showName={true} />
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                                Manage Your Workforce,
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Effortlessly.
                                </span>
                            </h1>
                            <p className="text-base text-gray-600 leading-relaxed max-w-sm">
                                Centralize employee data, attendance, payroll, and performance in one secure platform.
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
