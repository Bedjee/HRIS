import HRLayout from '@/Layouts/HRLayout';
import { usePage } from '@inertiajs/react';
import { Users, Mail, FileText, CheckCircle, Briefcase, XCircle, Sparkles } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

export default function Dashboard({ stats, monthlyTrend, statusDistribution, recentApplicants }) {
    const { auth } = usePage().props;
    const user = auth.user;

    // Time-based greeting
    const hour = new Date().getHours();
    let greeting = 'Good Evening';
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 17) greeting = 'Good Afternoon';

    // Rotating motivational messages
    const messages = [
        "Ready to hire your next great candidate today?",
        "Let's find the best talent for your organization.",
        "Review applications and make informed hiring decisions.",
        "Welcome back! Here's an overview of today's recruitment activity.",
        "Great teams start with great hires. Let's get started!",
        "Your next top performer is just a few clicks away.",
    ];
    // Pick a consistent message based on the day of the month (so it changes daily)
    const dayOfMonth = new Date().getDate();
    const messageIndex = dayOfMonth % messages.length;
    const welcomeMessage = messages[messageIndex];

    const statusColors = {
        registered: 'bg-yellow-100 text-yellow-800',
        invited: 'bg-blue-100 text-blue-800',
        pds_in_progress: 'bg-indigo-100 text-indigo-800',
        pds_submitted: 'bg-purple-100 text-purple-800',
        under_review: 'bg-orange-100 text-orange-800',
        verified: 'bg-green-100 text-green-800',
        hired: 'bg-emerald-100 text-emerald-800',
        rejected: 'bg-red-100 text-red-800',
    };

    const statusLabels = {
        registered: 'Registered',
        invited: 'Invited',
        pds_in_progress: 'PDS In Progress',
        pds_submitted: 'PDS Submitted',
        under_review: 'Under Review',
        verified: 'Verified',
        hired: 'Hired',
        rejected: 'Rejected',
    };

    const DISTRIBUTION_COLORS = ['#22c55e', '#043e9a', '#ef4444', '#5d5c5b'];
    const distributionData = Object.keys(statusDistribution).map((key) => ({
        name: key,
        value: statusDistribution[key],
    }));

    const metricCards = [
        { label: 'Total Applicants', value: stats.total, icon: Users, color: 'text-blue-600' },
        { label: 'Invited', value: stats.invited, icon: Mail, color: 'text-blue-600' },
        { label: 'PDS Submitted', value: stats.submitted, icon: FileText, color: 'text-purple-600' },
        { label: 'Verified', value: stats.verified, icon: CheckCircle, color: 'text-green-600' },
        { label: 'Hired', value: stats.hired, icon: Briefcase, color: 'text-emerald-600' },
        { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-red-600' },
    ];

    return (
        <HRLayout>
            <div className="space-y-6">
                {/* ✅ Welcome Container */}
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
                    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0xLjEgMC45LTIgMi0yczIgLjkgMiAyLS45IDItMiAyLTIgMiAyLTIgMC0xLjEtLjktMi0yLTIiLz48L2c+PC9nPjwvc3ZnPg==')] bg-repeat" />
                    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start space-x-4">
                            <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex-shrink-0">
                                <Sparkles className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold">
                                    {greeting}, {user?.name || 'HR'}!
                                </h1>
                                <p className="text-blue-100 text-sm sm:text-base mt-1 max-w-2xl">
                                    {welcomeMessage}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                            <span className="text-xs font-medium uppercase tracking-wider text-blue-200">Today</span>
                            <span className="text-sm font-semibold text-white">
                                {new Date().toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {metricCards.map((card, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                            <div className="flex items-center space-x-2">
                                <card.icon className={`h-5 w-5 ${card.color}`} />
                                <span className="text-sm text-gray-500">{card.label}</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Applicants Trend</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={monthlyTrend}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#0646ae"
                                        strokeWidth={2}
                                        activeDot={{ r: 8 }}
                                        name="Applicants"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Applicant Status Distribution</h2>
                        <div className="h-64 flex items-center justify-center">
                            {distributionData.some(d => d.value > 0) ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={distributionData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            paddingAngle={4}
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            labelLine={false}
                                        >
                                            {distributionData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={DISTRIBUTION_COLORS[index % DISTRIBUTION_COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-gray-400 text-sm">No data available.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Applicants */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Applicants</h2>
                    {recentApplicants.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Applied</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentApplicants.map((applicant) => (
                                        <tr key={applicant.id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">
                                                {applicant.personal_information?.first_name} {applicant.personal_information?.last_name}
                                            </td>
                                            <td className="px-4 py-3">{applicant.user?.email}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[applicant.status] || 'bg-gray-100 text-gray-800'}`}>
                                                    {statusLabels[applicant.status] || applicant.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">{new Date(applicant.created_at).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No applicants yet.</p>
                    )}
                </div>
            </div>
        </HRLayout>
    );
}
