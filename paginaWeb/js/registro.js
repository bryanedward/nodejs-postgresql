var registro = document.getElementById('registro')
var formulario = document.getElementById('formulario')

registro.addEventListener('click', () => {
    switch (registro.value) {
        case "chequeoMedico": 
        crearChequeo()
            break;
        case "factura":
            crearFactura()
            break;

        default:
            break;
    }
})


function crearChequeo() {
    //creacion del chequeo medico de los animales
    var crearFormularioCheq = document.createElement('div')
    formulario.innerHTML = " "
    crearFormularioCheq.innerHTML = `
        <label for="cedulaVeterianario">cedula del veterinario</label>
        <input type="text" placeholder="cedulaVeterianario">
        <label for="fechaNacimi">fecha de nacimiento del animal</label>
        <input type="text" placeholder="fechaNacimi">
        <label for="raza">raza del animal </label>
        <input type="text" placeholder="raza">
        <label for="genero">genero del animal </label>
        <input type="text" placeholder="genero">
        <label for="esterilizado">esterilizado del animal </label>
        <input type="text" placeholder="esterilizado">
        <label for="esterilizado">esterilizado del animal </label>
        <input type="text" placeholder="esterilizado">
        <button id="btnEnviarChequeo" class="btnEnviarChequeo">EnviarChequeo</button>
    `
    
    crearFormularioCheq.addEventListener('click', () => {
        console.log("cheqeui");
    })

    formulario.appendChild(crearFormularioCheq)
}


function crearFactura() {
    //creacion de la factura para los clientes
    var crearFormularioFact = document.createElement('div')
    formulario.innerHTML = " "
    crearFormularioFact.innerHTML = `
        <label for="fechaNacimi">codigo Factura</label>
        <input type="text" placeholder="fechaNacimi">
        <label for="cedula"> cedula del cliente</label>
        <input type="text" placeholder="cedula del cliente">
        <label for="cedula"> cedula del cliente</label>
        <input type="text" placeholder="cedula del cliente">
        <label for="nombreCli"> nombre del cliente</label>
        <input type="text" placeholder="nombre del cliente">
        <label for="dirCli"> direccion del cliente</label>
        <input type="text" placeholder="direccion del cliente">
        <label for="celularCli"> celular del cliente</label>
        <input type="text" placeholder="celular del cliente">
        <button id="btnEnviarFactura" class="btnEnviarFactura">EnviarFactura</button>
    `

    crearFormularioFact.addEventListener('click', () => {
    })

    formulario.appendChild(crearFormularioFact)
}