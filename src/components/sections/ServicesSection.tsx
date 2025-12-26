import React from 'react';
import { Service } from '../../types';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '../Icons';

const SERVICES: Service[] = [
    {
        id: 's1',
        number: '01',
        title: 'UI Design Systems & UX',
        description: 'Creating SaaS Dashboard Design and comprehensive UI Design Systems in Hyderabad. We specialize in Dark Mode UI Standardization and user-centric workflows.',
        color: 'bg-studio-blue'
    },
    {
        id: 's2',
        number: '02',
        title: 'Full-Stack Web Development',
        description: 'Custom React and WordPress development Hyderabad. We build Performance-optimized sites (Core Web Vitals) that are fast, secure, and scalable.',
        color: 'bg-studio-dark'
    },
    {
        id: 's3',
        number: '03',
        title: 'Visual Identity Enhancement',
        description: 'Minimal and modern identity systems for digital-first brands. Color palettes, typography, and visual direction tailored for modern web experiences.',
        color: 'bg-studio-yellow'
    },
    {
        id: 's4',
        number: '04',
        title: 'High-Conversion Redesigns',
        description: 'Transforming legacy products into performance-optimized sites. Website Redesign Services focused on Visual Identity Enhancement and modern performance metrics.',
        color: 'bg-studio-red'
    },
    {
        id: 's5',
        number: '05',
        title: 'Performance & Security',
        description: 'Ongoing Maintenance and Performance Tuning. Focus on Core Web Vitals, security improvements, and UI enhancements to stay ahead of the curve.',
        color: 'bg-studio-mint'
    },
];

const FAQS = [
    {
        q: "What is your typical project timeline?",
        a: "A standard website project takes 4-8 weeks, while complex UI systems or full-stack applications can range from 3-6 months depending on requirements."
    },
    {
        q: "Do you work with startups?",
        a: "Yes, we love working with founders to take ideas from concept to a high-fidelity MVP, focusing on speed-to-market and clean execution."
    },
    {
        q: "What technologies do you use?",
        a: "We primary build with React, Next.js, and TypeScript. For styling, we use Tailwind CSS. Our focus is on modern, performant, and maintainable stacks."
    }
];

interface ServicesSectionProps {
    isFullPage?: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ isFullPage = false }) => {
    const navigate = useNavigate();

    return (
        <section id="services" className={`py-24 lg:py-32 px-6 lg:px-20 bg-studio-base relative ${isFullPage ? 'min-h-screen' : ''}`}>
            {/* Section Header */}
            <div className="flex flex-col mb-16">
                <span className="block font-mono text-studio-blue text-xs mb-4 uppercase tracking-widest">02 — Capabilities</span>
                <h2 className="font-display text-4xl lg:text-3xl font-medium">Core Services</h2>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                {SERVICES.map((service, idx) => (
                    <div
                        key={service.id}
                        className={`group relative bg-white p-10 lg:p-12 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 z-0 hover:z-10 cursor-pointer`}
                        onClick={() => !isFullPage && navigate('/services')}
                    >
                        <div className={`absolute top-0 left-0 w-1 h-full ${service.color} transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top`}></div>

                        <span className="block text-5xl font-display font-bold text-gray-50 group-hover:text-studio-dark transition-colors duration-500 border-b border-gray-100 pb-4 mb-8">{service.number}</span>

                        <h3 className="font-display text-2xl font-medium mb-4">{service.title}</h3>
                        <p className="font-sans text-gray-500 font-light mb-4 leading-relaxed text-sm lg:text-base">
                            {service.description}
                        </p>
                    </div>
                ))}
            </div>

            {isFullPage && (
                <div className="mt-32 max-w-4xl">
                    <div className="mb-16">
                        <span className="block font-mono text-studio-blue text-xs mb-4 uppercase tracking-widest">Questions</span>
                        <h2 className="font-display text-4xl font-medium">Common Enquiries</h2>
                    </div>
                    <div className="space-y-12">
                        {FAQS.map((faq, i) => (
                            <div key={i} className="border-b border-gray-200 pb-12">
                                <h4 className="font-display text-xl font-bold mb-4">{faq.q}</h4>
                                <p className="font-sans text-gray-600 font-light leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default ServicesSection;
