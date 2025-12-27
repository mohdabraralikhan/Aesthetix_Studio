import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import { NavItem } from '../../types';

export const NAV_ITEMS: NavItem[] = [
    { label: 'Work', id: 'work', path: '/work' },
    { label: 'Services', id: 'services', path: '/services' },
    { label: 'Process', id: 'process', path: '/process' },
    { label: 'About', id: 'about', path: '/about' },
    { label: 'Contact', id: 'contact', path: '/contact' },
];

const Layout: React.FC = () => {
    const { pathname } = useLocation();
    const isAdmin = pathname.startsWith('/admin');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="antialiased selection:bg-studio-blue selection:text-white bg-studio-base min-h-screen flex flex-col">
            {!isAdmin && <Navigation navItems={NAV_ITEMS} />}
            <main className={`flex-grow ${isAdmin ? '' : 'pt-20 lg:pt-24'}`}>
                {!isAdmin && <Breadcrumbs />}
                <Outlet />
            </main>
            {!isAdmin && <Footer navItems={NAV_ITEMS} />}
        </div>
    );
};

export default Layout;
