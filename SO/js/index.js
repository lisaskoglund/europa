document.addEventListener('DOMContentLoaded', () => {
    store = loadStore();

    const modulesContainer = document.getElementById('modulesContainer');
    // Use a separate key from instudering so they don't interfere
    let examVersion = localStorage.getItem('soIndexVersion') || '2026-februari';

    const versionSelectorAction = {
        id: 'version-selector',
        html: `
            <div class="versionSelector">
                <label for="examVersion">Prov</label>
                <select id="examVersion">
                    <option value="2026-februari">2026 februari</option>
                    <option value="arkiv/2025-höst">2025 Höst (arkiv)</option>
                </select>
            </div>
        `
    };

    function renderPage() {
        renderHeader({
            title: 'Samhällskunskap',
            breadcrumb: 'SO',
            back: { show: true, label: 'Till startsidan', href: '../index.html' },
            user: store.lastUser,
            actions: [versionSelectorAction]
        });

        const examVersionSelect = document.getElementById('examVersion');
        if (examVersionSelect) {
            examVersionSelect.value = examVersion;
            examVersionSelect.addEventListener('change', (e) => {
                examVersion = e.target.value;
                localStorage.setItem('soIndexVersion', examVersion);
                updateExamData();
            });
        }

        updateExamData();
    }

    async function updateExamData() {
        try {
            const response = await fetch(`./data/${examVersion}/metadata.json`);
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
                modulesContainer.innerHTML = '<p style="color: var(--muted); text-align: center;">Inga moduler tillgängliga för detta prov</p>';
            }
        } catch (error) {
            console.error('Could not load exam metadata:', error);
            modulesContainer.innerHTML = '<p style="color: red;">Fel vid laddning av moduler</p>';
        }
    }

    renderPage();
});
