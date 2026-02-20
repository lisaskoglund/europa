document.addEventListener('DOMContentLoaded', () => {
    store = loadStore();
    renderHeader({
        title: '',
        user: store.lastUser,
    });
});


