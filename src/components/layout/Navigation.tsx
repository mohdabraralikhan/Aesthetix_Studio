import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { NavItem } from '../../types';
import { Menu, X } from '../Icons';

interface NavigationProps {
    navItems: NavItem[];
}

const Navigation: React.FC<NavigationProps> = ({ navItems }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isHomePage = pathname === '/' || pathname === '/home' || pathname === '/index.html';

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
        if (isHomePage && ['/work', '/services', '/process', '/about', '/contact'].includes(item.path)) {
            e.preventDefault();
            setIsOpen(false);
            const element = document.getElementById(item.id);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        } else {
            setIsOpen(false);
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#F6F7FB]/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300" role="navigation" aria-label="Main navigation">
                <div className="flex items-center justify-between px-6 py-4 lg:px-12 lg:py-5">
                    <button
                        className="flex items-center gap-2 cursor-pointer group p-2 -m-2 rounded focus:outline-none focus:ring-2 focus:ring-studio-blue focus:ring-offset-2"
                        onClick={() => navigate('/')}
                        aria-label="Aesthetix Studio - Home"
                    >
                        <div className="w-4 h-4 bg-studio-blue transform group-hover:rotate-45 transition-transform duration-300"></div>
                        <span className="font-display font-bold text-xl tracking-tight uppercase">Aesthetix<span className="font-light">studio</span></span>
                    </button>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-12 text-studio-dark">
                        {navItems.map((item) => {
                            const isLinkActive = pathname === item.path;

                            return (
                                <NavLink
                                    key={item.id}
                                    to={item.path}
                                    onClick={(e) => handleNavClick(e, item)}
                                    className={`relative py-2 px-1 font-sans text-xs uppercase tracking-widest transition-all duration-300 border-b-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-studio-blue/50 ${isLinkActive ? 'text-studio-blue font-bold border-studio-blue' : 'border-transparent text-studio-dark hover:text-studio-blue hover:border-studio-blue/30'}`}
                                    aria-current={isLinkActive ? 'page' : undefined}
                                >
                                    {item.label}
                                </NavLink>
                            );
                        })}
                        <button
                            onClick={() => {
                                if (isHomePage) {
                                    const element = document.getElementById('contact');
                                    if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
                                } else {
                                    navigate('/contact');
                                }
                            }}
                            className="bg-studio-dark text-white px-6 py-2.5 text-xs uppercase tracking-wider hover:bg-studio-blue active:scale-95 transition-all duration-300 border border-studio-dark hover:border-studio-blue focus:outline-none focus:ring-2 focus:ring-studio-blue focus:ring-offset-2"
                        >
                            Start Project
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 -m-2 rounded focus:outline-none focus:ring-2 focus:ring-studio-blue"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 z-40 bg-[#F6F7FB] transition-transform duration-500 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role={isOpen ? 'dialog' : 'none'}
                aria-hidden={!isOpen}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {navItems.map((item, index) => {
                        const isLinkActive = pathname === item.path;

                        return (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                onClick={(e) => handleNavClick(e, item)}
                                className={`text-4xl font-display font-light transition-colors duration-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-studio-blue ${isLinkActive ? 'text-studio-blue' : 'hover:text-studio-blue'}`}
                                style={{ transitionDelay: `${index * 50}ms` }}
                                aria-current={isLinkActive ? 'page' : undefined}
                            >
                                <span className="block text-center">{item.label}</span>
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Navigation;
