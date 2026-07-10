import { useState, useRef, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Check,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    Home,
    User,
    MapPin,
    Users,
    GraduationCap,
    Award,
    Briefcase,
    Handshake,
    BookOpen,
    FileText,
    ClipboardList,
    Phone,
    Paperclip,
    CheckCircle,
} from 'lucide-react';
import PersonalInfo from './Sections/PersonalInfo';
import Addresses from './Sections/Addresses';
import FamilyMembers from './Sections/FamilyMembers';
import Education from './Sections/Education';
import Eligibility from './Sections/Eligibility';
import WorkExperience from './Sections/WorkExperience';
import VoluntaryWork from './Sections/VoluntaryWork';
import Trainings from './Sections/Trainings';
import OtherInfo from './Sections/OtherInfo';
import Questionnaire from './Sections/Questionnaire';
import References from './Sections/References';
import Documents from './Sections/Documents';
import Review from './Review';

const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'eligibility', label: 'Eligibility', icon: Award },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'voluntary', label: 'Voluntary Work', icon: Handshake },
    { id: 'trainings', label: 'Trainings', icon: BookOpen },
    { id: 'other', label: 'Other Info', icon: FileText },
    { id: 'questionnaire', label: 'Questionnaire', icon: ClipboardList },
    { id: 'references', label: 'References', icon: Phone },
    { id: 'documents', label: 'Documents', icon: Paperclip },
    { id: 'review', label: 'Review & Submit', icon: CheckCircle },
];

const componentMap = {
    personal: PersonalInfo,
    addresses: Addresses,
    family: FamilyMembers,
    education: Education,
    eligibility: Eligibility,
    experience: WorkExperience,
    voluntary: VoluntaryWork,
    trainings: Trainings,
    other: OtherInfo,
    questionnaire: Questionnaire,
    references: References,
    documents: Documents,
    review: Review,
};

export default function Stepper() {
    const { applicant } = usePage().props;
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = sections.length;
    const scrollContainerRef = useRef(null);

    const isEditable = ['invited', 'pds_in_progress'].includes(applicant.status);
    const isSubmitted = applicant.status === 'pds_submitted';
    const isReadonly = isSubmitted;

    const CurrentComponent = componentMap[sections[currentStep].id];

    const goToStep = (index) => {
        if (index >= 0 && index < totalSteps) setCurrentStep(index);
    };

    const nextStep = () => goToStep(currentStep + 1);
    const prevStep = () => goToStep(currentStep - 1);

    const getStepStatus = (index) => {
        if (index < currentStep) return 'completed';
        if (index === currentStep) return 'active';
        return 'pending';
    };

    // Auto‑scroll to active step
    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const activeElement = container.querySelector('[data-step-index="' + currentStep + '"]');
            if (activeElement) {
                const containerWidth = container.offsetWidth;
                const elementLeft = activeElement.offsetLeft;
                const elementWidth = activeElement.offsetWidth;
                const scrollTo = elementLeft - (containerWidth / 2) + (elementWidth / 2);
                container.scrollTo({ left: scrollTo, behavior: 'smooth' });
            }
        }
    }, [currentStep]);

    // Not invited state
    if (!isEditable && !isSubmitted) {
        return (
            <AuthenticatedLayout>
                <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
                        <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800">Not Yet Invited</h2>
                        <p className="text-gray-600 mt-2">
                            You have not been invited to complete your Personal Data Sheet yet.
                            Please wait for HR to send you an invitation.
                        </p>
                        <Link
                            href={route('applicant.dashboard')}
                            className="inline-flex items-center mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <Home className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <div className="max-w-6xl mx-auto py-4 sm:py-6 px-3 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <h1 className="text-lg sm:text-2xl font-bold text-white">Personal Data Sheet (PDS)</h1>
                                <p className="text-blue-100 text-xs sm:text-sm mt-0.5">
                                    {isReadonly
                                        ? 'Your PDS has been submitted and is now read‑only.'
                                        : 'Complete all sections below. Fields marked with * are required.'}
                                </p>
                            </div>
                            {isReadonly && (
                                <Link
                                    href={route('applicant.dashboard')}
                                    className="inline-flex items-center px-3 py-1.5 bg-white/20 text-white rounded-lg hover:bg-white/30 text-xs sm:text-sm"
                                >
                                    <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Status notice (submitted) */}
                    {isSubmitted && (
                        <div className="m-3 sm:m-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start space-x-2">
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <p className="text-xs sm:text-sm text-blue-700">
                                Your PDS has been submitted successfully. You can review all sections below,
                                but no changes can be made.
                            </p>
                        </div>
                    )}

                   {/* Stepper area */}
<div className="px-3 sm:px-6 pt-4 sm:pt-6 pb-2">
    {/* Progress bar + step counter + dropdown (mobile only) */}
    <div className="relative mb-3 sm:mb-4">
        <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
                <div className="overflow-hidden h-1.5 sm:h-2 rounded-full bg-gray-200">
                    <div
                        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
                    />
                </div>
            </div>
            <div className="text-xs text-gray-400 whitespace-nowrap">
                {currentStep + 1} / {totalSteps}
            </div>
            {/* Dropdown step selector – visible on mobile only */}
            <select
                value={currentStep}
                onChange={(e) => goToStep(parseInt(e.target.value))}
                className="md:hidden text-xs border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
                {sections.map((section, idx) => (
                    <option key={idx} value={idx}>
                        {idx + 1}. {section.label}
                    </option>
                ))}
            </select>
        </div>
    </div>

    {/* Step indicators – horizontally scrollable, labels hidden on mobile */}
    <div className="relative">
        <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto overflow-y-visible pb-2 gap-1 sm:gap-2 scroll-smooth scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {sections.map((section, index) => {
                const status = getStepStatus(index);
                const Icon = section.icon;
                return (
                    <button
                        key={section.id}
                        data-step-index={index}
                        onClick={() => goToStep(index)}
                        className={`
                            flex flex-col items-center group focus:outline-none flex-shrink-0 px-1 sm:px-2 py-1 rounded-lg transition-all duration-200
                            ${status === 'active' ? 'bg-blue-50' : 'hover:bg-gray-50'}
                        `}
                        title={section.label}
                        aria-current={status === 'active' ? 'step' : undefined}
                    >
                        <div
                            className={`
                                w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-200
                                ${status === 'completed' ? 'bg-green-500 border-green-500 text-white shadow-sm' :
                                  status === 'active' ? 'bg-blue-600 border-blue-600 text-white ring-2 ring-blue-100 shadow-md' :
                                  'bg-white border-gray-300 text-gray-400 group-hover:border-blue-400'}
                            `}
                        >
                            {status === 'completed' ? (
                                <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                            ) : (
                                <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                            )}
                        </div>
                        {/* Label hidden on mobile, visible on sm+ */}
                        <span className={`text-[9px] sm:text-[10px] mt-1 whitespace-nowrap hidden sm:block ${status === 'active' ? 'text-blue-700 font-semibold' : 'text-gray-500'}`}>
                            {section.label}
                        </span>
                    </button>
                );
            })}
        </div>
    </div>
</div>

{/* 🚫 Remove the entire tabs block – it's redundant */}

                    {/* Current section content */}
                    <div className="p-4 sm:p-6 min-h-[280px] sm:min-h-[400px]">
                        <CurrentComponent applicant={applicant} readonly={isReadonly} />
                    </div>

                    {/* Navigation buttons */}
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-3 border-t border-gray-100">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className={`
                                w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 sm:py-2 text-sm font-medium rounded-lg transition
                                ${currentStep === 0
                                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300'}
                            `}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1.5" />
                            Previous
                        </button>

                        {isReadonly && currentStep === totalSteps - 1 ? (
                            <Link
                                href={route('applicant.dashboard')}
                                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 sm:py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800"
                            >
                                <Home className="h-4 w-4 mr-1.5" />
                                Return to Dashboard
                            </Link>
                        ) : (
                            <button
                                onClick={nextStep}
                                disabled={currentStep === totalSteps - 1}
                                className={`
                                    w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 sm:py-2 text-sm font-medium rounded-lg transition
                                    ${currentStep === totalSteps - 1
                                        ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                                        : 'text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800'}
                                `}
                            >
                                Next
                                <ChevronRight className="h-4 w-4 ml-1.5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
