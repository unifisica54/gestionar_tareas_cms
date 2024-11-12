$(document).ready(function() {
    function loadComponent(uri) {
        $('#content').load(`components/${uri}.html`, function() {
            $.getScript(`components/${uri}.js`);
            $('<link>')
                .attr('rel', 'stylesheet')
                .attr('href', `components/${uri}.css`)
                .appendTo('head');
        });
    }
    Router
        .addRoute('home', function() { loadComponent('login/login'); })
        .addRoute('tarea', function() { loadComponent('tarea/tarea'); })
    Router.init();
});

