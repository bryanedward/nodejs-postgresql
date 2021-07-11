var registro = document.getElementById('registro')
var formulario = document.getElementById('formulario')
var listaPaciente = document.getElementById('listaPaciente')

registro.addEventListener('click', () => {
    switch (registro.value) {
        case "chequeoMedico":
            listaPaciente.innerHTML = " "
            consultaListaPaciente()
            break;
        case "chequeoIngreso":
            listaPaciente.innerHTML = " "
            crearIngreso()
            break;

        default:
            break;
    }
})



function consultaListaPaciente() {
    //consultar los usuarios
    
    fetch('http://localhost:3500/usuarios')
        .then(response => response.json())
        .then(data =>
            data.forEach(element => {
              crearLista(element)  
            })
        );

    

}

function crearLista(params) {

    var tarjetaPaciente = document.createElement('div')
    tarjetaPaciente.innerHTML = `
            <p>cedula del cliente: ${params.cedula}</p>
            <p>nombre: ${params.nombre}</p>
            <p>apellido: ${params.apellido}</p>
            <p>direccion: ${params.direccion}</p>
            <p>celular: ${params.celular}</p>
            <p>fecha visita: ${params.fechavisita}</p>
            <button id="btnDialog" class="btnDialog">chequear este paciente</button>
            `

    var btnDialog = tarjetaPaciente.querySelector('.btnDialog')

    btnDialog.addEventListener('click', () => {
        crearChequeo(params)
    })

    listaPaciente.appendChild(tarjetaPaciente)
}





function crearChequeo(params) {
    //creacion del chequeo medico de los animales
    console.log(params);
    var esterilizado = ""
    if (params.esterilizado) {
        esterilizado = "si"
    }else{
        esterilizado = "no"
    }
    var crearFormularioCheq = document.createElement('div')
    formulario.innerHTML = " "
    crearFormularioCheq.innerHTML = `
        <h2>Ficha medica de ${params.nombreanimal}</h2>
        <label for="cedulaVeterianario">cedula del veterinario</label>
        <input type="text" placeholder="cedulaVeterianario">
        <label for="responsable">responsable de animal (dueño)</label>
        <input type="text" placeholder="cedulaVeterianario" value ="${params.nombre} ${params.apellido} " disabled>
        <label for="nombreAnimal">nombre de la mascota</label>
        <input type="text"  value="${params.nombreanimal}">
        <label for="nombreAnimal">estado de salud</label>
        <input type="text"  value="${params.nivelsalud}">
        <label for="fechaNacimi">fecha de nacimiento del animal</label>
        <input type="text" placeholder="fechaNacimi" value="${params.fechanac}">
        <label for="raza">raza del animal </label>
        <input type="text" placeholder="raza" value="${params.raza}">
        <label for="genero">genero del animal </label>
        <input type="text" placeholder="genero" value="${params.genero}">
        <label for="esterilizado">esterilizado del animal </label>
        <input type="text" placeholder="esterilizado" value=${esterilizado}>
        <button id="btnEnviarChequeo" class="btnEnviarChequeo">EnviarChequeo</button>
    `



    crearFormularioCheq.addEventListener('click', () => {
        console.log("cheqeui");
    })

    formulario.appendChild(crearFormularioCheq)
}


function crearIngreso() {
    //creacion del ingreso del animal
    var crearFormularioIngre = document.createElement('div')
    formulario.innerHTML = " "
    crearFormularioIngre.innerHTML = `
        <label for="nombreCLiente">Nombre del cliente</label>
        <input type="text" id="nombreCLiente" class="nombreCLiente" 
        placeholder="">
        <label for="apellidoCLiente">Apellido del cliente</label>
        <input type="text" id="apellidoCLiente" class="apellidoCLiente" 
        placeholder="">
        <label for="cedula"> cedula del cliente</label>
        <input type="text" id="cedula" class="cedula"
        placeholder="">
        <label for="dirCli"> direccion del cliente</label>
        <input type="text" id="dirCli"  class="dirCli"
        placeholder="">
        <label for="celularCli"> celular del cliente</label>
        <input type="text" id="celularCli" class="celularCli"
        placeholder="">
        <label for="fechaIngreso"> fecha de Ingreso</label>
        <input type="text" id="fechaIngreso" class="fechaIngreso" 
        placeholder="" disabled>
        <label for="animalIngresar">nombre del animal</label>
        <input type="text" id="animalIngresar" class="animalIngresar"
        placeholder="">
        <label for="animalGenero">genero del animal</label>
        <input type="text" id="animalGenero" class="animalGenero"
        placeholder="">
        <button id="btnEnviarFactura" class="btnEnviarFactura">EnviarFactura</button>
    `

    var todayDate = new Date().toISOString().slice(0, 10);
    var btn = crearFormularioIngre.querySelector('.btnEnviarFactura')
    var inputFecha = crearFormularioIngre.querySelector('.fechaIngreso')
    var inputNombreCli = crearFormularioIngre.querySelector('.nombreCLiente')
    var inputApellido = crearFormularioIngre.querySelector('.apellidoCLiente')
    var inputCedula = crearFormularioIngre.querySelector('.cedula')
    var inputDirrec = crearFormularioIngre.querySelector('.dirCli')
    var inputCelular = crearFormularioIngre.querySelector('.celularCli')
    var inputAnimal = crearFormularioIngre.querySelector('.animalIngresar')
    var inputGenero = crearFormularioIngre.querySelector('.animalGenero')

    inputFecha.value = todayDate
    btn.addEventListener('click', () => {
        //validar campos del formulario ingreseo
        if (inputNombreCli.value.trim() === "" ||
            inputApellido.value.trim() === "" ||
            inputCedula.value.trim() === "" ||
            inputDirrec.value.trim() === "" ||
            inputCelular.value.trim() === "" ||
            inputAnimal.value.trim() === "" ||
            inputGenero.value.trim() === "") {
            alert('falta campos')
        } else {

            var urlEnvioRegistro = "http://localhost:3500/guardarRegistro"

            const datosRegistro = {
                nombreClient: inputNombreCli.value.trim(),
                apellidoClient:inputApellido.value.trim(),
                cedulaClient: inputCedula.value.trim(),
                dirreClient: inputDirrec.value.trim(),
                celularClient: inputCelular.value.trim(),
                nombreAnimal: inputAnimal.value.trim(),
                generoAnimal : inputGenero.value.trim(),
                fechaIngreso: todayDate
            }

            //enviar formulario
            fetch(urlEnvioRegistro, {
                method: 'POST',
                body: JSON.stringify(datosRegistro),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => console.log('ERROR', error))
                .then(response => console.log('SUCEESS', response))
        }
    })
    formulario.appendChild(crearFormularioIngre)
}


