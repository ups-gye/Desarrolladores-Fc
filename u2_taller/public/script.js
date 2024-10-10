// Función para guardar un usuario (Insertar)
const url = 'http://localhost:3000/usuario';
function guardar_usuario() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;


    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            listar_usuarios();
            cancelar_usuario();
        });
}

// Función para listar usuarios
function listar_usuarios() {
    fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            const lista = document.getElementById('lista_usuarios').getElementsByTagName('tbody')[0];
            lista.innerHTML = '';
            data.body.forEach(usuario => {
                const fila = lista.insertRow();
                fila.innerHTML = `
                 <td>${usuario._id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td class="acciones">
                    <button class="btn-edit" onclick="editar_usuario('${usuario._id}', '${usuario.nombre}', '${usuario.apellido}')">Editar</button>
                    <button class="btn-delete" onclick="eliminar_usuario('${usuario._id}')">Eliminar</button>
                </td>
            `;
            });
        });
}

// Función para editar un usuario
function editar_usuario(id, nombre, apellido) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;

    const guardarBtn = document.querySelector('button[onclick="guardar_usuario()"]');
    guardarBtn.onclick = function () {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, nombre: document.getElementById('nombre').value, apellido: document.getElementById('apellido').value })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                listar_usuarios();
                cancelar_usuario();
            });
    };
}

// Función para eliminar un usuario
function eliminar_usuario(id) {
    fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            listar_usuarios();
        });
}

function cancelar_usuario() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
}

document.addEventListener('DOMContentLoaded', (event) => {
    listar_usuarios();
});