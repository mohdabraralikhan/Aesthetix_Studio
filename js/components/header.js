import { Icons } from './icons.js';

export function createHeader() {
  const fragment = document.createDocumentFragment();

  // 1. The Navbar
  const nav = document.createElement('nav');
  nav.className = 'fixed top-0 left-0 w-full z-50 bg-header backdrop-blur-md border-b border-gray-200 transition-all duration-300';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main navigation');

  const navItems = [
    { id: 'work', label: 'Work', path: '#work' },
    { id: 'services', label: 'Services', path: '#services' },
    { id: 'process', label: 'Process', path: '#process' },
    { id: 'about', label: 'About', path: '#about' },
    { id: 'contact', label: 'Contact', path: '#contact' }
  ];

  nav.innerHTML = `
    <div class="flex items-center justify-between px-6 py-4 lg:px-12 lg:py-5">
      <button class="flex items-center gap-2 cursor-pointer group p-2 -m-2 rounded focus:outline-none" onclick="window.location.href='./index.html'" aria-label="Aesthetix Studio - Home">
        <div class="w-4 h-4 bg-studio-blue transform group-hover:rotate-45 transition-transform duration-300"></div>
        <span class="font-display font-bold text-xl tracking-tight uppercase">Aesthetix<span class="font-light">studio</span></span>
      </button>

      <!-- Desktop Nav -->
      <div class="hidden lg:flex items-center gap-12 text-studio-dark">
        ${navItems.map(item => `
          <a href="${item.path}" 
             class="nav-link relative py-2 px-1 font-sans text-xs uppercase tracking-widest transition-all duration-300 border-b-2 rounded-sm focus:outline-none border-transparent text-studio-dark hover:text-studio-blue hover:border-studio-blue/30"
             data-path="${item.path}"
             id="nav-${item.id}">
             ${item.label}
          </a>
        `).join('')}
        
        <button onclick="window.scrollToSection('contact')" class="bg-studio-dark text-white px-6 py-2.5 text-xs uppercase tracking-wider hover:bg-studio-blue active:scale-95 transition-all duration-300 border border-studio-dark hover:border-studio-blue focus:outline-none">
          Start Project
        </button>
      </div>

      <!-- Mobile Menu Toggle -->
      <button id="mobile-menu-toggle" class="lg:hidden flex p-2 -m-2 rounded focus:outline-none" aria-label="Open menu">
        ${Icons.Menu()}
      </button>
    </div>
  `;

  // 2. The Overlay (Sibling)
  const overlay = document.createElement('div');
  overlay.id = 'mobile-menu-overlay';
  overlay.className = 'fixed inset-0 z-40 bg-studio-base transition-transform duration-500 ease-in-out lg:hidden translate-x-full';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-hidden', 'true');

  overlay.innerHTML = `
    <div class="flex flex-col items-center justify-center h-full gap-8">
       ${navItems.map((item, index) => `
        <a href="${item.path}" 
           class="nav-link text-4xl font-display font-light transition-colors duration-300 p-2 rounded focus:outline-none hover:text-studio-blue"
           data-path="${item.path}"
           style="transition-delay: ${index * 50}ms">
           <span class="block text-center">${item.label}</span>
        </a>
      `).join('')}
    </div>
  `;

  fragment.appendChild(nav);
  fragment.appendChild(overlay);

  return fragment;
}

export function initializeHeader() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const overlay = document.getElementById('mobile-menu-overlay');

  // Mobile Menu Logic
  let isOpen = false;
  if (toggleBtn && overlay) {
    toggleBtn.addEventListener('click', () => {
      isOpen = !isOpen;
      if (isOpen) {
        overlay.classList.remove('translate-x-full');
        overlay.classList.add('translate-x-0');
        overlay.setAttribute('aria-hidden', 'false');
        toggleBtn.innerHTML = Icons.Close();
        toggleBtn.setAttribute('aria-label', 'Close menu');
        document.body.style.overflow = 'hidden'; // Lock scroll
      } else {
        overlay.classList.remove('translate-x-0');
        overlay.classList.add('translate-x-full');
        overlay.setAttribute('aria-hidden', 'true');
        toggleBtn.innerHTML = Icons.Menu();
        toggleBtn.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = ''; // Unlock scroll
      }
    });

    // Close menu when clicking a link
    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        isOpen = false;
        overlay.classList.remove('translate-x-0');
        overlay.classList.add('translate-x-full');
        toggleBtn.innerHTML = Icons.Menu();
        document.body.style.overflow = '';
      });
    });
  }

  // Smooth Scroll Logic for All Links (Desktop & Mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const path = link.getAttribute('data-path');
      if (path && path.startsWith('#')) {
        const id = path.substring(1);
        const element = document.getElementById(id);

        if (element) {
          e.preventDefault();
          window.scrollToSection(id);

          // Close mobile menu if open
          if (isOpen && overlay && toggleBtn) {
            isOpen = false;
            overlay.classList.add('translate-x-full');
            overlay.classList.remove('translate-x-0');
            toggleBtn.innerHTML = Icons.Menu();
            document.body.style.overflow = '';
          }
        }
      }
    });
  });

  // Active state logic
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('text-studio-blue', 'font-bold', 'border-studio-blue');
      link.classList.remove('border-transparent', 'text-studio-dark');
    }
  });

  // Scroll effect (backdrop blur shadow)
  window.addEventListener('scroll', () => {
    const header = document.querySelector('nav');
    if (window.scrollY > 20) {
      header.classList.add('shadow-sm');
    } else {
      header.classList.remove('shadow-sm');
    }
  });
}
