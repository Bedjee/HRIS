// resources/js/Pages/Auth/Login.jsx
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <div className="relative mt-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="block w-full rounded-lg border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                            placeholder="you@example.com"
                            autoComplete="username"
                            autoFocus
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="relative mt-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="block w-full rounded-lg border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-sm">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                        />
                        <span className="text-gray-600">Remember me</span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
                >
                    {processing ? 'Signing in...' : 'Sign in'}
                </button>

                <p className="text-center text-sm text-gray-600">
                    Don’t have an account?{' '}
                    <Link href={route('register')} className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition">
                        Sign up
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
