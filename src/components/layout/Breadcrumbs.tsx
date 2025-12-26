import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
    const { pathname } = useLocation();

    // Don't show on home page variants
    if (pathname === '/' || pathname === '/home' || pathname === '/index.html') return null;

    const pathSegments = pathname.split('/').filter(Boolean);
    const pageName = pathSegments[0]?.charAt(0).toUpperCase() + pathSegments[0]?.slice(1);

    return (
        <div className="px-6 lg:px-20 py-4 bg-studio-base/50 backdrop-blur-sm border-b border-gray-100">
            <nav className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
                <Link
                    to="/home"
                    className="hover:text-studio-blue transition-colors duration-300 flex items-center gap-2"
                >
                    <span>Home</span>
                </Link>
                <span className="text-gray-200">/</span>
                <span className="text-studio-dark font-medium">{pageName}</span>
            </nav>
        </div>
    );
};

export default Breadcrumbs;
