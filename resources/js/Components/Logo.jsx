import { Link } from '@inertiajs/react';
import logoSrc from '../../images/sys_logo.png'; // or use a URL

// Modified Logo.jsx
export default function Logo({
    className = '',
    width = 400,
    height = 'auto', // allow auto
    linkTo = '/',
    showName = true,
    name = 'SyntraHR',
    src = logoSrc,
}) {
    return (
        <Link href={linkTo} className={`inline-flex items-center ${className}`}>
            <img src={src} alt={`${name} Logo`} width={width} height={height} className="object-contain" />
            {showName && <span className="ml-2 text-xl font-bold text-gray-900">{name}</span>}
        </Link>
    );
}
