import React, { useState } from 'react';
import { ArrowRight } from '../Icons';
import { Project } from '../../types';
import { useNavigate } from 'react-router-dom';

const PROJECTS: Project[] = [
    {
        id: 1,
        title: 'Minimal SaaS Dashboard',
        category: 'Analytics UI — Glassmorphism UI',
        year: '2025',
        image: '/images/project-saas-dashboard.png',
        color: 'bg-studio-blue',
        size: 'large'
    },
    {
        id: 2,
        title: 'Creative Agency Website',
        category: 'Editorial Design — Motion UI',
        year: '2024',
        image: '/images/project-creative-agency.png',
        color: 'bg-studio-red',
        size: 'tall'
    },
    {
        id: 3,
        title: 'E-Commerce Product Page',
        category: 'Retail Experience',
        year: '2024',
        image: '/images/project-ecommerce.png',
        color: 'bg-studio-mint',
        size: 'normal'
    },
    {
        id: 4,
        title: 'Business Consulting Platform',
        category: 'Corporate Identity',
        year: '2024',
        image: '/images/project-consulting.png',
        color: 'bg-studio-yellow',
        size: 'normal'
    },
    {
        id: 5,
        title: 'Luxury Real Estate',
        category: 'Visual Identity — Premium UI',
        year: '2025',
        image: '/images/hero.webp',
        color: 'bg-studio-blue',
        size: 'normal'
    },
    {
        id: 6,
        title: 'Fintech Mobile App',
        category: 'Product Design — Glassmorphism',
        year: '2024',
        image: '/images/hero-mobile.webp',
        color: 'bg-studio-red',
        size: 'large'
    }
];

interface WorkSectionProps {
    showViewAll?: boolean;
    isFullPage?: boolean;
}

const CATEGORIES = ['All', 'Analytics UI', 'Editorial Design', 'Retail Experience', 'Corporate Identity', 'Visual Identity', 'Product Design'];

const WorkSection: React.FC<WorkSectionProps> = ({ showViewAll = true, isFullPage = false }) => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('All');

    // Use case-insensitive substring match so categories like "Analytics UI — Glassmorphism UI" match "Analytics UI"
    const filteredProjects = activeFilter === 'All'
        ? PROJECTS
        : PROJECTS.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));

    // On home page, only show the first 4 projects from the filtered list
    const displayedProjects = isFullPage ? filteredProjects : filteredProjects.slice(0, 4);

    return (
        <section id="work" className={`py-24 lg:py-32 bg-white ${isFullPage ? 'min-h-screen' : ''}`}>
            <div className="px-6 lg:px-20 mb-16 flex flex-col md:flex-row items-end justify-between gap-6">
                <div>
                    <span className="block font-mono text-studio-blue text-xs mb-4 uppercase tracking-widest">04 — Portfolio</span>
                    <h2 className="font-display text-4xl lg:text-6xl font-medium leading-none">
                        {isFullPage ? 'Complete Portfolio' : 'Selected Projects'}
                    </h2>
                </div>
                {isFullPage && (
                    <div className="flex flex-wrap gap-4 mt-8 lg:mt-0">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`text-[10px] font-mono uppercase tracking-widest px-4 py-2 border transition-all duration-300 ${activeFilter === cat ? 'bg-studio-dark text-white border-studio-dark' : 'text-gray-400 border-gray-100 hover:border-gray-300'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}
                {!isFullPage && (
                    <div className="hidden lg:block text-right">
                        <div className="font-mono text-xs text-gray-400 mb-1">RECENT DELIVERABLES</div>
                        <div className="font-display text-xl">2024 — 2025</div>
                    </div>
                )}
            </div>

            {/* Masonry-style Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 px-6 lg:px-20 transition-all duration-500">
                {displayedProjects.map((project) => (
                    <div
                        key={project.id}
                        className={`group relative cursor-pointer ${project.size === 'tall' && !isFullPage ? 'md:row-span-2' : ''} ${project.size === 'large' && !isFullPage ? 'md:col-span-2' : ''} ${isFullPage ? 'md:col-span-1' : ''}`}
                        onClick={() => !isFullPage && navigate('/work')}
                    >
                        <div className="relative overflow-hidden w-full h-full aspect-[4/3] min-h-[400px] bg-gray-50 border border-gray-100">
                            <img
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                                decoding="async"
                                className={`w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110`}
                            />
                            <div className="absolute inset-0 bg-studio-dark/0 group-hover:bg-studio-dark/40 transition-colors duration-500"></div>

                            {/* Overlay Content */}
                            <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className={`inline-block w-8 h-[2px] ${project.color}`}></span>
                                    <span className="text-white font-mono text-xs uppercase tracking-widest">{project.category}</span>
                                </div>
                                <h3 className="text-white font-display text-2xl lg:text-3xl font-bold mb-4">{project.title}</h3>
                                <div className="flex items-center gap-2 text-white text-[10px] uppercase tracking-[0.2em] font-medium border-b border-white/30 pb-1 self-start">
                                    View Project <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>

                            {/* Always visible year */}
                            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur text-black px-3 py-1 text-[10px] font-mono tracking-widest">
                                {project.year}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showViewAll && !isFullPage && (
                <div className="mt-20 text-center">
                    <button
                        onClick={() => navigate('/work')}
                        className="inline-flex items-center gap-4 px-10 py-4 border border-studio-dark hover:bg-studio-dark hover:text-white transition-all duration-300 group"
                    >
                        <span className="uppercase tracking-widest text-xs font-medium">Explore Full Portfolio</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            )}

            {isFullPage && displayedProjects.length === 0 && (
                <div className="py-20 text-center">
                    <p className="font-display text-2xl text-gray-400">No projects found in this category.</p>
                </div>
            )}
        </section>
    );
};

export default WorkSection;
