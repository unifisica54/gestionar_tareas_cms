const Router = {
    routes: {},

    addRoute(path, callback) {
        this.routes[path] = callback;
        return this;
    },

    navigate() {
        const hash = window.location.hash.substring(1) || 'home';
        const route = this.routes[hash];
        if (route) {
            route();
        } else {
            console.error(`Ruta ${hash} no encontrada.`);
        }
    },

    init() {
        $(window).on('hashchange', () => this.navigate());
        this.navigate();
    }
};
