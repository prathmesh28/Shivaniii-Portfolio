(() => {
    // ── Inject modal HTML ──────────────────────────────────────────────────────
    const modalHTML = `
    <div id="contact-modal" class="fixed inset-0 z-[200] hidden items-center justify-center p-gutter" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <!-- Backdrop -->
        <div id="contact-modal-backdrop" class="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"></div>

        <!-- Modal Panel -->
        <div class="relative z-10 w-full max-w-[600px] bg-surface border border-border-subtle overflow-hidden shadow-xl grid-bg">

            <!-- Header -->
            <header class="p-card-padding border-b border-border-subtle flex justify-between items-center bg-surface/80 backdrop-blur-md">
                <div class="flex flex-col gap-1">
                    <h2 id="contact-modal-title" class="font-headline-md text-headline-md text-on-surface">Send a Message</h2>
                </div>
                <button id="contact-modal-close" aria-label="Close" class="p-2 hover:bg-surface-container transition-colors rounded-lg group">
                    <span class="material-symbols-outlined text-on-surface-variant group-hover:text-on-surface">close</span>
                </button>
            </header>

            <!-- Form -->
            <form id="contact-modal-form" novalidate class="p-card-padding flex flex-col gap-6">
                <!-- Name -->
                <div class="flex flex-col gap-2">
                    <label class="font-label-md text-label-md text-on-surface-variant flex items-center gap-2" for="cm-name">
                        <span class="material-symbols-outlined text-[18px]">person</span>
                        FULL NAME
                    </label>
                    <input id="cm-name" type="text" placeholder="Shivani Nair" required
                        class="w-full p-unit border border-border-subtle bg-surface-gray font-body-md text-body-md focus-ring transition-all placeholder:opacity-30" />
                    <p class="cm-error hidden font-label-md text-[12px] text-error">// Name is required</p>
                </div>

                <!-- Email -->
                <div class="flex flex-col gap-2">
                    <label class="font-label-md text-label-md text-on-surface-variant flex items-center gap-2" for="cm-email">
                        <span class="material-symbols-outlined text-[18px]">alternate_email</span>
                        EMAIL ADDRESS
                    </label>
                    <input id="cm-email" type="email" placeholder="snair.dev@backend.node" required
                        class="w-full p-unit border border-border-subtle bg-surface-gray font-body-md text-body-md focus-ring transition-all placeholder:opacity-30" />
                    <p class="cm-error hidden font-label-md text-[12px] text-error">// Valid email is required</p>
                </div>

                <!-- Message -->
                <div class="flex flex-col gap-2">
                    <label class="font-label-md text-label-md text-on-surface-variant flex items-center gap-2" for="cm-message">
                        <span class="material-symbols-outlined text-[18px]">terminal</span>
                        MESSAGE_BODY
                    </label>
                    <textarea id="cm-message" rows="5" placeholder="System.out.println('Your message here...');" required
                        class="w-full p-unit border border-border-subtle bg-surface-gray font-body-md text-body-md focus-ring transition-all resize-none placeholder:opacity-30 font-code-sm"></textarea>
                    <p class="cm-error hidden font-label-md text-[12px] text-error">// Message is required</p>
                </div>

                <!-- Submit -->
                <button id="contact-modal-submit" type="submit"
                    class="bg-primary-container hover:bg-primary text-on-primary py-4 px-gutter font-label-md text-label-md uppercase tracking-widest flex justify-center items-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-primary/10">
                    Send Message
                    <span class="material-symbols-outlined">send</span>
                </button>
            </form>

            <!-- Footer -->
            <footer class="px-card-padding py-6 border-t border-border-subtle bg-surface-gray flex flex-col md:flex-row justify-between items-center gap-4">
                <span class="font-label-md text-label-md text-on-surface-variant/60">© 2026 SHIVANI NAIR</span>
                <div class="flex gap-gutter">
                    <a href="https://www.linkedin.com/in/shivaninair12/" class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                        <span class="material-symbols-outlined text-[18px]">link</span>
                        LinkedIn
                    </a>
                    <a href="mailto:shivani.nair1201@gmail.com"  class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                        <span class="material-symbols-outlined text-[18px]">mail</span>
                        Email
                    </a>
                </div>
            </footer>

            <!-- Decorative left accent -->
            <div class="absolute bottom-0 left-0 w-1 h-full bg-primary-container pointer-events-none"></div>
        </div>
    </div>`;

    // Inject grid-bg style if not already present
    if (!document.getElementById('cm-grid-style')) {
        const style = document.createElement('style');
        style.id = 'cm-grid-style';
        style.textContent = `
            .grid-bg { background-image: radial-gradient(#E2E8F0 1px, transparent 1px); background-size: 24px 24px; }
            .focus-ring:focus { outline: none; border-color: #0041c8; box-shadow: 0 0 0 2px rgba(0,65,200,0.1); }
        `;
        document.head.appendChild(style);
    }

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // ── Refs ───────────────────────────────────────────────────────────────────
    const modal     = document.getElementById('contact-modal');
    const backdrop  = document.getElementById('contact-modal-backdrop');
    const form      = document.getElementById('contact-modal-form');
    const submitBtn = document.getElementById('contact-modal-submit');

    // ── Open / Close ───────────────────────────────────────────────────────────
    function openModal() {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        form.classList.remove('hidden');
        form.reset();
        clearErrors();
    }

    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }

    // Bind all "Contact Me" triggers on the page
    document.querySelectorAll('#open-contact-modal, [data-contact-trigger]').forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    document.getElementById('contact-modal-close').addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('flex')) closeModal();
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && modal.classList.contains('flex')) form.requestSubmit();
    });

    // ── Validation ─────────────────────────────────────────────────────────────
    function clearErrors() {
        modal.querySelectorAll('.cm-error').forEach(el => el.classList.add('hidden'));
        modal.querySelectorAll('input, textarea').forEach(el => el.classList.remove('border-error'));
    }

    function showError(input) {
        input.classList.add('border-error');
        const err = input.closest('div').querySelector('.cm-error');
        if (err) err.classList.remove('hidden');
    }

    // ── Submit ─────────────────────────────────────────────────────────────────
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        const nameEl    = document.getElementById('cm-name');
        const emailEl   = document.getElementById('cm-email');
        const messageEl = document.getElementById('cm-message');
        const emailRe   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let valid = true;
        if (!nameEl.value.trim())               { showError(nameEl);    valid = false; }
        if (!emailRe.test(emailEl.value.trim())) { showError(emailEl);   valid = false; }
        if (!messageEl.value.trim())            { showError(messageEl); valid = false; }
        if (!valid) return;

        const originalHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `EXECUTING... <span class="material-symbols-outlined animate-spin">progress_activity</span>`;

        setTimeout(() => {
            submitBtn.classList.replace('bg-primary-container', 'bg-secondary');
            submitBtn.innerHTML = `MESSAGE DELIVERED <span class="material-symbols-outlined">check_circle</span>`;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.classList.replace('bg-secondary', 'bg-primary-container');
                submitBtn.innerHTML = originalHTML;
                form.reset();
                closeModal();
            }, 2000);
        }, 1500);
    });
})();
