import { SUPABASE_CONFIG, FORM_CONFIG } from '../config.js';
import { Icons } from '../components/icons.js';
import { Toast } from '../components/toast.js';

export function createContactSection(isFullPage = false) {
  const section = document.createElement('section');
  section.id = 'contact';
  section.className = `py-24 lg:py-32 px-6 lg:px-20 bg-white ${isFullPage ? 'min-h-screen' : ''}`;

  section.innerHTML = `
    <div class="container max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-20">
        <span class="block font-mono text-studio-blue text-xs mb-4 uppercase tracking-widest">06 — Contact</span>
        <h2 class="font-display text-5xl lg:text-7xl font-medium mb-6">Let's Talk.</h2>
        <p class="text-gray-500 text-lg font-light">
          Ready to transform your vision into an aesthetic reality? We're currently accepting new projects.
        </p>
      </div>

      <!-- Contact Form -->
      <form id="contact-form" class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        
        <!-- Name -->
        <div class="flex flex-col gap-2 group">
          <label for="name" class="text-xs font-mono uppercase tracking-widest text-gray-400 group-focus-within:text-studio-blue transition-colors">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your Name"
            class="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-studio-blue transition-all bg-transparent placeholder-gray-300"
          />
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-2 group">
          <label for="email" class="text-xs font-mono uppercase tracking-widest text-gray-400 group-focus-within:text-studio-blue transition-colors">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="email@address.com"
            class="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-studio-blue transition-all bg-transparent placeholder-gray-300"
          />
        </div>

        <!-- Project Type -->
        <div class="flex flex-col gap-2 group">
          <label for="projectType" class="text-xs font-mono uppercase tracking-widest text-gray-400 group-focus-within:text-studio-blue transition-colors">Project Type</label>
          <select
            id="projectType"
            name="projectType"
            class="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-studio-blue transition-all bg-transparent text-gray-700 cursor-pointer"
          >
            ${FORM_CONFIG.projectTypes.map(type => `<option value="${type}">${type}</option>`).join('')}
          </select>
        </div>

        <!-- Budget -->
        <div class="flex flex-col gap-2 group">
          <label for="budget" class="text-xs font-mono uppercase tracking-widest text-gray-400 group-focus-within:text-studio-blue transition-colors">Budget</label>
          <select
            id="budget"
            name="budget"
            class="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-studio-blue transition-all bg-transparent text-gray-700 cursor-pointer"
          >
            ${FORM_CONFIG.budgetRanges.map(range => `<option value="${range}">${range}</option>`).join('')}
          </select>
        </div>

        <!-- Message -->
        <div class="md:col-span-2 flex flex-col gap-2 group">
          <label for="message" class="text-xs font-mono uppercase tracking-widest text-gray-400 group-focus-within:text-studio-blue transition-colors">Message *</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            placeholder="Tell us about your goals..."
            class="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-studio-blue transition-all bg-transparent placeholder-gray-300 resize-none"
          ></textarea>
        </div>

        <!-- Submit & Info -->
        <div class="md:col-span-2 flex flex-col md:flex-row justify-between items-start md:items-center mt-8 gap-6">
          <div class="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wide">
            <span class="text-studio-yellow w-4 h-4">${Icons.Star()}</span>
            <span>Response within 24–48 hours</span>
          </div>
          <button
            type="submit"
            id="submit-btn"
            class="w-full md:w-auto px-12 py-3 uppercase tracking-widest text-xs font-medium hover:bg-studio-blue active:scale-95 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Inquiry
          </button>
        </div>
      </form>

      ${isFullPage ? `
        <!-- Expanded Contact Info (Full Page Mode) -->
        <div class="mt-32 pt-20 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 class="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-bold">Inquiries</h4>
            <p class="font-display text-xl">hello@aesthetixstudio.com</p>
            <p class="font-display text-lg mt-2 text-gray-500 font-light">+91 (Placeholder) Phone Number</p>
          </div>
          <div>
            <h4 class="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-bold">Studio Address</h4>
            <p class="font-display text-xl leading-snug">
              Aesthetix Studio<br>
              Falaknuma, Hyderabad<br>
              Telangana, India — 500053
            </p>
            <p class="text-xs text-gray-400 mt-2 italic font-light">Available for global consultations.</p>
          </div>
          <div>
            <h4 class="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-bold">Social Channels</h4>
            <div class="flex flex-col gap-4 font-display text-lg">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="hover:text-studio-blue transition-colors self-start border-b border-transparent hover:border-studio-blue">LinkedIn Profile</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="hover:text-studio-blue transition-colors self-start border-b border-transparent hover:border-studio-blue">GitHub Repository</a>
            </div>
          </div>
        </div>
      ` : `
        
      `}
    </div>
  `;

  return section;
}

export function initializeContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      project_type: formData.get('projectType'),
      budget: formData.get('budget'),
      message: formData.get('message'),
      status: 'NEW',
      created_at: new Date().toISOString()
    };

    try {
      // 1. Ensure Supabase is loaded dynamically
      if (!window.supabase) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
          script.async = true;
          script.onload = resolve;
          script.onerror = () => reject(new Error('Failed to load database service.'));
          document.head.appendChild(script);
        });
      }

      // Check if Supabase is configured
      if (!SUPABASE_CONFIG.url || SUPABASE_CONFIG.url === 'YOUR_SUPABASE_URL') {
        throw new Error('Supabase is not configured. Please update js/config.js with your Supabase credentials.');
      }

      // Initialize Supabase client
      const { createClient } = window.supabase;
      const supabaseClient = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

      // Insert data into Supabase
      const { data: result, error } = await supabaseClient
        .from('inquiries')
        .insert([data]);

      if (error) {
        throw error;
      }

      // Success
      Toast.show('Thank you! Your message has been sent successfully.', 'success');
      form.reset();

    } catch (error) {
      console.error('Submission Error:', error);
      Toast.show(error.message || 'An error occurred. Please try again later.', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
