const USER_KEY = "capquiz_current_user_v3";

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

// Toggle dropdown when clicking the whole wrapper (wider hit area). If the click
// is inside the dropdown (e.g., selecting a user), don't toggle here.
wrap.addEventListener("click", (e) => {
    if (e.target.closest('#userDropdown')) return; // let dropdown handle item clicks
    dropdown.classList.toggle("hidden");
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

