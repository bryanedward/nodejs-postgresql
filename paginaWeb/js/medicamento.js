var containerMedicamentos = document.getElementById('containerMedicamentos')

consultarMedicamentos()

function consultarMedicamentos() {
    //obtener la lista de las mascotas
    fetch('http://localhost:3500/medicamentos')
        .then(response => response.json())
        .then(data =>
            listaMedicamento(data)
        );
}

function listaMedicamento(params) {
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
        <p>${item.codigoproduc}</p>    
        <h4>Codigo de Mascota</h4>
        <p>${item.nombrevacuna}</p>
    </div>
    `;
    containerMedicamentos.appendChild(tarjeta)
}