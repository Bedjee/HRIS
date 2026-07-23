import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { router } from '@inertiajs/react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Loading...');

    const showLoading = useCallback((message = 'Loading...') => {
        setLoadingMessage(message);
        setIsLoading(true);
    }, []);

    const hideLoading = useCallback(() => {
        setIsLoading(false);
    }, []);

    // Listen to Inertia navigation events
    useEffect(() => {
        const onStart = () => showLoading('Loading page...');
        const onFinish = () => hideLoading();

        router.on('start', onStart);
        router.on('finish', onFinish);

        return () => {
            router.off('start', onStart);
            router.off('finish', onFinish);
        };
    }, [showLoading, hideLoading]);

    return (
        <LoadingContext.Provider value={{ isLoading, loadingMessage, showLoading, hideLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}

// Custom hook for using loading context
export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
