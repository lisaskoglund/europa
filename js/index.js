document.addEventListener('DOMContentLoaded', () => {
    store = loadStore();
    renderHeader({
        title: 'Välkommen till Plugga!',
        user: store.lastUser,
    });
});


