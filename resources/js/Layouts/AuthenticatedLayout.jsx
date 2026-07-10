// resources/js/Layouts/AuthenticatedLayout.jsx
import { useState } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import Logo from '@/Components/Logo';
import Toast from '@/Components/Toast';
import { User, LogOut, Menu, X, LayoutDashboard, FileText } from 'lucide-react';

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const user = auth.user;
    const isApplicant = user?.roles?.includes('applicant');

    const { flash } = usePage().props;


    console.log('📦 Flash from layout:', flash);
    // Logout form
    const { post } = useForm();

    const handleLogout = () => {
        post(route('logout'), {
            onFinish: () => {
                setShowLogoutModal(false);
            },
        });
    };

    // Check active route for tabs
    const isActive = (routeName) => {
        return route().current(routeName);
    };

    console.log('isApplicant:', isApplicant);

    // Logout modal
    const LogoutModal = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setShowLogoutModal(false)}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
                <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
                <p className="mt-2 text-sm text-gray-600">
                    Are you sure you want to log out? You will need to sign in again to access your account.
                </p>
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={() => setShowLogoutModal(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                    >
                        Confirm Logout
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Decorative blurred circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-30 bg-white/80 backdrop-blur-sm border-b border-gray-100/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Logo width={70} height={60} showName={true} className="flex-shrink-0" />
                        </div>

                        {/* Desktop navigation links - Applicant only */}
                        <div className="hidden sm:flex sm:items-center sm:ml-6 space-x-8">
                            {isApplicant && (
                                <>
                                    <Link
                                        href={route('applicant.dashboard')}
                                        className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium text-gray-900 hover:text-blue-600 transition"
                                    >
                                        <LayoutDashboard className="h-4 w-4 mr-1" />
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={route('applicant.pds')}
                                        className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition"
                                    >
                                        <FileText className="h-4 w-4 mr-1" />
                                        PDS
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* User dropdown */}
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="relative ml-3">
                                <button
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/50 hover:bg-white/80 transition shadow-sm border border-gray-100"
                                >
                                    <User className="h-5 w-5 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                                    <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {showingNavigationDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                                        <button
                                            onClick={() => {
                                                setShowingNavigationDropdown(false);
                                                setShowLogoutModal(true);
                                            }}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition"
                                        >
                                            <LogOut className="h-4 w-4 mr-2" />
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile hamburger */}
                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-white/50 transition"
                            >
                                {showingNavigationDropdown ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile dropdown menu - Applicant only */}
                {showingNavigationDropdown && (
                    <div className="sm:hidden bg-white/90 backdrop-blur-sm border-t border-gray-100">
                        <div className="pt-2 pb-3 space-y-1">
                            {isApplicant && (
                                <>
                                    <Link
                                        href={route('applicant.dashboard')}
                                        className="flex items-center pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 bg-blue-50/50"
                                    >
                                        <LayoutDashboard className="h-5 w-5 mr-2" />
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={route('applicant.pds')}
                                        className="flex items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                                    >
                                        <FileText className="h-5 w-5 mr-2" />
                                        PDS
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-4">
                                <User className="h-6 w-6 text-gray-400 mr-2" />
                                <div>
                                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <button
                                    onClick={() => {
                                        setShowingNavigationDropdown(false);
                                        setShowLogoutModal(true);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                >
                                    <LogOut className="h-5 w-5 mr-2" />
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* ✅ Navigation Tabs for Applicant */}
            {isApplicant && (
                <div className="relative z-20 bg-white/80 backdrop-blur-sm border-b border-gray-100/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 scrollbar-hide">
                            <Link
                                href={route('applicant.dashboard')}
                                className={`
                                    px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap
                                    flex items-center gap-2
                                    ${isActive('applicant.dashboard')
                                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }
                                `}
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href={route('applicant.pds')}
                                className={`
                                    px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap
                                    flex items-center gap-2
                                    ${isActive('applicant.pds')
                                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }
                                `}
                            >
                                <FileText className="h-4 w-4" />
                                PDS
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Main content */}
           {/* Main content – less padding on mobile */}
<main className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
    {children}
</main>

            <Toast />

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setShowLogoutModal(false)}
                    />
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
                        <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Are you sure you want to log out? You will need to sign in again to access your account.
                        </p>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                            >
                                Confirm Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
