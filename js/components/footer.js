export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'w-full bg-white py-16 px-6 lg:px-12 border-t border-gray-200';

  const navItems = [
    { label: 'Work', path: '/work' },
    { label: 'Services', path: '/services' },
    { label: 'Process', path: '/process' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  footer.innerHTML = `
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-12">
        <div class="max-w-xs">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-3 h-3 bg-studio-blue"></div>
            <span class="font-display font-bold text-lg uppercase tracking-tight">Aesthetix<span class="font-light">studio</span></span>
          </div>
          <p class="text-gray-500 text-sm leading-relaxed">
            Aesthetixstudio is a digital design and development studio crafting aesthetic, high-quality web experiences for clients worldwide.
          </p>
        </div>

        <div class="flex gap-12 lg:gap-24">
          <div>
            <h4 class="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">Menu</h4>
            <ul class="space-y-3 text-sm font-medium text-studio-dark list-none p-0">
              ${navItems.map(item => `
                <li>
                  <a href="${item.path}" class="hover:text-studio-blue transition-colors cursor-pointer footer-link" data-id="${item.path.substring(1)}">
                    ${item.label}
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
          <div>
            <h4 class="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">Legal</h4>
            <ul class="space-y-3 text-sm font-medium text-studio-dark list-none p-0">
              <li><a href="./sitemap.xml" class="hover:text-studio-blue transition-colors">Sitemap</a></li>
              <li><a href="#" class="hover:text-studio-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-studio-blue transition-colors">Terms</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">Connect</h4>
            <ul class="space-y-3 text-sm font-medium text-studio-dark list-none p-0">
              <li><a href="#" class="hover:text-studio-blue transition-colors">LinkedIn</a></li>
              <li><a href="#" class="hover:text-studio-blue transition-colors">Instagram</a></li>
              <li><a href="#" class="hover:text-studio-blue transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-mono uppercase tracking-wide">
        <span>© 2025 Aesthetixstudio. All Rights Reserved.</span>
        <span>Falaknuma, Hyderabad, India</span>
      </div>
    </div>
  `;

  return footer;
}

export function initializeFooter() {
  // Add smooth scrolling (optional, if footer links scroll to sections on homepage)
  document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('data-id');
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        window.scrollToSection(id);
      }
    });
  });
}
