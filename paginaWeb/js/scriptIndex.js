var estado = document.getElementById('estado')
var containerMascotas = document.getElementById('containerMascotas')
var container = document.getElementById('containerEdades')
consultarEdad()


estado.addEventListener('click', () => {
    consultarEstado(estado.value)
    containerMascotas.innerHTML = ""
})



function consultarEdad() {
    //obtener las edades de las mascotas
    fetch('http://localhost:3500/edadesMascotas')
        .then(response => response.json())
        .then(data =>
            data.forEach(element => {
              crearItems(element) 
            })
        );
}

function crearItems(params) {
    var item = document.createElement('option')
    item.innerHTML = `${params.edad}`
    item.addEventListener('click', () => {
        containerMascotas.innerHTML = " "
        consultarMascotas(item.value)        
    })
    container.appendChild(item)
}


function consultarMascotas(item) {
    //obtener la lista de las mascotas
    fetch(`http://localhost:3500/mascotas/${item}`)
        .then(response => response.json())
        .then(data =>
            listaMascota(data)
        );
}

function consultarEstado(item) {
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
    console.log(item);
    var tarjeta = document.createElement('div')
    tarjeta.innerHTML = `
    <div class="cardPrincipal">
        <h4>Nivel de estado</h4>
        <p>${item.nivelsalud}</p>    
        <h4>Codigo de Mascota</h4>
        <p>${item.codmascota}</p>
        <h4>nombre de la mascota</h4>
        <p>${item.nombreanimal}</p>
        <h4>edad</h4>
        <p>${item.edad}</p>
        <h4>raza</h4>
        <p>${item.raza}</p>
    </div>
    `;
    containerMascotas.appendChild(tarjeta)
}
