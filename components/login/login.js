$(document).ready(function () {
    $('#loginForm').on('submit', function (event) {
        event.preventDefault();
        let base_uri = '/prueba_analista_software/gestionar_tareas/public/index.php';
        $.ajax({
            url: base_uri+'/api/login', 
            type: 'POST',
            data: {
                    email: $('#email').val(),
                    password: $('#password').val()
            },
            success: function (response) {
                console.log(response);
                if (response.success) {
                    $('#message').html('<div class="alert alert-success">Inicio de sesión exitoso.</div>');
                    localStorage.setItem('token', JSON.stringify(response.token));
                    window.location.href='#tarea';
                    
                } else {
                    $('#message').html('<div class="alert alert-danger">' + response.message + '</div>');
                }
            },
            error: function () {
                $('#message').html('<div class="alert alert-danger">Error en el inicio de sesión.</div>');
            }
        });
    });
});
