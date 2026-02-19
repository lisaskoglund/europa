const btn = document.getElementById("userSelectBtn");
const dropdown = document.getElementById("userDropdown");
const wrap = document.getElementById("userSelectWrap");

// Map users to their emoji/icon
const USER_ICONS = {
    Elsa: '🎀',
    Ingrid: '🌼',
    Elektra: '🌟'
};

function setButtonUserLabel(user){
    const icon = USER_ICONS[user] || '👤';
    btn.textContent = icon + ' ' + (user || 'Välj användare');
}

// Toggle dropdown when clicking the button
btn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent this click from being caught by the document listener
    dropdown.classList.toggle("hidden");
});

// Close dropdown if clicking outside of it
document.addEventListener('click', (event) => {
    if (!dropdown.classList.contains('hidden')) {
        // Check if the click was inside the button or the dropdown
        const isClickInside = wrap.contains(event.target);
        if (!isClickInside) {
            dropdown.classList.add('hidden');
        }
    }
});

dropdown.addEventListener("click", (e) => {
    const btnEl = e.target.closest('button[data-user]');
    if(!btnEl) return;
    const user = btnEl.dataset.user;

    localStorage.setItem(USER_KEY, user);
    setButtonUserLabel(user);
    dropdown.classList.add("hidden");
});

// Visa sparad användare direkt
const savedUser = localStorage.getItem(USER_KEY);
if(savedUser){
    setButtonUserLabel(savedUser);
}

