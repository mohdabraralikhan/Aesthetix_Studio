import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, Globe } from '../components/Icons';
import WorkSection from '../components/sections/WorkSection';
import ServicesSection from '../components/sections/ServicesSection';
import ProcessSection from '../components/sections/ProcessSection';
import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';

const Home: React.FC = () => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Aesthetix Studio | Design-Forward Development Studio Hyderabad</title>
                <meta name="description" content="Aesthetix Studio is a top-rated digital studio in Hyderabad, specializing in premium web design, UI/UX development, and modern web experiences for brands worldwide." />
                <meta name="keywords" content="Web Design Hyderabad, Digital Studio Hyderabad, Aesthetix Studio, Premium Website Design, UI/UX Development Studio India, Modern Web Experiences" />
            </Helmet>

            <section id="hero" className="relative min-h-[90vh] grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-studio-base">
                {/* Decorative Grid Lines */}
                <div className="absolute inset-0 pointer-events-none grid grid-cols-1 lg:grid-cols-12 gap-0 z-0">
                    <div className="hidden lg:block lg:col-span-1 border-r border-gray-200/50 h-full"></div>
                    <div className="hidden lg:block lg:col-span-6 border-r border-gray-200/50 h-full"></div>
                    <div className="hidden lg:block lg:col-span-1 border-r border-gray-200/50 h-full"></div>
                </div>

                {/* Left Content */}
                <div className="lg:col-span-7 flex flex-col justify-center px-6 lg:px-20 py-20 lg:py-0 relative z-10">
                    <div className="absolute top-1/2 left-6 lg:left-8 -translate-y-1/2 writing-vertical text-xs tracking-[0.3em] uppercase text-gray-400 hidden lg:block">
                        Digital Studio / 2025
                    </div>

                    <div className="mb-8 flex items-center gap-3">
                        <span className="w-12 h-[1px] bg-studio-blue"></span>
                        <span className="text-studio-blue font-mono text-xs uppercase tracking-widest">Aesthetixstudio</span>
                    </div>

                    <h1 className="font-display font-medium text-5xl lg:text-7xl xl:text-8xl leading-[1.05] mb-8 text-studio-dark tracking-tight">
                        Design-Forward <br />
                        Development <span className="text-gray-400 italic font-light">Studio.</span>
                    </h1>

                    <p className="font-sans font-light text-lg lg:text-xl text-studio-gray max-w-lg leading-relaxed mb-12">
                        Aesthetixstudio is a design-forward development studio building modern websites and UI systems for brands that value precision, clarity, and visual identity.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <button
                            onClick={() => scrollToSection('work')}
                            className="group flex items-center gap-3 text-studio-dark hover:text-studio-blue transition-colors duration-300"
                        >
                            <span className="uppercase tracking-widest text-sm font-medium border-b border-studio-dark group-hover:border-studio-blue pb-1">View Work</span>
                            <ArrowDown className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="px-8 py-3 border border-gray-300 text-sm uppercase tracking-widest hover:border-studio-dark hover:bg-studio-dark hover:text-white transition-all duration-300"
                        >
                            Start a Project
                        </button>
                    </div>
                </div>

                {/* Right Visual */}
                <div className="lg:col-span-5 relative bg-gray-100 min-h-[50vh] lg:min-h-screen border-l border-gray-200">
                    <img
                        src="/images/hero.webp"
                        srcSet="/images/hero-mobile.webp 800w, /images/hero.webp 1920w"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        alt="Abstract Architectural Form"
                        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-70"
                    />
                    <div className="absolute inset-0 bg-studio-base/20"></div>

                    <div className="absolute bottom-12 left-0 w-full px-6 lg:px-12">
                        <div className="bg-white/90 backdrop-blur-md p-8 shadow-xl max-w-sm ml-auto border-t-2 border-studio-blue">
                            <div className="flex justify-between items-start mb-4">
                                <span className="font-mono text-xs text-gray-500 uppercase">Featured Project</span>
                                <Globe className="w-4 h-4 text-studio-blue" />
                            </div>
                            <h3 className="font-display text-xl font-bold mb-1">Minimal SaaS Dashboard</h3>
                            <p className="text-sm text-gray-600 mb-0 leading-relaxed">A clean, data-oriented interface for an analytics product.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 lg:px-20 bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <h2 className="font-display text-4xl lg:text-5xl font-medium leading-tight">
                        Where Design <br /> Meets <span className="text-studio-blue">Engineering.</span>
                    </h2>
                    <div className="space-y-6">
                        <p className="font-sans text-lg font-light text-gray-600 leading-relaxed">
                            We create refined, minimal, and high-impact digital experiences.
                            Every interface is built on a foundation of clean aesthetics, structured systems, and thoughtful interactions.
                        </p>
                        <p className="font-sans text-lg font-light text-gray-600 leading-relaxed">
                            Our approach blends UI/UX craft with full-stack engineering to deliver work that’s both beautiful and performant.
                        </p>
                        <div className="pt-4 border-t border-gray-100">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                                Local Expertise — <span className="text-studio-blue">Top-rated web designers in Telangana</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <ServicesSection />
            <ProcessSection />
            <WorkSection showViewAll={true} />
            <AboutSection />
            <ContactSection />
        </>
    );
};

export default Home;
