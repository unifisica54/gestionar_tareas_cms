$(document).ready(function () {
    let base_uri = '/prueba_analista_software/gestionar_tareas/public/index.php';
    $('#top-header').load('components/header/top/top.html', function () {
        $.getScript('components/header/top/top.js');
    });
    $('#menu-nav').load('components/menu/menu.html', function () {
        $.getScript('components/menu/menu.js');
    });
    function listar() {
        const token = JSON.parse(localStorage.getItem('token'));

        $.ajax({
            url: base_uri + '/api/tarea/index',
            type: 'POST',
            data: {
                search: $('#search').val(),
                size: 100
            },
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (response) {
                if (response.data.data.length > 0) {

                    console.log(response.data.data);
                    $('#tabla-tarea').empty();
                    response.data.data.forEach(function (tarea) {
                        const nuevaFila = `
                        <tr>
                            <td>${tarea.id}</td>
                            <td>${tarea.dni}</td>
                            <td>${tarea.titulo}</td>
                            <td>${tarea.descripcion}</td>
                            <td>${tarea.fecha_vencimiento}</td>
                            <td>${tarea.estado?.descripcion}</td>
                            <td>
                                <button class="btn btn-warning btnEditar" data-id="${tarea.id}">Editar</button>
                                <button class="btn btn-danger btnEliminar" data-id="${tarea.id}">Eliminar</button>
                            </td>
                        </tr>
                    `;
                        $('#tabla-tarea').append(nuevaFila);
                    });
                } else {
                    $('#tabla-tarea').html('<tr><td colspan="5" class="text-center">No hay tareas disponibles.</td></tr>');
                }

            },
            error: function () {
                $('#message').html('<div class="alert alert-danger">Error en el inicio de sesión.</div>');
            }
        });
    }

    listar();
    $(document).on('click', '#grabar', function () {

        const token = JSON.parse(localStorage.getItem('token'));
        const id = $('#id').val();
        const url = id ? base_uri + `/api/tarea/update/${id}` : base_uri + '/api/tarea/store';
        const method = 'POST';
        const data = {
                descripcion:$('#descripcion').val(),
                dni:$('#dni').val(),
                titulo:$('#titulo').val(),
                fecha_vencimiento:$('#fecha_vencimiento').val(),
                estado_id:$('#estado_id').val()
       
        };
        $.ajax({
            url: url,
            type: method,
            data: data,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (response) {
                listar();
            },
            error: function () {
                $('#message').html('<div class="alert alert-danger">Error en el inicio de sesión.</div>');
            }
        });
    });

    $(document).on('click', '.btnEliminar', function () {

        const token = JSON.parse(localStorage.getItem('token'));
        const id = $(this).data('id');
        const url = base_uri + `/api/tarea/delete/${id}`;
        const method = 'GET';
        $.ajax({
            url: url,
            type: method,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (response) {
                listar();
            },
            error: function () {
                $('#message').html('<div class="alert alert-danger">Error en el inicio de sesión.</div>');
            }
        });
    });
    $(document).on('click', '#limpiar', function () {
        $('#id').val('');
        $('#descripcion').val('');
        $('#dni').val('');
        $('#titulo').val('');
        $('#fecha_vencimiento').val('');
        $('#estado_id').val('');
    });
    $(document).on('click', '.btnEditar', function () {

        const token = JSON.parse(localStorage.getItem('token'));
        const id = $(this).data('id');
        const url = base_uri + `/api/tarea/edit/${id}`;
        const method = 'GET';
        $.ajax({
            url: url,
            type: method,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (response) {
                const tarea=response.data;
                $('#id').val(tarea.id);
                $('#descripcion').val(tarea.descripcion);
                $('#dni').val(tarea.dni);
                $('#titulo').val(tarea.titulo);
                $('#fecha_vencimiento').val(tarea.fecha_vencimiento);
                $('#estado_id').val(tarea.estado_id);
            },
            error: function () {
                $('#message').html('<div class="alert alert-danger">Error en el inicio de sesión.</div>');
            }
        });
    });
});