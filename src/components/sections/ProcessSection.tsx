import React from 'react';
import { ProcessStep } from '../../types';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '../Icons';

const PROCESS_STEPS: ProcessStep[] = [
    {
        id: 'p1',
        step: '01',
        title: 'UI/UX Discovery Phase',
        description: 'Comprehensive Discovery Phase where we audit your brand and establish the strategic foundation for your digital product.'
    },
    {
        id: 'p2',
        step: '02',
        title: 'Collaborative Design Exploration',
        description: 'Concepts, color systems, and modern compositions crafted through collaborative exploration to ensure a unique visual identity.'
    },
    {
        id: 'p3',
        step: '03',
        title: 'Agile Design-to-Code Workflow',
        description: 'Modern, efficient Agile Design-to-Code Workflow utilizing React and scalable web architecture for pixel-perfect results.'
    },
    {
        id: 'p4',
        step: '04',
        title: 'Launch & Optimization Strategy',
        description: 'Rigorous deployment and optimization strategy focused on performance, SEO, and long-term scalability.'
    }
];

interface ProcessSectionProps {
    isFullPage?: boolean;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ isFullPage = false }) => {
    const navigate = useNavigate();

    return (
        <section id="process" className={`py-24 lg:py-32 bg-studio-dark text-white px-6 lg:px-20 overflow-hidden ${isFullPage ? 'min-h-screen' : ''}`}>
            <div className={`mb-20 ${isFullPage ? 'max-w-4xl' : ''}`}>
                <span className="block font-mono text-studio-mint text-xs mb-4 uppercase tracking-widest">03 — Process</span>
                <h2 className="font-display text-4xl lg:text-6xl font-medium mb-8">How We Work.</h2>
                {isFullPage && (
                    <p className="font-sans text-gray-400 font-light text-xl leading-relaxed">
                        Our workflow is designed for transparency and precision. We break down the complex into manageable, aesthetic milestones that ensure your vision is realized exactly as intended.
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {PROCESS_STEPS.map((step) => (
                    <div
                        key={step.id}
                        className={`relative group cursor-pointer ${!isFullPage ? 'hover:scale-[1.02] transition-transform' : ''}`}
                        onClick={() => !isFullPage && navigate('/process')}
                    >
                        <div className="w-full h-[1px] bg-gray-800 mb-8 group-hover:bg-studio-mint transition-colors duration-500"></div>
                        <span className="block font-mono text-studio-mint text-sm mb-4 tracking-widest">{step.step}</span>
                        <h3 className="font-display text-2xl font-medium mb-4">{step.title}</h3>
                        <p className="font-sans text-gray-400 font-light text-sm leading-relaxed">
                            {step.description}
                        </p>
                        {isFullPage && (
                            <div className="mt-8 pt-8 border-t border-gray-800/50">
                                <ul className="space-y-4 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-studio-mint rounded-full"></span> Internal Audit</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-studio-mint rounded-full"></span> Strategy Workshop</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-studio-mint rounded-full"></span> High-Fidelity Specs</li>
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {!isFullPage && (
                <div className="mt-12 text-center">
                    <button
                        onClick={() => navigate('/process')}
                        className="inline-flex items-center gap-4 px-10 py-4 border border-white hover:bg-white hover:text-studio-dark transition-all duration-300 group"
                    >
                        <span className="uppercase tracking-widest text-xs font-medium">View Detailed Process</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            )}

            {isFullPage && (
                <div className="mt-32 p-12 lg:p-20 bg-studio-gray/5 border border-white/5 rounded-sm">
                    <div className="max-w-3xl">
                        <h3 className="font-display text-3xl font-medium mb-8">The "Less but Better" Approach.</h3>
                        <p className="font-sans text-gray-400 font-light text-lg leading-relaxed mb-12">
                            We don't believe in unnecessary features or cluttered layouts. Our methodology is rooted in the "Less but Better" philosophy—stripping away the noise to let the core value of your brand shine through with clarity and purpose.
                        </p>
                        <button
                            onClick={() => navigate('/contact')}
                            className="bg-studio-mint text-studio-dark px-10 py-4 text-xs font-mono uppercase tracking-widest hover:bg-white transition-colors duration-300"
                        >
                            Experience the difference
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProcessSection;
