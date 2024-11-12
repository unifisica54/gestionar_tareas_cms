$(document).ready(function () {
    let base_uri = '/prueba_analista_software/gestionar_tareas/public/index.php';
    
    $(document).on('click', '#logout', function () {
        const token = JSON.parse(localStorage.getItem('token'));
        $.ajax({
            url: base_uri+'/api/logout', 
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (response) {
                window.location.href='#home';
            },
            error: function () {
                $('#message').html('<div class="alert alert-danger">Error en el inicio de sesión.</div>');
            }
        });
    });
});