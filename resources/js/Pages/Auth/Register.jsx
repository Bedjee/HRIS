// resources/js/Pages/Auth/Register.jsx
import { Head, Link, useForm } from '@inertiajs/react';
import { User, Mail, Lock } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <div className="relative mt-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="block w-full rounded-lg border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                            placeholder="John Doe"
                            autoComplete="name"
                            autoFocus
                            required
                        />
                    </div>
                    <InputError message={errors.name} className="mt-1" />
                </div>

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
                            required
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
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <div className="relative mt-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="block w-full rounded-lg border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-1" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
                >
                    {processing ? 'Creating account...' : 'Create account'}
                </button>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href={route('login')} className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition">
                        Sign in
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
