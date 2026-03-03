document.addEventListener('DOMContentLoaded', () => {
    store = loadStore();

    const modulesContainer = document.getElementById('modulesContainer');
    // Use a separate key from SO/Engelska so they don't interfere
    let savedVersion = localStorage.getItem('franskaIndexVersion');
    let examVersion = (savedVersion === 'countToFifty' || savedVersion === 'arkiv/etre')
        ? savedVersion
        : 'countToFifty';

    const versionSelectorAction = {
        id: 'version-selector',
        html: `
            <div class="versionSelector">
                <select id="examVersion">
                    <option value="" ${!examVersion ? 'selected' : ''}>Välj...</option>
                    <option value="countToFifty" ${examVersion === 'countToFifty' ? 'selected' : ''}>Räkna till 50 (Nu)</option>
                    <option value="arkiv/etre" ${examVersion === 'arkiv/etre' ? 'selected' : ''}>Être (Arkiv)</option>
                </select>
            </div>
        `
    };

    function renderPage() {
        renderHeader({
            title: 'Franska',
            breadcrumb: 'Franska',
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

                // Save to localStorage so sub-pages know what to load
                localStorage.setItem('franskaIndexVersion', examVersion);

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
                        <option value="" ${!examVersion ? 'selected' : ''}>Välj...</option>
                        <option value="countToFifty" ${examVersion === 'countToFifty' ? 'selected' : ''}>Räkna till 50</option>
                        <option value="arkiv/etre" ${examVersion === 'arkiv/etre' ? 'selected' : ''}>Être</option>
                    </select>
                </div>
            `;
            const mobileSelect = document.getElementById('examVersionMobile');
            if (mobileSelect) {
                mobileSelect.value = examVersion;
                mobileSelect.addEventListener('change', (e) => {
                    examVersion = e.target.value;
                    localStorage.setItem('franskaIndexVersion', examVersion);

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

        // Allow retry with default if first attempt fails
        let currentVersion = examVersion;

        if (!currentVersion) {
             modulesContainer.style.display = 'none';
             if (noExamView) noExamView.classList.remove('hidden');
             if (introSubtitle) introSubtitle.style.display = 'none';
             if (introHint) introHint.style.display = 'none';
             return;
        }

        try {
            console.log(`Loading metadata for version: ${currentVersion}`);
            let response = await fetch(`./data/${currentVersion}/metadata.json`);

            if (!response.ok) {
                console.warn(`Metadata for ${currentVersion} not found. Status: ${response.status}`);
                // If the saved version is invalid (e.g. old path), try falling back to default once
                if (currentVersion !== 'countToFifty') {
                    console.log('Falling back to default: countToFifty');
                    currentVersion = 'countToFifty';
                    examVersion = 'countToFifty';
                    localStorage.setItem('franskaIndexVersion', 'countToFifty');
                    // Update selectors
                    const examVersionSelect = document.getElementById('examVersion');
                    if (examVersionSelect) examVersionSelect.value = 'countToFifty';
                    const mobileSelect = document.getElementById('examVersionMobile');
                    if (mobileSelect) mobileSelect.value = 'countToFifty';

                    response = await fetch(`./data/${currentVersion}/metadata.json`);
                }
            }

            if (!response.ok) throw new Error(`Metadata not found for ${currentVersion}`);

            const metadata = await response.json();

            modulesContainer.innerHTML = '';

            // Handle Empty or Inactive state
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
                    // For now, assume sub-modules are under current directory or similar structure
                    // But since we don't have sub-modules yet, these links might 404 if clicked unless created.
                    // Just mimic SO behavior.
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
