import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from '../../types';

interface FooterProps {
    navItems: NavItem[];
}

const Footer: React.FC<FooterProps> = ({ navItems }) => {
    return (
        <footer className="bg-white py-16 px-6 lg:px-12 border-t border-gray-200">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-12">
                <div className="max-w-xs">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-3 h-3 bg-studio-blue"></div>
                        <span className="font-display font-bold text-lg uppercase tracking-tight">Aesthetix<span className="font-light">studio</span></span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Aesthetixstudio is a digital design and development studio crafting aesthetic, high-quality web experiences for clients worldwide.
                    </p>
                </div>

                <div className="flex gap-12 lg:gap-24">
                    <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">Menu</h4>
                        <ul className="space-y-3 text-sm font-medium text-studio-dark">
                            {navItems.map(item => (
                                <li key={item.id}>
                                    <NavLink to={item.path} className="hover:text-studio-blue transition-colors">
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">Legal</h4>
                        <ul className="space-y-3 text-sm font-medium text-studio-dark">
                            <li><a href="/sitemap.xml" className="hover:text-studio-blue transition-colors">Sitemap</a></li>
                            <li><a href="#" className="hover:text-studio-blue transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-studio-blue transition-colors">Terms</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">Connect</h4>
                        <ul className="space-y-3 text-sm font-medium text-studio-dark">
                            <li><a href="#" className="hover:text-studio-blue transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-studio-blue transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-studio-blue transition-colors">GitHub</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-mono uppercase tracking-wide">
                <span>© 2025 Aesthetixstudio. All Rights Reserved.</span>
                <span>Falaknuma, Hyderabad, India</span>
            </div>
        </footer>
    );
};

export default Footer;
