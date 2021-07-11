var estado = document.getElementById('estado')
var containerMascotas = document.getElementById('containerMascotas')


estado.addEventListener('click', () => {
    filtarConsulta(estado.value)
})

consultarMascotas()

function consultarMascotas() {
    //obtener la lista de las mascotas
    fetch('http://localhost:3500/')
        .then(response => response.json())
        .then(data =>
            listaMascota(data)
        );
}

function filtarConsulta(item) {
    //filtar mascota por el nivel de estado
    containerMascotas.innerHTML = ""
    fetch(`http://localhost:3500/get/${item}`).then(response => response.json())
        .then(data =>
            listaMascota(data)
        )
}

function listaMascota(params) {
    params.forEach(item => {
        crearLista(item)
    });
}

function crearLista(item) {
    //crear la lista para la visualizacion
    console.log(item);
    var tarjeta = document.createElement('div')
    tarjeta.innerHTML = `
    <div class="cardPrincipal">
        <h4>nivel de estado</h4>
        <p>${item.nivelsalud}</p>    
        <h4>Codigo de Mascota</h4>
        <p>${item.codmascota}</p>
    </div>
    `;
    containerMascotas.appendChild(tarjeta)
}

