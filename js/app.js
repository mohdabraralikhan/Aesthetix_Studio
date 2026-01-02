// Main Application Entry Point
import { createHeader, initializeHeader } from './components/header.js?v=1.1';
import { createFooter, initializeFooter } from './components/footer.js?v=1.1';
import { createContactSection, initializeContactForm } from './sections/contact.js?v=1.1';
import { Icons } from './components/icons.js?v=1.1';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    const root = document.getElementById('root');
    if (!root) {
        console.error('Root element not found');
        return;
    }

    // Create main layout
    root.innerHTML = '';

    // Add header
    const header = createHeader();
    document.body.insertBefore(header, root);

    // Create main content
    const main = document.createElement('main');

    // Add sections (Order based on Home.tsx)
    main.appendChild(createHeroSection());
    main.appendChild(createIntroSection());
    main.appendChild(createProblemSolutionSection());
    main.appendChild(createServicesSection());
    main.appendChild(createProcessSection());
    main.appendChild(createWorkSection());
    main.appendChild(createAboutSection());
    main.appendChild(createContactSection());

    root.appendChild(main);

    // Add footer
    const footer = createFooter();
    root.appendChild(footer);

    // Initialize components
    initializeHeader();
    initializeFooter();
    initializeContactForm();

    // Global scrolling handler
    window.scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };
}

// 1. Hero Section (Matches Home.tsx section#hero)
function createHeroSection() {
    const section = document.createElement('section');
    section.id = 'hero';
    section.className = 'relative min-h-[90vh] grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-studio-base';

    section.innerHTML = `
        <!-- Decorative Grid Lines -->
        <div class="absolute inset-0 pointer-events-none grid grid-cols-1 lg:grid-cols-12 gap-0 z-0">
            <div class="hidden lg:block lg:col-span-1 border-r border-gray-200/50 h-full"></div>
            <div class="hidden lg:block lg:col-span-6 border-r border-gray-200/50 h-full"></div>
            <div class="hidden lg:block lg:col-span-1 border-r border-gray-200/50 h-full"></div>
        </div>

        <!-- Left Content -->
        <div class="lg:col-span-7 flex flex-col justify-center px-6 lg:px-20 py-20 lg:py-0 relative z-10">
            <div class="absolute top-1/2 left-6 lg:left-8 -translate-y-1/2 writing-vertical text-xs tracking-[0.3em] uppercase text-gray-400 hidden lg:block">
                Digital Studio / 2025
            </div>

            <div class="mb-8 flex items-center gap-3">
                <span class="w-12 h-[1px] bg-studio-blue"></span>
                <span class="text-studio-blue font-mono text-xs uppercase tracking-widest">Aesthetixstudio</span>
            </div>

            <h1 class="font-display font-medium text-4xl lg:text-7xl xl:text-8xl leading-[1.05] mb-8 text-studio-dark tracking-tight">
                Websites That Get <br />
                Local Businesses <span class="text-gray-400 italic font-light">More Leads.</span>
            </h1>

            <p class="font-sans font-light text-lg lg:text-xl text-studio-gray max-w-lg leading-relaxed mb-12">
                Get a professional business website in 7 days — pay only after you approve the design. Based in Falaknuma, Hyderabad.
            </p>

            <div class="flex flex-row flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6">
                <a href="https://wa.me/918499908716" class="px-8 py-3 bg-[#25D366] text-white text-sm uppercase tracking-widest hover:opacity-90 transition-all duration-300 flex items-center gap-2">
                    ${Icons.WhatsApp ? Icons.WhatsApp() : '<span class="w-4 h-4"></span>'} WhatsApp Now
                </a>
                <a href="tel:+918499908716" class="px-8 py-3 border border-gray-300 text-sm uppercase tracking-widest hover:border-studio-dark hover:bg-studio-dark hover:text-white transition-all duration-300">
                    Call: 8499908716
                </a>
            </div>
        </div>

        <!-- Right Visual -->
        <div class="lg:col-span-5 relative bg-gray-100 min-h-[50vh] lg:min-h-screen border-l border-gray-200">
            <img
                src="./images/hero.webp"
                srcset="./images/hero-mobile.webp 800w, ./images/hero.webp 1920w"
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Abstract Architectural Form"
                loading="eager"
                decoding="async"
                class="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-70"
            />
            <div class="absolute inset-0 bg-studio-base/20"></div>

            <div class="absolute bottom-12 left-0 w-full px-6 lg:px-12">
                <div class="bg-white/90 backdrop-blur-md p-8 shadow-xl max-w-sm ml-auto border-t-2 border-studio-blue">
                    <div class="flex justify-between items-start mb-4">
                        <span class="font-mono text-xs text-gray-500 uppercase">Featured Project</span>
                        <span class="w-4 h-4 text-studio-blue">${Icons.Globe()}</span>
                    </div>
                    <h3 class="font-display text-xl font-bold mb-1">Minimal SaaS Dashboard</h3>
                    <p class="text-sm text-gray-600 mb-0 leading-relaxed">A clean, data-oriented interface for an analytics product.</p>
                </div>
            </div>
        </div>
    `;
    return section;
}

// 2. Intro Section (Matches Home.tsx)
function createIntroSection() {
    const section = document.createElement('section');
    section.className = 'py-24 px-6 lg:px-20 bg-white border-b border-gray-100';

    section.innerHTML = `
        <div class="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <h2 class="font-display text-4xl lg:text-5xl font-medium leading-tight">
                Where Design <br /> Meets <span class="text-studio-blue">Engineering.</span>
            </h2>
            <div class="space-y-6">
                <p class="font-sans text-lg font-light text-gray-600 leading-relaxed">
                    We create refined, minimal, and high-impact digital experiences.
                    Every interface is built on a foundation of clean aesthetics, structured systems, and thoughtful interactions.
                </p>
                <p class="font-sans text-lg font-light text-gray-600 leading-relaxed">
                    Our approach blends UI/UX craft with full-stack engineering to deliver work that's both beautiful and performant.
                </p>
                <div class="pt-4 border-t border-gray-100">
                    <p class="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                        Local Expertise — <span class="text-studio-blue">Top-rated web designers in Telangana</span>
                    </p>
                </div>
            </div>
        </div>
    `;
    return section;
}

// 3. Services Section (Matches ServicesSection.tsx)
function createServicesSection() {
    const section = document.createElement('section');
    section.id = 'services';
    section.className = 'py-24 lg:py-32 px-6 lg:px-20 bg-studio-base relative';

    const services = [
        { id: 's1', number: '01', title: 'UI Design Systems & UX', description: 'Creating SaaS Dashboard Design and comprehensive UI Design Systems in Hyderabad. We specialize in Dark Mode UI Standardization and user-centric workflows.', color: 'bg-studio-blue' },
        { id: 's2', number: '02', title: 'Full-Stack Web Development', description: 'Custom React and WordPress development Hyderabad. We build Performance-optimized sites (Core Web Vitals) that are fast, secure, and scalable.', color: 'bg-studio-dark' },
        { id: 's3', number: '03', title: 'Visual Identity Enhancement', description: 'Minimal and modern identity systems for digital-first brands. Color palettes, typography, and visual direction tailored for modern web experiences.', color: 'bg-studio-yellow' },
        { id: 's4', number: '04', title: 'High-Conversion Redesigns', description: 'Transforming legacy products into performance-optimized sites. Website Redesign Services focused on Visual Identity Enhancement and modern performance metrics.', color: 'bg-studio-red' },
        { id: 's5', number: '05', title: 'Performance & Security', description: 'Ongoing Maintenance and Performance Tuning. Focus on Core Web Vitals, security improvements, and UI enhancements to stay ahead of the curve.', color: 'bg-studio-mint' }
    ];

    section.innerHTML = `
        <div class="flex flex-col mb-16">
            <span class="block font-mono text-studio-blue text-xs mb-4 uppercase tracking-widest">02 — Capabilities</span>
            <h2 class="font-display text-4xl lg:text-3xl font-medium">Core Services</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            ${services.map(service => `
                <div class="group relative bg-white p-10 lg:p-12 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 z-0 hover:z-10 cursor-pointer">
                    <div class="absolute top-0 left-0 w-1 h-full ${service.color} transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
                    <span class="block text-5xl font-display font-bold text-gray-50 group-hover:text-studio-dark transition-colors duration-500 border-b border-gray-100 pb-4 mb-8">${service.number}</span>
                    <h3 class="font-display text-2xl font-medium mb-4">${service.title}</h3>
                    <p class="font-sans text-gray-500 font-light mb-4 leading-relaxed text-sm lg:text-base">${service.description}</p>
                </div>
            `).join('')}
        </div>
    `;
    return section;
}

// 4. Process Section (Matches ProcessSection.tsx)
function createProcessSection() {
    const section = document.createElement('section');
    section.id = 'process';
    section.className = 'py-24 lg:py-32 bg-studio-dark text-white px-6 lg:px-20 overflow-hidden';

    const steps = [
        { number: '01', title: 'UI/UX Discovery Phase', description: 'Comprehensive Discovery Phase where we audit your brand and establish the strategic foundation for your digital product.' },
        { number: '02', title: 'Collaborative Design Exploration', description: 'Concepts, color systems, and modern compositions crafted through collaborative exploration to ensure a unique visual identity.' },
        { number: '03', title: 'Agile Design-to-Code Workflow', description: 'Modern, efficient Agile Design-to-Code Workflow utilizing React and scalable web architecture for pixel-perfect results.' },
        { number: '04', title: 'Launch & Optimization Strategy', description: 'Rigorous deployment and optimization strategy focused on performance, SEO, and long-term scalability.' }
    ];

    section.innerHTML = `
        <div class="mb-20">
            <span class="block font-mono text-studio-mint text-xs mb-4 uppercase tracking-widest">03 — Process</span>
            <h2 class="font-display text-4xl lg:text-6xl font-medium mb-8">How We Work.</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            ${steps.map(step => `
                <div class="relative group cursor-pointer hover:scale-[1.02] transition-transform">
                    <div class="w-full h-[1px] bg-gray-800 mb-8 group-hover:bg-studio-mint transition-colors duration-500"></div>
                    <span class="block font-mono text-studio-mint text-sm mb-4 tracking-widest">${step.number}</span>
                    <h3 class="font-display text-2xl font-medium mb-4">${step.title}</h3>
                    <p class="font-sans text-gray-400 font-light text-sm leading-relaxed">${step.description}</p>
                </div>
            `).join('')}
        </div>

        
    `;
    return section;
}

// 5. Work Section (Matches WorkSection.tsx)
function createWorkSection() {
    const section = document.createElement('section');
    section.id = 'work';
    section.className = 'py-24 lg:py-32 bg-white';

    const projects = [
        { id: 1, title: 'Minimal SaaS Dashboard', category: 'Analytics UI — Glassmorphism UI', year: '2025', image: './images/project-saas-dashboard.webp', color: 'bg-studio-blue', size: 'large' },
        { id: 2, title: 'Creative Agency Website', category: 'Editorial Design — Motion UI', year: '2024', image: './images/project-creative-agency.webp', color: 'bg-studio-red', size: 'tall' },
        { id: 3, title: 'E-Commerce Product Page', category: 'Retail Experience', year: '2024', image: './images/project-ecommerce.webp', color: 'bg-studio-mint', size: 'normal' },
        { id: 4, title: 'Business Consulting Platform', category: 'Corporate Identity', year: '2024', image: './images/project-consulting.webp', color: 'bg-studio-yellow', size: 'normal' }
    ];

    section.innerHTML = `
        <div class="px-6 lg:px-20 mb-16 flex flex-col md:flex-row items-end justify-between gap-6">
            <div>
                <span class="block font-mono text-studio-blue text-xs mb-4 uppercase tracking-widest">04 — Portfolio</span>
                <h2 class="font-display text-4xl lg:text-6xl font-medium leading-none">Selected Projects</h2>
            </div>
            <div class="hidden lg:block text-right">
                <div class="font-mono text-xs text-gray-400 mb-1">RECENT DELIVERABLES</div>
                <div class="font-display text-xl">2024 — 2025</div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 px-6 lg:px-20 transition-all duration-500">
            ${projects.map(project => `
                <div class="group relative cursor-pointer ${project.size === 'tall' ? 'md:row-span-2' : ''} ${project.size === 'large' ? 'md:col-span-2' : ''}">
                    <div class="relative overflow-hidden w-full h-full aspect-[4/3] min-h-[400px] bg-gray-50 border border-gray-100">
                        <img 
                            src="${project.image}" 
                            alt="${project.title}" 
                            loading="lazy" 
                            decoding="async" 
                            class="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
                        />
                        <div class="absolute inset-0 bg-studio-dark/0 group-hover:bg-studio-dark/40 transition-colors duration-500"></div>

                        <div class="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                            <div class="flex items-center gap-4 mb-2">
                                <span class="inline-block w-8 h-[2px] ${project.color}"></span>
                                <span class="text-white font-mono text-xs uppercase tracking-widest">${project.category}</span>
                            </div>
                            <h3 class="text-white font-display text-2xl lg:text-3xl font-bold mb-4">${project.title}</h3>
                            <div class="flex items-center gap-2 text-white text-[10px] uppercase tracking-[0.2em] font-medium border-b border-white/30 pb-1 self-start">
                                View Project <span class="w-3 h-3">${Icons.ArrowRight()}</span>
                            </div>
                        </div>

                        <div class="absolute top-6 right-6 bg-white/90 backdrop-blur text-black px-3 py-1 text-[10px] font-mono tracking-widest">
                            ${project.year}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="mt-20 text-center">
            <button class="inline-flex items-center gap-4 px-10 py-4 border border-studio-dark hover:bg-studio-dark hover:text-white transition-all duration-300 group">
                <span class="uppercase tracking-widest text-xs font-medium">Explore Full Portfolio</span>
                <span class="w-4 h-4 transform group-hover:translate-x-1 transition-transform">${Icons.ArrowRight()}</span>
            </button>
        </div>
    `;
    return section;
}

// 6. About Section (Matches AboutSection.tsx)
function createAboutSection() {
    const section = document.createElement('section');
    section.id = 'about';
    section.className = 'py-24 lg:py-40 px-6 lg:px-20 bg-studio-base relative overflow-hidden';

    section.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
            <div class="lg:col-span-6">
                <span class="text-studio-blue font-mono text-xs uppercase tracking-widest mb-6 block">05 — The Studio</span>
                <h2 class="font-display text-4xl lg:text-6xl leading-[1.1] mb-8 font-normal">
                    Design That Speaks. <br />
                    <span class="text-gray-400">Engineering That Performs.</span>
                </h2>
                <div class="space-y-6 text-studio-gray font-sans font-light text-lg leading-relaxed max-w-lg">
                    <p>
                        Aesthetix Studio is led by its founder, a full-stack developer and UI/UX designer based in Falaknuma, Hyderabad, passionate about creating aesthetic and clean digital work.
                    </p>
                    <p>
                        With over 3+ years of professional experience across design and development, the studio delivers solutions specializing in React, Next.js, and Modern UI Frameworks.
                    </p>
                   
                </div>

                <div class="mt-12 flex flex-col md:flex-row gap-12">
                    <div>
                        <span class="block text-4xl font-display font-medium mb-1">10+</span>
                        <span class="text-xs uppercase tracking-widest text-gray-400">Clients Served</span>
                    </div>
                    <div>
                        <span class="block text-4xl font-display font-medium mb-1">25+</span>
                        <span class="text-xs uppercase tracking-widest text-gray-400">Projects Delivered</span>
                    </div>
                    <div>
                        <span class="block text-4xl font-display font-medium mb-1">3+</span>
                        <span class="text-xs uppercase tracking-widest text-gray-400">Years Experience</span>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-6 relative h-full min-h-[400px]">
                <div class="absolute inset-0 bg-gray-200">
                    <img
                        src="./images/about.webp"
                        alt="Studio Atmosphere"
                        loading="lazy"
                        decoding="async"
                        class="w-full h-full object-cover"
                    />
                </div>
                <div class="absolute -bottom-8 -left-8 bg-white p-8 shadow-xl max-w-xs hidden md:block">
                    <p class="font-display text-lg italic text-gray-800">
                        "Simplicity is the ultimate sophistication."
                    </p>
                </div>
            </div>
        </div>
    `;
    return section;
}
