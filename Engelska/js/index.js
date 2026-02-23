document.addEventListener('DOMContentLoaded', () => {
    store = loadStore();

    const modulesContainer = document.getElementById('modulesContainer');
    let vocabVersion = localStorage.getItem('englishVocabVersion') || '2026-vecka-10';

    const versionSelectorAction = {
        id: 'version-selector',
        html: `
            <div class="versionSelector">
                <select id="vocabVersion">
                    <option value="2026-vecka-10">Vecka 10 (aktuell)</option>
                </select>
            </div>
        `
    };

    function renderPage() {
        renderHeader({
            title: 'Engelska',
            breadcrumb: 'Engelska',
            back: { show: true, label: 'Till startsidan', href: '../index.html' },
            actions: [versionSelectorAction],
            user: store.lastUser
        });

        // Initialize Desktop Selector (in header)
        const vocabVersionSelect = document.getElementById('vocabVersion');
        if (vocabVersionSelect) {
            vocabVersionSelect.value = vocabVersion;
            vocabVersionSelect.addEventListener('change', (e) => {
                vocabVersion = e.target.value;
                localStorage.setItem('englishVocabVersion', vocabVersion);

                // Sync mobile selector if it exists
                const mobileSelect = document.getElementById('vocabVersionMobile');
                if (mobileSelect) mobileSelect.value = vocabVersion;

                updateVocabData();
            });
        }

        // Initialize Mobile Selector (in body)
        const mobileSelector = document.getElementById('mobileVersionSelector');
        if (mobileSelector) {
            mobileSelector.innerHTML = `
                <div class="versionSelector" style="justify-content:center;">
                    <select id="vocabVersionMobile">
                        <option value="2026-vecka-10">Vecka 10 (aktuell)</option>
                    </select>
                </div>
            `;
            const mobileSelect = document.getElementById('vocabVersionMobile');
            if (mobileSelect) {
                mobileSelect.value = vocabVersion;
                mobileSelect.addEventListener('change', (e) => {
                    vocabVersion = e.target.value;
                    localStorage.setItem('englishVocabVersion', vocabVersion);

                    // Sync desktop selector if it exists
                    const headerSelect = document.getElementById('vocabVersion');
                    if (headerSelect) headerSelect.value = vocabVersion;

                    updateVocabData();
                });
            }
        }

        updateVocabData();
    }

    async function updateVocabData() {
        try {
            const response = await fetch(`./data/${vocabVersion}/metadata.json`);
            const metadata = await response.json();

            modulesContainer.innerHTML = '';
            if (metadata.modules && metadata.modules.length > 0) {
                metadata.modules.forEach(module => {
                    const link = document.createElement('a');
                    link.className = 'btn primary';
                    link.textContent = module.name;
                    link.title = module.description;

                    if (module.external && module.url) {
                        link.href = module.url;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                    } else {
                        link.href = `${module.id}/index.html`;
                    }

                    modulesContainer.appendChild(link);
                });
            } else {
                modulesContainer.innerHTML = '<p style="color: var(--muted); text-align: center;">Inga moduler tillgängliga för denna vecka</p>';
            }
        } catch (error) {
            console.error('Could not load vocabulary metadata:', error);
            modulesContainer.innerHTML = '<p style="color: red;">Fel vid laddning av moduler</p>';
        }
    }

    renderPage();
});
