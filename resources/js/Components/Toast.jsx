import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function Toast() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    useEffect(() => {
        console.log('🔍 Flash data received in Toast:', flash); // <-- ADD THIS
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
        } else if (flash?.warning) {
            setMessage(flash.warning);
            setType('warning');
            setVisible(true);
        }
    }, [flash]); // ✅ triggers when flash changes

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => setVisible(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible) return null;

    const icons = {
        success: <CheckCircle className="h-5 w-5 text-green-500" />,
        error: <XCircle className="h-5 w-5 text-red-500" />,
        warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    };

    const colors = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    };

    return (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full animate-slide-in-right">
            <div className={`rounded-xl border p-4 shadow-lg flex items-start space-x-3 ${colors[type]}`}>
                {icons[type]}
                <div className="flex-1">
                    <p className="text-sm font-medium">{message}</p>
                </div>
                <button onClick={() => setVisible(false)} className="text-gray-400 hover:text-gray-600 transition">
                    <XCircle className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
