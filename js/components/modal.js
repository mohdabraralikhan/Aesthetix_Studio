export const Modal = {
    container: null,

    init() {
        if (this.container) return;
        this.container = document.createElement('div');
        this.container.id = 'studio-modal-container';
        this.container.className = 'fixed inset-0 z-[60] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300';
        document.body.appendChild(this.container);
    },

    confirm({ title = 'Confirm Action', message = 'Are you sure?', confirmText = 'Confirm', cancelText = 'Cancel', type = 'destruct' }) {
        return new Promise((resolve) => {
            this.init();

            // Backdrop
            this.container.innerHTML = `
                <div class="absolute inset-0 bg-studio-dark/20 backdrop-blur-sm transition-opacity" id="modal-backdrop"></div>
                <div class="bg-white w-full max-w-[360px] p-8 rounded-2xl shadow-2xl transform scale-95 transition-all duration-300 relative z-10 mx-4" id="modal-content">
                    <div class="text-center mb-6">
                        <div class="w-10 h-10 mx-auto mb-4 flex items-center justify-center rounded-full ${type === 'destruct' ? 'bg-red-50 text-red-500' : 'bg-studio-blue/10 text-studio-blue'}">
                            ${type === 'destruct'
                    ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`
                    : `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
                }
                        </div>
                        <h3 class="font-display font-bold text-lg text-studio-dark mb-2">${title}</h3>
                        <p class="text-sm text-gray-500 leading-relaxed">${message}</p>
                    </div>
                    <div class="flex gap-3">
                        <button id="modal-cancel" class="flex-1 px-4 py-3 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors">
                            ${cancelText}
                        </button>
                        <button id="modal-confirm" class="flex-1 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-white transition-all shadow-lg hover:-translate-y-0.5 ${type === 'destruct' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-studio-dark hover:bg-studio-blue shadow-studio-dark/20'}">
                            ${confirmText}
                        </button>
                    </div>
                </div>
            `;

            // Animate In
            requestAnimationFrame(() => {
                this.container.classList.remove('opacity-0', 'pointer-events-none');
                this.container.querySelector('#modal-content').classList.remove('scale-95');
                this.container.querySelector('#modal-content').classList.add('scale-100');
            });

            const cleanup = () => {
                this.container.classList.add('opacity-0', 'pointer-events-none');
                this.container.querySelector('#modal-content').classList.add('scale-95');
                this.container.querySelector('#modal-content').classList.remove('scale-100');
                setTimeout(() => {
                    this.container.innerHTML = '';
                    resolve(false); // Resolve false if plain cleanup (though usually handled by buttons)
                }, 300);
            };

            const handleConfirm = () => {
                cleanup();
                resolve(true); // Resolve true
            };

            const handleCancel = () => {
                cleanup();
                resolve(false); // Resolve false
            };

            document.getElementById('modal-confirm').onclick = handleConfirm;
            document.getElementById('modal-cancel').onclick = handleCancel;
            document.getElementById('modal-backdrop').onclick = handleCancel;
        });
    }
};
