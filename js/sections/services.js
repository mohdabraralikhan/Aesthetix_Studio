import { Icons } from '../components/icons.js';

const SERVICES = [
  {
    id: 's1',
    number: '01',
    title: 'UI Design Systems & UX',
    description: 'Creating SaaS Dashboard Design and comprehensive UI Design Systems in Hyderabad. We specialize in Dark Mode UI Standardization and user-centric workflows.',
    color: 'var(--color-studio-blue)'
  },
  {
    id: 's2',
    number: '02',
    title: 'Full-Stack Web Development',
    description: 'Custom React and WordPress development Hyderabad. We build Performance-optimized sites (Core Web Vitals) that are fast, secure, and scalable.',
    color: 'var(--color-studio-dark)'
  },
  {
    id: 's3',
    number: '03',
    title: 'Visual Identity Enhancement',
    description: 'Minimal and modern identity systems for digital-first brands. Color palettes, typography, and visual direction tailored for modern web experiences.',
    color: 'var(--color-studio-yellow)'
  },
  {
    id: 's4',
    number: '04',
    title: 'High-Conversion Redesigns',
    description: 'Transforming legacy products into performance-optimized sites. Website Redesign Services focused on Visual Identity Enhancement and modern performance metrics.',
    color: 'var(--color-studio-red)'
  },
  {
    id: 's5',
    number: '05',
    title: 'Performance & Security',
    description: 'Ongoing Maintenance and Performance Tuning. Focus on Core Web Vitals, security improvements, and UI enhancements to stay ahead of the curve.',
    color: 'var(--color-studio-mint)'
  }
];

export function createServicesSection(isFullPage = false) {
  const section = document.createElement('section');
  section.id = 'services';
  section.className = `section bg-studio-base relative ${isFullPage ? 'min-h-screen' : ''}`;
  section.style.padding = '6rem 1.5rem';

  section.innerHTML = `
    <div class="container">
      <!-- Section Header -->
      <div class="flex flex-col mb-16">
        <span class="block font-mono text-studio-blue text-xs mb-4 uppercase tracking-widest">02 — Capabilities</span>
        <h2 class="font-display text-4xl font-medium">Core Services</h2>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 gap-1" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
        ${SERVICES.map(service => `
          <div class="service-card group relative bg-white p-10 transition-all duration-500 cursor-pointer" style="z-index: 0;">
            <div class="service-accent absolute top-0 left-0 w-1 h-full transform scale-y-0 transition-transform duration-500 origin-top" style="background-color: ${service.color};"></div>
            
            <span class="block text-5xl font-display font-bold text-gray-50 transition-colors duration-500 border-b border-gray-100 pb-4 mb-8">${service.number}</span>
            
            <h3 class="font-display text-2xl font-medium mb-4">${service.title}</h3>
            <p class="font-sans text-gray-500 font-light mb-4 leading-relaxed">
              ${service.description}
            </p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  return section;
}
