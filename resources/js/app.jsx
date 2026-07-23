import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { LoadingProvider, useLoading } from '@/Providers/LoadingProvider';
import GlobalLoading from '@/Components/GlobalLoading';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// ✅ This component wraps the main App and renders the global loading overlay
function AppWithGlobalLoading({ children }) {
    const { isLoading, loadingMessage } = useLoading();
    return (
        <>
            <GlobalLoading isLoading={isLoading} message={loadingMessage} />
            {children}
        </>
    );
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <LoadingProvider>
                <AppWithGlobalLoading>
                    <App {...props} />
                </AppWithGlobalLoading>
            </LoadingProvider>
        );
    },
    // ✅ You can keep the default Inertia progress bar as a fallback,
    // but it's now redundant with your custom one.
    // Remove or keep as you like.

});
