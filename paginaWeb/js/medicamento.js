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
        <div>
        <p class="title">Nivel de estado :</p>
        <p>${item.codigoproduc}</p>    
        </div>
        <div>
        <p class="title">Codigo de Mascota :</p>
        <p>${item.nombrevacuna}</p>
        </div>
        <div>
        <p class="title">Vacuna :</p>
        <p>${item.descripvacuna}</p>
        </div>
        <div>
        <p class="title">Proveedor de Vacuna :</p>
        <p>${item.nombreproveedor}</p>
        </div>
    
        </div>
    `;
    containerMedicamentos.appendChild(tarjeta)
}