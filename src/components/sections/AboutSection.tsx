import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '../Icons';

interface AboutSectionProps {
    isFullPage?: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ isFullPage = false }) => {
    const navigate = useNavigate();

    return (
        <section id="about" className={`py-24 lg:py-40 px-6 lg:px-20 bg-studio-base relative overflow-hidden ${isFullPage ? 'min-h-screen' : ''}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
                <div className="lg:col-span-6">
                    <span className="text-studio-blue font-mono text-xs uppercase tracking-widest mb-6 block">05 — The Studio</span>
                    <h2 className="font-display text-4xl lg:text-6xl leading-[1.1] mb-8">
                        Design That Speaks. <br />
                        <span className="text-gray-400">Engineering That Performs.</span>
                    </h2>
                    <div className="space-y-6 text-studio-gray font-sans font-light text-lg leading-relaxed max-w-lg">
                        <p>
                            Aesthetix Studio is led by its founder, a full-stack developer and UI/UX designer based in Falaknuma, Hyderabad, passionate about creating aesthetic and clean digital work.
                        </p>
                        <p>
                            With over 3+ years of professional experience across design and development, the studio delivers solutions specializing in React, Next.js, and Modern UI Frameworks.
                        </p>
                        {!isFullPage && (
                            <div className="mt-8">
                                <button
                                    onClick={() => navigate('/about')}
                                    className="inline-flex items-center gap-4 px-10 py-4 border border-studio-dark hover:bg-studio-dark hover:text-white transition-all duration-300 group"
                                >
                                    <span className="uppercase tracking-widest text-xs font-medium">Read Our Full Story</span>
                                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mt-12 flex flex-col md:flex-row gap-12">
                        <div>
                            <span className="block text-4xl font-display font-medium mb-1">10+</span>
                            <span className="text-xs uppercase tracking-widest text-gray-400">Clients Served</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-display font-medium mb-1">25+</span>
                            <span className="text-xs uppercase tracking-widest text-gray-400">Projects Delivered</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-display font-medium mb-1">3+</span>
                            <span className="text-xs uppercase tracking-widest text-gray-400">Years Experience</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-6 relative h-full min-h-[400px]">
                    <div className="absolute inset-0 bg-gray-200">
                        <img
                            src="/images/about.webp"
                            alt="Studio Atmosphere"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                    <div className="absolute -bottom-8 -left-8 bg-white p-8 shadow-xl max-w-xs hidden md:block">
                        <p className="font-display text-lg italic text-gray-800">
                            "Simplicity is the ultimate sophistication."
                        </p>
                    </div>
                </div>
            </div>

            {isFullPage && (
                <div className="mt-32 pt-24 border-t border-gray-100">
                    <div className="max-w-4xl mx-auto">
                        <span className="block font-mono text-studio-blue text-xs mb-8 uppercase tracking-[0.3em] text-center">Our Philosophy</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                            <div>
                                <h3 className="font-display text-2xl font-bold mb-4 uppercase tracking-tight">Detail Obsession</h3>
                                <p className="font-sans text-gray-600 font-light leading-relaxed">
                                    We believe the magic happens in the last 10%. We obsess over spacing, typography, motion, and interaction to ensure every pixel serves a purpose.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-display text-2xl font-bold mb-4 uppercase tracking-tight">Human Centric</h3>
                                <p className="font-sans text-gray-600 font-light leading-relaxed">
                                    Before we write a single line of code, we work to understand the human on the other side of the screen. Our designs solve real problems for real people.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-display text-2xl font-bold mb-4 uppercase tracking-tight">Tech Integrity</h3>
                                <p className="font-sans text-gray-600 font-light leading-relaxed">
                                    Quality code is just as important as quality design. We build with modern, scalable, and secure technologies that stand the test of time.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-display text-2xl font-bold mb-4 uppercase tracking-tight">Design Unity</h3>
                                <p className="font-sans text-gray-600 font-light leading-relaxed">
                                    Consistency is institutionalized. Every service we offer is rooted in a unified design language that builds trust and brand equity.
                                </p>
                            </div>
                        </div>

                        <div className="mt-20 flex flex-wrap justify-center gap-12 pt-16 border-t border-gray-100">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-studio-blue transition-colors">LinkedIn Profile — Experience</a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-studio-blue transition-colors">GitHub Repository — Technical Expertise</a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AboutSection;
