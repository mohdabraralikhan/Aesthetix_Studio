import { SUPABASE_CONFIG } from './config.js';
import { Toast } from './components/toast.js';
import { Modal } from './components/modal.js';

const APP = document.getElementById('app');
const SESSION_KEY = 'sb-access-token'; // Supabase handles most of this, but we'll track status

let supabase;

// Initialize Supabase safely
try {
    const { createClient } = window.supabase;
    supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
} catch (e) {
    console.error("Supabase init failed", e);
}

async function init() {
    const { data: { session } } = await supabase.auth.getSession();
    session ? renderDashboard() : renderLogin();
}

/**
 * AUTHENTICATION UI
 */
function renderLogin(msg = null) {
    document.title = "Admin Login — Aesthetix Studio";
    APP.innerHTML = `
        <div class="min-h-screen flex items-center justify-center p-6 bg-studio-base relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div class="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-studio-blue blur-[100px]"></div>
                <div class="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-studio-mint blur-[100px]"></div>
            </div>

            <div class="w-full max-w-[400px] bg-white p-12 border border-gray-100 shadow-2xl rounded-2xl relative z-10">
                <div class="text-center mb-12">
                    <span class="font-display font-medium text-lg uppercase tracking-[0.3em] text-studio-dark block mb-3">
                        Aesthetix<span class="text-gray-300">Admin</span>
                    </span>
                    <div class="h-px w-6 bg-studio-blue mx-auto"></div>
                    ${msg ? `<p class="mt-4 text-[10px] text-studio-blue uppercase tracking-widest animate-pulse">${msg}</p>` : ''}
                </div>

                <form id="login-form" class="space-y-8">
                    <div class="space-y-6">
                        <div class="relative">
                            <input 
                                type="email" 
                                id="email" 
                                class="w-full border-b border-gray-200 py-3 text-center focus:outline-none focus:border-studio-blue transition-all placeholder-gray-300 text-sm bg-transparent" 
                                placeholder="Admin Email" 
                                required 
                                autofocus
                            >
                        </div>
                        <div class="relative">
                            <input 
                                type="password" 
                                id="password" 
                                class="w-full border-b border-gray-200 py-3 text-center focus:outline-none focus:border-studio-blue transition-all placeholder-gray-300 text-sm bg-transparent font-mono tracking-[0.5em] uppercase" 
                                placeholder="••••••" 
                                required
                            >
                            <label class="block text-[10px] text-gray-400 uppercase tracking-widest text-center mt-2">Access Credentials</label>
                        </div>
                    </div>

                    <button type="submit" class="w-full bg-studio-dark text-white py-4 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-studio-blue hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        Secure Login
                    </button>
                    
                    <div class="text-center">
                        <a href="/" class="text-[9px] text-gray-400 hover:text-studio-dark transition-colors uppercase tracking-widest border-b border-transparent hover:border-studio-dark pb-0.5">Return to Site</a>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Re-attach the event listener
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = e.target.querySelector('button');

        btn.disabled = true;
        btn.textContent = 'Verifying...';

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (!error) {
            Toast.show('Access Granted', 'success');
            renderDashboard();
        } else {
            Toast.show(error.message, 'error');
            btn.disabled = false;
            btn.textContent = 'Secure Login';
            const passInput = document.getElementById('password');
            passInput.value = '';
            passInput.classList.add('border-red-500');
            setTimeout(() => passInput.classList.remove('border-red-500'), 1000);
        }
    });
}

/**
 * DASHBOARD UI
 */
async function renderDashboard() {
    document.title = "Admin Dashboard — Aesthetix Studio";
    APP.innerHTML = `
        <div class="min-h-screen bg-studio-base">
            <nav class="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40">
                <div class="container mx-auto px-6 py-4 max-w-7xl flex justify-between items-center">
                    <div class="flex items-center gap-3 cursor-pointer" onclick="window.location.reload()">
                        <div class="w-8 h-8 bg-studio-blue flex items-center justify-center text-white rounded">
                            <span class="font-display font-bold text-lg">A</span>
                        </div>
                        <span class="font-display font-bold text-lg uppercase tracking-tight">Aesthetix<span class="font-light">Admin</span></span>
                    </div>
                    <div class="flex items-center gap-6">
                        <button id="refresh-btn" class="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-studio-blue transition-colors">
                            <svg id="refresh-icon" class="w-4 h-4 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                            <span class="hidden sm:inline">Refresh</span>
                        </button>
                        <button id="logout-btn" class="text-xs font-mono text-red-500 hover:bg-red-50 px-4 py-2 rounded border border-red-100 transition-all">Logout</button>
                    </div>
                </div>
            </nav>

            <main class="container mx-auto px-6 py-12 max-w-7xl">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                    <div>
                        <span class="text-studio-blue font-mono text-xs uppercase tracking-widest mb-2 block">Inbox Overview</span>
                        <h1 class="font-display text-4xl font-medium text-studio-dark">Client Inquiries</h1>
                    </div>
                    <div class="bg-white px-6 py-3 rounded-lg border border-gray-100 flex gap-8 shadow-sm">
                        <div class="text-center">
                            <span class="block text-2xl font-display font-bold text-studio-dark" id="count-total">0</span>
                            <span class="text-[10px] uppercase tracking-widest text-gray-400">Total</span>
                        </div>
                        <div class="text-center">
                            <span class="block text-2xl font-display font-bold text-studio-blue" id="count-new">0</span>
                            <span class="text-[10px] uppercase tracking-widest text-gray-400">New</span>
                        </div>
                    </div>
                </div>

                <div class="bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="border-b border-gray-100 bg-gray-50/80 text-[10px] font-mono uppercase tracking-widest text-gray-400">
                                    <th class="p-6">Received</th>
                                    <th class="p-6">Client</th>
                                    <th class="p-6">Project</th>
                                    <th class="p-6">Message</th>
                                    <th class="p-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="inquiries-body" class="text-sm divide-y divide-gray-50">
                                </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    `;

    // Event Listeners
    document.getElementById('logout-btn').addEventListener('click', async () => {
        const confirmed = await Modal.confirm({
            title: 'Sign Out',
            message: 'Are you sure you want to disconnect from the admin session?',
            confirmText: 'Logout',
            type: 'destruct'
        });

        if (confirmed) {
            await supabase.auth.signOut();
            Toast.show('Logged out successfully', 'info');
            // Show a brief logout state then redirect to login or home
            renderLogin('Session Terminated');
        }
    });

    document.getElementById('refresh-btn').addEventListener('click', () => {
        const icon = document.getElementById('refresh-icon');
        icon.classList.add('rotate-180');
        fetchInquiries().finally(() => setTimeout(() => icon.classList.remove('rotate-180'), 500));
    });

    await fetchInquiries();
}

/**
 * DATA FETCHING & ACTIONS
 */
async function fetchInquiries() {
    const tbody = document.getElementById('inquiries-body');
    if (!tbody) return;

    try {
        const { data, error } = await supabase
            .from('inquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        document.getElementById('count-total').textContent = data.length;
        document.getElementById('count-new').textContent = data.filter(i => i.status === 'NEW').length;

        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="p-20 text-center text-gray-400">No inquiries found.</td></tr>`;
            return;
        }

        tbody.innerHTML = data.map(item => `
            <tr class="group hover:bg-blue-50/30 transition-colors ${item.status === 'NEW' ? 'bg-blue-50/10' : ''}">
                <td class="p-6 align-top font-mono text-xs">
                    ${new Date(item.created_at).toLocaleDateString()}<br/>
                    <span class="text-gray-400">${new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </td>
                <td class="p-6 align-top">
                    <div class="font-bold text-studio-dark">${escapeHtml(item.name)}</div>
                    <div class="text-xs text-gray-500">${escapeHtml(item.email)}</div>
                </td>
                <td class="p-6 align-top">
                    <span class="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold uppercase">${escapeHtml(item.project_type || 'General')}</span>
                </td>
                <td class="p-6 align-top text-gray-600 leading-relaxed max-w-xs">
                    <p class="${item.status === 'NEW' ? 'font-medium text-studio-dark' : 'font-light'}">${escapeHtml(item.message)}</p>
                </td>
                <td class="p-6 align-top text-right space-x-2">
                    ${item.status === 'NEW' ? `
                        <button onclick="updateStatus('${item.id}', 'READ')" class="p-2 text-studio-mint hover:bg-studio-mint/10 rounded-full transition-all" title="Mark as Read">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                    ` : ''}
                    <button onclick="deleteInquiry('${item.id}')" class="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="1.5"/></svg>
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (err) {
        Toast.show('Sync Error', 'error');
        tbody.innerHTML = `<tr class="text-red-500"><td colspan="5" class="p-10 text-center">${err.message}</td></tr>`;
    }
}

// Global scope window functions for the inline onclick handlers
window.updateStatus = async (id, status) => {
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
    if (!error) fetchInquiries();
};

window.deleteInquiry = async (id) => {
    const confirmed = await Modal.confirm({
        title: 'Delete Inquiry',
        message: 'This action cannot be undone. Are you sure you want to permanently delete this message?',
        confirmText: 'Delete',
        type: 'destruct'
    });

    if (!confirmed) return;

    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (!error) {
        Toast.show('Deleted Inquiry', 'success');
        fetchInquiries();
    } else {
        Toast.show('Failed to delete', 'error');
    }
};

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

init();