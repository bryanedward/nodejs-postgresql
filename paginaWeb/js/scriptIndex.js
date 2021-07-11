var estado = document.getElementById('estado')
var containerMascotas = document.getElementById('containerMascotas')
var edades = document.getElementById('edades')

consultarMascotas(edades.value)


edades.addEventListener('click', () => {
    consultarMascotas(edades.value)
    containerMascotas.innerHTML =""
})

estado.addEventListener('click', () => {
    filtarConsulta(estado.value)
    containerMascotas.innerHTML = ""
})



function consultarMascotas() {
    //obtener la lista de las mascotas
    fetch(`http://localhost:3500/mascotas/${edades.value}`)
        .then(response => response.json())
        .then(data =>
            listaMascota(data)
        );
}

function filtarConsulta(item) {
    //filtar mascota por el nivel de estado
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
