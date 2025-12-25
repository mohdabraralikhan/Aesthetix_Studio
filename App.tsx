import React, { useState, useEffect } from 'react';
import { NavItem, SectionId, Project, Service, ProcessStep } from './types';
import { ArrowRight, ArrowDown, Globe, Menu, X, Star } from './components/Icons';

// --- Constants & Data ---

const NAV_ITEMS: NavItem[] = [
  { label: 'Work', id: SectionId.WORK },
  { label: 'Services', id: SectionId.SERVICES },
  { label: 'Process', id: SectionId.PROCESS },
  { label: 'About', id: SectionId.ABOUT },
  { label: 'Contact', id: SectionId.CONTACT },
];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Minimal SaaS Dashboard',
    category: 'Analytics UI',
    year: '2025',
    image: '/images/project-saas-dashboard.png',
    color: 'bg-studio-blue',
    size: 'large'
  },
  {
    id: 2,
    title: 'Creative Agency Website',
    category: 'Editorial Design',
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
];

const SERVICES: Service[] = [
  {
    id: 's1',
    number: '01',
    title: 'UI/UX Design',
    description: 'Clean, modern, and visually coherent interfaces for web and mobile products. Wireframes, design systems, and high-fidelity screens.',
    color: 'bg-studio-blue'
  },
  {
    id: 's2',
    number: '02',
    title: 'Web Development',
    description: 'Full-stack development specializing in modern front-end frameworks. Fast, secure, responsive, and scalable websites tailored to your business.',
    color: 'bg-studio-dark'
  },
  {
    id: 's3',
    number: '03',
    title: 'Brand & Visual Identity',
    description: 'Minimal and modern identity systems: color palettes, typography, visual direction, design language, and creative consistency.',
    color: 'bg-studio-yellow'
  },
  {
    id: 's4',
    number: '04',
    title: 'Website Redesigns',
    description: 'Transform outdated experiences into high-performance, visually compelling digital products that align with your current goals.',
    color: 'bg-studio-red'
  },
  {
    id: 's5',
    number: '05',
    title: 'Maintenance & Support',
    description: 'Ongoing support for performance tuning, security improvements, UI enhancements, and monthly updates.',
    color: 'bg-studio-mint'
  },
];

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'p1',
    step: '01',
    title: 'Discovery',
    description: 'We learn about your brand, users, goals, and challenges to establish clarity and direction.'
  },
  {
    id: 'p2',
    step: '02',
    title: 'Design Exploration',
    description: 'Concepts, layouts, color systems, and editorial-style compositions crafted to reflect your identity.'
  },
  {
    id: 'p3',
    step: '03',
    title: 'Build & Implementation',
    description: 'Modern, efficient development workflows with pixel-perfect execution.'
  },
  {
    id: 'p4',
    step: '04',
    title: 'Launch & Optimization',
    description: 'Deployment, performance tuning, and continuous refinement.'
  }
];

// --- Components ---

const Navigation: React.FC<{ activeSection: string; onNavigate: (id: string) => void }> = ({ activeSection, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#F6F7FB]/90 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
        <div className="flex items-center justify-between px-6 py-4 lg:px-12 lg:py-5">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate(SectionId.HERO)}
          >
            <div className="w-4 h-4 bg-studio-blue transform group-hover:rotate-45 transition-transform duration-300"></div>
            <span className="font-display font-bold text-xl tracking-tight uppercase">Aesthetix<span className="font-light">studio</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`group relative flex flex-col items-center justify-center overflow-hidden`}
              >
                <span className={`font-sans text-xs uppercase tracking-widest transition-colors duration-300 ${activeSection === item.id ? 'text-studio-blue font-bold' : 'text-studio-dark hover:text-gray-500'}`}>
                  {item.label}
                </span>

              </button>
            ))}
            <button
              onClick={() => onNavigate(SectionId.CONTACT)}
              className="bg-studio-dark text-white px-6 py-2.5 text-xs uppercase tracking-wider hover:bg-studio-blue transition-colors duration-300 border border-transparent hover:border-studio-blue"
            >
              Start Project
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-[#F6F7FB] transition-transform duration-500 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsOpen(false);
              }}
              className="text-4xl font-display font-light hover:text-studio-blue transition-colors duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="block text-center">{item.label}</span>

            </button>
          ))}
        </div>
      </div>
    </>
  );
};

const Hero: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  return (
    <section id={SectionId.HERO} className="relative min-h-screen pt-20 lg:pt-24 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-studio-base">

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
          Crafting Aesthetic <br />
          Digital <span className="text-gray-400 italic font-light">Experiences.</span>
        </h1>

        <p className="font-sans font-light text-lg lg:text-xl text-studio-gray max-w-lg leading-relaxed mb-12">
          Aesthetixtudio is a design-forward development studio building modern websites and UI systems for brands that value precision, clarity, and visual identity.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <button
            onClick={() => onNavigate(SectionId.WORK)}
            className="group flex items-center gap-3 text-studio-dark hover:text-studio-blue transition-colors duration-300"
          >
            <span className="uppercase tracking-widest text-sm font-medium border-b border-studio-dark group-hover:border-studio-blue pb-1">View Work</span>
            <ArrowDown className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate(SectionId.CONTACT)}
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
          alt="Abstract Architectural Form"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-70"
          loading="lazy"
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
  );
};

const Intro: React.FC = () => {
  return (
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
        </div>
      </div>
    </section>
  );
};

const Services: React.FC = () => {
  return (
    <section id={SectionId.SERVICES} className="py-24 lg:py-32 px-6 lg:px-20 bg-studio-base relative">
      {/* Section Header */}
      <div className="flex flex-col mb-16">
        <span className="block font-mono text-studio-blue text-xs mb-4 uppercase tracking-widest">02 — Capabilities</span>
        <h2 className="font-display text-4xl lg:text-6xl font-medium">Core Services</h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {SERVICES.map((service, idx) => (
          <div
            key={service.id}
            className={`group relative bg-white p-10 lg:p-12 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 z-0 hover:z-10 ${idx >= 3 ? 'lg:col-span-1.5' : ''}`}
          >
            <div className={`absolute top-0 left-0 w-1 h-full ${service.color} transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top`}></div>

            <span className="block text-5xl font-display font-bold text-gray-100 mb-8 group-hover:text-studio-dark transition-colors duration-500">{service.number}</span>

            <h3 className="font-display text-2xl font-medium mb-4">{service.title}</h3>
            <p className="font-sans text-gray-500 font-light mb-4 leading-relaxed text-sm lg:text-base">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Process: React.FC = () => {
  return (
    <section id={SectionId.PROCESS} className="py-24 lg:py-32 bg-studio-dark text-white px-6 lg:px-20 overflow-hidden">
      <div className="mb-20">
        <span className="block font-mono text-studio-mint text-xs mb-4 uppercase tracking-widest">03 — Process</span>
        <h2 className="font-display text-4xl lg:text-6xl font-medium">How We Work.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {PROCESS_STEPS.map((step) => (
          <div key={step.id} className="relative group">
            <div className="w-full h-[1px] bg-gray-800 mb-8 group-hover:bg-studio-mint transition-colors duration-500"></div>
            <span className="block font-mono text-studio-mint text-sm mb-4 tracking-widest">{step.step}</span>
            <h3 className="font-display text-xl lg:text-2xl font-medium mb-4">{step.title}</h3>
            <p className="font-sans text-gray-400 font-light text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Work: React.FC = () => {
  return (
    <section id={SectionId.WORK} className="py-24 lg:py-32 bg-white">
      <div className="px-6 lg:px-20 mb-16 flex flex-col md:flex-row items-end justify-between gap-6">
        <div>
          <span className="block font-mono text-studio-blue text-xs mb-4 uppercase tracking-widest">04 — Portfolio</span>
          <h2 className="font-display text-4xl lg:text-6xl font-medium leading-none">
            Selected <br /> Projects
          </h2>
        </div>
        <div className="hidden lg:block text-right">
          <div className="font-mono text-xs text-gray-400 mb-1">RECENT DELIVERABLES</div>
          <div className="font-display text-xl">2024 — 2025</div>
        </div>
      </div>

      {/* Masonry-style Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 px-6 lg:px-20">
        {PROJECTS.map((project, idx) => (
          <div
            key={project.id}
            className={`group relative cursor-pointer ${project.size === 'tall' ? 'md:row-span-2' : ''} ${project.size === 'large' ? 'md:col-span-2' : ''}`}
          >
            <div className="relative overflow-hidden w-full h-full aspect-[4/3] md:aspect-auto min-h-[400px] bg-gray-100">
              <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full ${project.id === 4 ? 'object-contain' : 'object-cover'} transition-transform duration-1000 ease-out group-hover:scale-105`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500"></div>

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-4 mb-2">
                  <span className={`inline-block w-8 h-[2px] ${project.color}`}></span>
                  <span className="text-white font-mono text-xs uppercase tracking-widest">{project.category}</span>
                </div>
                <h3 className="text-white font-display text-3xl lg:text-4xl font-bold mb-4">{project.title}</h3>
                <button className="self-start flex items-center gap-2 text-white text-xs uppercase tracking-widest border-b border-transparent hover:border-white transition-all">
                  View Case Study <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Always visible year */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur text-black px-3 py-1 text-xs font-mono">
                {project.year}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <button className="inline-flex items-center gap-4 px-10 py-4 border border-studio-dark hover:bg-studio-dark hover:text-white transition-all duration-300 group">
          <span className="uppercase tracking-widest text-xs font-medium">Explore Full Portfolio</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-24 lg:py-40 px-6 lg:px-20 bg-studio-base relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        <div className="lg:col-span-6">
          <span className="text-studio-blue font-mono text-xs uppercase tracking-widest mb-6 block">05 — The Studio</span>
          <h2 className="font-display text-4xl lg:text-6xl leading-[1.1] mb-8">
            Design That Speaks. <br />
            <span className="text-gray-400">Engineering That Performs.</span>
          </h2>
          <div className="space-y-6 text-studio-gray font-sans font-light text-lg leading-relaxed max-w-lg">
            <p>
              Aesthetixtudio is led by a full-stack developer and UI/UX designer passionate about creating aesthetic, clean, and purposeful digital work.
            </p>
            <p>
              With experience across design, development, and security, the studio delivers solutions that are visually compelling and technically sound. We believe in craft, clarity, and consistency. Every project begins with intention and ends with a polished, premium result.
            </p>
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
    </section>
  );
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Website Design & Dev',
    budget: '₹1k - ₹5k',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      alert('Web3Forms Access Key is missing. Please check your environment variables.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: `New Project Inquiry: ${formData.projectType}`,
          message: `
Project Type: ${formData.projectType}
Budget: ${formData.budget}

Message:
${formData.message}
          `,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Thank you! Your message has been sent successfully.');
        setFormData({
          name: '',
          email: '',
          projectType: 'Website Design & Dev',
          budget: '₹1k - ₹5k',
          message: ''
        });
      } else {
        console.error('Web3Forms Error:', result);
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 lg:py-32 px-6 lg:px-20 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="block font-mono text-studio-blue text-xs mb-4 uppercase tracking-widest">06 — Contact</span>
          <h2 className="font-display text-5xl lg:text-7xl font-medium mb-6">Start Your Project.</h2>
          <p className="text-gray-500 text-lg font-light">Let’s build something aesthetic, functional, and meaningful.</p>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 group">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-400 group-focus-within:text-studio-blue transition-colors">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-studio-blue transition-colors bg-transparent placeholder-gray-300"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="flex flex-col gap-2 group">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-400 group-focus-within:text-studio-blue transition-colors">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-studio-blue transition-colors bg-transparent placeholder-gray-300"
              placeholder="email@address.com"
              required
            />
          </div>
          <div className="flex flex-col gap-2 group">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-400 group-focus-within:text-studio-blue transition-colors">Project Type</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-studio-blue transition-colors bg-transparent text-gray-700"
            >
              <option>Website Design & Dev</option>
              <option>UI/UX Design</option>
              <option>Brand Identity</option>
              <option>Maintenance</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 group">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-400 group-focus-within:text-studio-blue transition-colors">Budget</label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-studio-blue transition-colors bg-transparent text-gray-700"
            >
              <option>₹1k - ₹5k</option>
              <option>₹5k - ₹10k</option>
              <option>₹10k+</option>
            </select>
          </div>
          <div className="md:col-span-2 flex flex-col gap-2 group">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-400 group-focus-within:text-studio-blue transition-colors">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-studio-blue transition-colors bg-transparent placeholder-gray-300 resize-none"
              placeholder="Tell us about your goals..."
              required
            ></textarea>
          </div>

          <div className="md:col-span-2 flex flex-col md:flex-row justify-between items-center mt-8 gap-6">
            <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wide">
              <Star className="w-4 h-4 text-studio-yellow" />
              <span>Response within 24–48 hours</span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto bg-studio-dark text-white px-12 py-5 uppercase tracking-widest text-xs font-medium hover:bg-studio-blue transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-16 px-6 lg:px-12 border-t border-gray-200">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-12">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 bg-studio-blue"></div>
            <span className="font-display font-bold text-lg uppercase tracking-tight">Aesthetix<span className="font-light">studio</span></span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Aesthetixtudio is a digital design and development studio crafting aesthetic, high-quality web experiences for clients worldwide.
          </p>
        </div>

        <div className="flex gap-12 lg:gap-24">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">Menu</h4>
            <ul className="space-y-3 text-sm font-medium text-studio-dark">
              {NAV_ITEMS.map(item => (
                <li key={item.id}><a href={`#${item.id}`} className="hover:text-studio-blue transition-colors">{item.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">Legal</h4>
            <ul className="space-y-3 text-sm font-medium text-studio-dark">
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

// --- Main App ---

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(SectionId.HERO);

  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.values(SectionId);
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="antialiased selection:bg-studio-blue selection:text-white bg-studio-base">
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      <main>
        <Hero onNavigate={handleNavigate} />
        <Intro />
        <Services />
        <Process />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
