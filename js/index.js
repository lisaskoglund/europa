const USER_KEY = "capquiz_current_user_v3";

document.querySelectorAll(".choiceBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        const user = btn.dataset.user;
        if (user) {
            localStorage.setItem(USER_KEY, user);
        }
    });
});

