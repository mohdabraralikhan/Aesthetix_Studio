export const Toast = {
    container: null,

    init() {
        if (this.container) return;
        this.container = document.createElement('div');
        this.container.className = 'fixed top-6 right-6 z-50 flex flex-col gap-4 pointer-events-none';
        document.body.appendChild(this.container);
    },

    show(message, type = 'success') {
        this.init();

        const toast = document.createElement('div');
        toast.className = `
            flex items-center gap-3 px-6 py-4 rounded shadow-lg transform transition-all duration-300 translate-x-10 opacity-0 pointer-events-auto min-w-[300px]
            ${type === 'success' ? 'bg-studio-mint text-studio-dark' : ''}
            ${type === 'error' ? 'bg-rose-500 text-white' : ''}
            ${type === 'info' ? 'bg-studio-blue text-white' : ''}
        `;

        // Icons based on type
        let icon = '';
        if (type === 'success') icon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
        if (type === 'error') icon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
        if (type === 'info') icon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

        toast.innerHTML = `
            ${icon}
            <p class="font-sans text-sm font-medium">${message}</p>
        `;

        this.container.appendChild(toast);

        // Animate In
        requestAnimationFrame(() => {
            toast.classList.remove('translate-x-10', 'opacity-0');
        });

        // Auto Dismiss
        setTimeout(() => {
            toast.classList.add('translate-x-10', 'opacity-0');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);
    }
};
