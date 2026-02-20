/* js/header.js */

// Ensure this file is loaded after shared.js

/**
 * Renders a consistent, dynamic header across the application.
 * @param {object} config - The configuration for the header.
 * @param {string} [config.title] - The main title of the page.
 * @param {string} [config.breadcrumb] - Breadcrumb navigation text.
 * @param {string} [config.meta] - Additional meta text (e.g., "Fråga 1 av 10").
 * @param {object} [config.back] - Configuration for the back button.
 * @param {boolean} config.back.show - Whether to show the back button.
 * @param {string} config.back.label - The text for the back button.
 * @param {string} config.back.href - The URL for the back button.
 * @param {object} [config.user] - The current user object.
 * @param {string} config.user.name - The name of the user.
 * @param {Array<object>} [config.actions] - An array of action elements (buttons, dropdowns).
 */
function renderHeader(config = {}) {
    const headerEl = document.getElementById('app-header');
    if (!headerEl) {
        console.error('Header element #app-header not found!');
        return;
    }

    // Default values
    const {
        title = '',
        breadcrumb = '',
        meta = '',
        back = { show: false },
        user = null,
        actions = []
    } = config;

    // --- Build Header HTML ---

    // 1. Left Zone (Navigation)
    // Determine root path by looking at how header.js was included
    let rootPath = '';
    const scriptEl = document.querySelector('script[src*="js/header.js"]');
    if (scriptEl) {
        const src = scriptEl.getAttribute('src');
        // e.g. "../../js/header.js" -> "../../"
        // e.g. "js/header.js" -> ""
        rootPath = src.replace('js/header.js', '');
    }

    const backBtnHtml = back.show
        ? `<a href="${back.href}" class="back-btn">←</a>`
        : '';
    const leftZoneHtml = `${backBtnHtml}<a href="${rootPath}index.html" class="logo"><img src="${rootPath}images/logo.png" alt="Logo"></a>`;

    // 2. Center Zone (Context)
    const centerZoneHtml = `
        ${title ? `<h1 class="header-title">${title}</h1>` : ''}
    `;

    // 3. Right Zone (Actions + User)
    const userHtml = renderUser(user);
    const actionsHtml = actions.map(action => action.html).join('');

    const rightZoneHtml = `
        ${actionsHtml ? `<div class="header-actions">${actionsHtml}</div>` : ''}
        ${userHtml}
    `;

    // --- Assemble Final Header ---
    headerEl.innerHTML = `
        <div class="header-zone left">${leftZoneHtml}</div>
        <div class="header-zone center">${centerZoneHtml}</div>
        <div class="header-zone right">${rightZoneHtml}</div>
    `;

    // --- Add Event Listeners for Actions ---
    actions.forEach(action => {
        if (action.id && typeof action.onClick === 'function') {
            const actionEl = headerEl.querySelector(`#${action.id}`);
            if (actionEl) {
                actionEl.addEventListener('click', action.onClick);
            }
        }
    });
}

function renderUser(user) {
    const users = [
        { name: 'Elsa', icon: '🎀' },
        { name: 'Ingrid', icon: '🌼' },
        { name: 'Elektra', icon: '🌟' }
    ];

    return `
        <div class="userSelectWrap" id="userSelectWrap">
            <button class="userSelectBtn" id="userSelectBtn">
                ${user ? `${users.find(u => u.name === user)?.icon || '👤'} ${user}` : '👤 Välj användare'}
            </button>
            <div class="userDropdown hidden" id="userDropdown">
                ${users.map(u => `<button data-user="${u.name}">${u.name} ${u.icon}</button>`).join('')}
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        const userSelectWrap = document.getElementById('userSelectWrap');
        if (!userSelectWrap) return;

        const dropdown = document.getElementById('userDropdown');
        const isUserSelectBtn = e.target.closest('#userSelectBtn');
        const userBtn = e.target.closest('button[data-user]');

        if (isUserSelectBtn) {
            dropdown.classList.toggle('hidden');
        } else if (userBtn) {
            const userName = userBtn.dataset.user;
            store.lastUser = userName;
            saveStore(store);
            location.reload();
        } else {
            if (dropdown) {
                dropdown.classList.add('hidden');
            }
        }
    });
});
