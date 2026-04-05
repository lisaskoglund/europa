document.addEventListener('DOMContentLoaded', () => {
    store = loadStore();

    const modulesContainer = document.getElementById('modulesContainer');
    const ACTIVE_VERSION = 'religion';

    // Always reset to the active homework on page load so stale localStorage never wins
    localStorage.setItem('instuderingVersion', ACTIVE_VERSION);

    let examVersion = ACTIVE_VERSION;

    const versionSelectorAction = {
        id: 'version-selector',
        html: `
            <div class="versionSelector">
                <select id="examVersion">
                    <option value="religion" ${examVersion === 'religion' ? 'selected' : ''}>Religion</option>
                    <optgroup label="Arkiv">
                        <option value="arkiv/2026-februari">2026 februari</option>
                    </optgroup>
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

        // Initialize Desktop Selector (in header)
        const examVersionSelect = document.getElementById('examVersion');
        if (examVersionSelect) {
            examVersionSelect.value = examVersion;
            examVersionSelect.addEventListener('change', (e) => {
                examVersion = e.target.value;

                // Save so instudering.js picks up the selected version
                localStorage.setItem('instuderingVersion', examVersion);

                // Sync mobile selector if it exists
                const mobileSelect = document.getElementById('examVersionMobile');
                if (mobileSelect) mobileSelect.value = examVersion;

                updateExamData();
            });
        }

        // Initialize Mobile Selector (in body)
        const mobileSelector = document.getElementById('mobileVersionSelector');
        if (mobileSelector) {
            mobileSelector.innerHTML = `
                <div class="versionSelector" style="justify-content:center;">
                    <select id="examVersionMobile">
                        <option value="religion" ${examVersion === 'religion' ? 'selected' : ''}>Religion</option>
                        <optgroup label="Arkiv">
                            <option value="arkiv/2026-februari">2026 februari</option>
                        </optgroup>
                    </select>
                </div>
            `;
            const mobileSelect = document.getElementById('examVersionMobile');
            if (mobileSelect) {
                mobileSelect.value = examVersion;
                mobileSelect.addEventListener('change', (e) => {
                    examVersion = e.target.value;
                    localStorage.setItem('instuderingVersion', examVersion);

                    // Sync desktop selector if it exists
                    const headerSelect = document.getElementById('examVersion');
                    if (headerSelect) headerSelect.value = examVersion;

                    updateExamData();
                });
            }
        }

        updateExamData();
    }

    async function updateExamData() {
        const noExamView = document.getElementById('no-exam-view');
        const introSubtitle = document.getElementById('introSubtitle');
        const introHint = document.getElementById('introHint');

        if (!examVersion) {
             modulesContainer.style.display = 'none';
             if (noExamView) noExamView.classList.remove('hidden');
             if (introSubtitle) introSubtitle.style.display = 'none';
             if (introHint) introHint.style.display = 'none';
             return;
        }

        try {
            const { metadata } = await import(`../data/${examVersion}/metadata.js`);

            modulesContainer.innerHTML = '';

            // Handle Empty or Inactive state
            // If active is explicitly false OR modules array is empty/invalid
            const hasModules = metadata.modules && Array.isArray(metadata.modules) && metadata.modules.length > 0 && metadata.modules[0].id;

            if (metadata.active === false || !hasModules) {
                 modulesContainer.style.display = 'none';
                 if (noExamView) noExamView.classList.remove('hidden');
                 if (introSubtitle) introSubtitle.style.display = 'none';
                 if (introHint) introHint.style.display = 'none';
                 return;
            }

            // Keep normal view
            modulesContainer.style.display = 'flex';
            if (noExamView) noExamView.classList.add('hidden');
            if (introSubtitle) introSubtitle.style.display = 'block';
            if (introHint) introHint.style.display = 'block';

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
        } catch (error) {
            console.error('Could not load exam metadata:', error);
            modulesContainer.innerHTML = '<p style="color: red;">Fel vid laddning av moduler</p>';
        }
    }

    renderPage();
});
