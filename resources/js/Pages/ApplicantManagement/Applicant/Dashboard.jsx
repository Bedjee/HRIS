import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    User,
    FileText,
    CheckCircle,
    Clock,
    AlertCircle,
    ArrowRight,
    Calendar,
    Briefcase,
    Award,
    TrendingUp,
} from 'lucide-react';

export default function Dashboard() {
    const { auth, applicant } = usePage().props;

    if (!applicant) {
        return (
            <AuthenticatedLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <Clock className="h-12 w-12 text-blue-500 animate-pulse mx-auto" />
                        <p className="mt-4 text-gray-500">Loading your application...</p>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    const statusConfig = {
        registered: {
            label: 'Registration Complete',
            description: 'Awaiting invitation from HR to start your PDS.',
            icon: CheckCircle,
            color: 'text-yellow-600',
            bg: 'bg-yellow-50',
            border: 'border-yellow-300',
            progress: 20,
        },
        invited: {
            label: 'You’ve Been Invited!',
            description: 'Start your Personal Data Sheet (PDS) now.',
            icon: FileText,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-300',
            progress: 40,
        },
        pds_in_progress: {
            label: 'PDS In Progress',
            description: 'Continue filling out your PDS form.',
            icon: FileText,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            border: 'border-indigo-300',
            progress: 60,
        },
        pds_submitted: {
            label: 'PDS Submitted',
            description: 'Your PDS is under review by HR.',
            icon: Clock,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            border: 'border-purple-300',
            progress: 80,
        },
        under_review: {
            label: 'Under Review',
            description: 'HR is currently evaluating your application.',
            icon: AlertCircle,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            border: 'border-orange-300',
            progress: 85,
        },
        verified: {
            label: 'Verified!',
            description: 'Your application has been verified. You are now a candidate for hiring.',
            icon: Award,
            color: 'text-green-600',
            bg: 'bg-green-50',
            border: 'border-green-300',
            progress: 95,
        },
        hired: {
            label: 'Hired!',
            description: 'Congratulations! You have been hired. Welcome aboard!',
            icon: Briefcase,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            border: 'border-emerald-300',
            progress: 100,
        },
        rejected: {
            label: 'Application Rejected',
            description: 'We appreciate your interest. You may reapply in the future.',
            icon: AlertCircle,
            color: 'text-red-600',
            bg: 'bg-red-50',
            border: 'border-red-300',
            progress: 0,
        },
    };

    const currentStatus = statusConfig[applicant.status] || statusConfig.registered;

    const getAction = () => {
        if (['invited', 'pds_in_progress'].includes(applicant.status)) {
            return {
                label: applicant.status === 'invited' ? 'Start Your PDS' : 'Continue PDS',
                href: route('applicant.pds'),
                icon: FileText,
            };
        }
        return null;
    };

    const nextAction = getAction();

    const stats = [
        { label: 'Application No.', value: applicant.application_no, icon: FileText },
        { label: 'Status', value: currentStatus.label, icon: CheckCircle },
        { label: 'Days Active', value: applicant.days_active ?? '—', icon: Calendar },
        { label: 'Progress', value: `${applicant.completion_percentage ?? 0}%`, icon: TrendingUp },
    ];

    const timelineSteps = [
        { label: 'Registered', status: applicant.timeline?.registered?.status || 'pending', date: applicant.timeline?.registered?.date || '—' },
        { label: 'Invited', status: applicant.timeline?.invited?.status || 'pending', date: applicant.timeline?.invited?.date || '—' },
        { label: 'PDS Submitted', status: applicant.timeline?.submitted?.status || 'pending', date: applicant.timeline?.submitted?.date || '—' },
        { label: 'Verified', status: applicant.timeline?.verified?.status || 'pending', date: applicant.timeline?.verified?.date || '—' },
        { label: 'Hired', status: applicant.timeline?.hired?.status || 'pending', date: applicant.timeline?.hired?.date || '—' },
    ];

    return (
        <AuthenticatedLayout>
            <div className="space-y-6 sm:space-y-8">
                {/* Welcome header */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-100/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{auth.user.name}</span>!
                            </h1>
                            <p className="mt-1 text-sm sm:text-base text-gray-600">
                                Here’s an overview of your application progress.
                            </p>
                        </div>
                        {nextAction && (
                            <Link
                                href={nextAction.href}
                                className="mt-4 sm:mt-0 inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                            >
                                <nextAction.icon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                {nextAction.label}
                                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Quick stats – responsive grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-3 sm:p-4 border border-gray-100/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
                                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main status card */}
                <div className={`rounded-2xl border ${currentStatus.bg} ${currentStatus.border} p-4 sm:p-6 md:p-8 shadow-sm`}>
                    <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className={`p-2 sm:p-3 rounded-full bg-white/50 ${currentStatus.color}`}>
                            <currentStatus.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{currentStatus.label}</h2>
                            <p className="text-sm sm:text-base text-gray-700 mt-1">{currentStatus.description}</p>
                            <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000 ease-out"
                                    style={{ width: `${applicant.completion_percentage ?? 0}%` }}
                                ></div>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">{applicant.completion_percentage ?? 0}% complete</p>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100/50">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Application Journey</h3>
                    <div className="relative">
                        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        {timelineSteps.map((step, idx) => (
                            <div key={idx} className="relative pl-10 pb-6 last:pb-0">
                                <div className={`absolute left-0 top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 ${
                                    step.status === 'done' ? 'bg-green-500 border-green-500' :
                                    step.status === 'active' ? 'bg-blue-500 border-blue-500 animate-pulse' :
                                    'bg-white border-gray-300'
                                }`}></div>
                                <div>
                                    <p className={`text-sm sm:text-base font-medium ${
                                        step.status === 'done' ? 'text-gray-900' :
                                        step.status === 'active' ? 'text-blue-700' :
                                        'text-gray-400'
                                    }`}>
                                        {step.label}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-500">{step.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rejected message */}
                {applicant.status === 'rejected' && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 text-center">
                        <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-red-500 mx-auto mb-2" />
                        <h3 className="text-lg sm:text-xl font-bold text-red-700">We’re sorry</h3>
                        <p className="text-sm sm:text-base text-red-600">Your application was not successful this time. You may apply again in the future.</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
