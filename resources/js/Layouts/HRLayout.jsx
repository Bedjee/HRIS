// resources/js/Layouts/HRLayout.jsx
import { useState } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import Logo from '@/Components/Logo';
import { User, LogOut, Menu, X, LayoutDashboard, Users, FileText, CheckCircle, Clock } from 'lucide-react';

export default function HRLayout({ children }) {
    const { auth } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const user = auth.user;
    const { post } = useForm();

    const handleLogout = () => {
        post(route('logout'), {
            onFinish: () => setShowLogoutModal(false),
        });
    };

    const LogoutModal = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
                <p className="mt-2 text-sm text-gray-600">Are you sure you want to log out?</p>
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={() => setShowLogoutModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Cancel
                    </button>
                    <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                        Confirm Logout
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Logo width={50} height={40} showName={true} className="flex-shrink-0" />
                            <span className="ml-3 text-sm font-medium text-gray-500 hidden sm:inline">HR Panel</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden sm:flex sm:items-center sm:space-x-6">
                            <Link href={route('hr.dashboard')} className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                                <LayoutDashboard className="h-4 w-4 mr-1" /> Dashboard
                            </Link>
                            <Link href={route('hr.applicants.index')} className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition border-b-2 border-blue-500 pb-1">
                                <Users className="h-4 w-4 mr-1" /> Applicants
                            </Link>
                            {/* More HR links can be added here later */}
                        </div>

                        <div className="flex items-center">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                            >
                                <User className="h-5 w-5 text-gray-600" />
                                <span className="text-sm font-medium text-gray-700 hidden sm:inline">{user.name}</span>
                                <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center sm:hidden">
                            <button onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)} className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                                {showingNavigationDropdown ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {showingNavigationDropdown && (
                    <div className="sm:hidden bg-white border-t border-gray-200">
                        <div className="pt-2 pb-3 space-y-1">
                            <Link href={route('hr.dashboard')} className="flex items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50">
                                <LayoutDashboard className="h-5 w-5 mr-2" /> Dashboard
                            </Link>
                            <Link href={route('hr.applicants.index')} className="flex items-center pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 bg-blue-50">
                                <Users className="h-5 w-5 mr-2" /> Applicants
                            </Link>
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-4">
                                <User className="h-6 w-6 text-gray-400 mr-2" />
                                <div className="text-base font-medium text-gray-800">{user.name}</div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <button onClick={() => setShowLogoutModal(true)} className="flex items-center w-full px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50">
                                    <LogOut className="h-5 w-5 mr-2" /> Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </main>

            {showLogoutModal && <LogoutModal />}
        </div>
    );
}
