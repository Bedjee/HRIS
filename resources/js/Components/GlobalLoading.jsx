import Logo from '@/Components/Logo';

export default function GlobalLoading({ isLoading, message }) {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-300">
            <div className="flex flex-col items-center space-y-4">
                {/* Animated Logo */}
                <div className="animate-pulse-slow">
                    <Logo width={80} height={80} showName={false} />
                </div>
                <p className="text-gray-600 text-sm font-medium tracking-wide">
                    {message || 'Loading...'}
                </p>
            </div>
        </div>
    );
}
