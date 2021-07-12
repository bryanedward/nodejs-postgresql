var registro = document.getElementById('registro')
var formulario = document.getElementById('formulario')
var listaPaciente = document.getElementById('listaPaciente')
var todayDate = new Date().toISOString().slice(0, 10);
var container_chequero = document.getElementById('containerChequeo')
var container_ingreso = document.getElementById('containerIngreso')

consultaListaPaciente()

registro.addEventListener('click', () => {
    switch (registro.value) {
        case "chequeoMedico":
            container_ingreso.innerHTML = " "
            listaPaciente.innerHTML = " "
            consultaListaPaciente()
            break;
        case "chequeoIngreso":
            //limpiar los container
            listaPaciente.innerHTML = " "
            formulario.innerHTML = " "
            container_ingreso.innerHTML = " "
            formularioCliente()
            break;
        default:
            break;
    }
})


function formularioCliente() {
    var div = document.createElement('div')
    div.innerHTML = `
    <div class="itemContainer">
    <form id="container">
        <h2 id="fichaCliente">Ficha del cliente</h2>
        
        <label for="cedula">Cedula del cliente</label>
        <input id="cedulaC" class="cedulaC" 
        type="text" placeholder="cedula" >
        
        <label for="nombre">nombre del cliente</label>
        <input id="nombreC" class="nombreC" 
        type="text" placeholder="cedula" >
        
        <label for="apellido">apellido</label>
        <input id="apellidoC" class="apellidoC" 
        type="text" placeholder="apellido" >
        
        <label for="direccion">direccion</label>
        <input id="direccionC" class="direccionC" 
        type="text" placeholder="direccion" >
        
        <label for="celular">celular</label>
        <input id="celularC" class="celularC" 
        type="text" placeholder="celular" >
        
        <label for="fecha">fecha</label>
        <input id="fechaC" class="fechaC" 
        type="text" value="${todayDate}" disabled>
        </form>

    <form id="container">
        <h2 id="fichaMascota">Ficha medica de la mascota</h2>
        
        <label for="nombreAnimal">nombre del Animal</label>
        <input id="nombreAnimal" class="cedulaV" type="text" placeholder="nombre del Animal">
        
        <label for="fechaNacimi">Fecha de nacimiento del animal</label>
        <input id="fechaNac" type="date" placeholder="fechaNacimi">
        <br>
        <hr>
        <label for="genero">Genero del animal </label>
        <input id="genero" type="text" placeholder="Genero">
        
        <label for="raza">Raza del animal </label>
        <input id="raza" type="text" placeholder="Raza">
        
        <label for="edad">edad del animal </label>
        <input id="edad" type="number" placeholder="edad">
        <br>
        <hr>
        <label for="color">color del animal </label>
        <input id="color" type="text" placeholder="color">

        <label for="esteriliza">esterilizado </label>
        <select name="esterilizado" id="esterilizado">
            <option value="si">si</option>
            <option value="no">no</option>
        </select>
        <button id="btnSiguiente" type="button" style=" margin-top: 14px;"
        class="btnSiguiente">Guardar Ingreso</button>
        </form>
    </div>
    `
    var btnS = div.querySelector('.btnSiguiente')
    var cedulaC = div.querySelector('#cedulaC')
    var nombreC = div.querySelector('#nombreC')
    var apellidoC = div.querySelector('#apellidoC')
    var direccionC = div.querySelector('#direccionC')
    var celularC = div.querySelector('#celularC')
    var fechaC = div.querySelector('#fechaC')
    var nombreAnimal = div.querySelector('#nombreAnimal')
    var fechaNac = div.querySelector('#fechaNac')
    var genero = div.querySelector('#genero')
    var raza = div.querySelector('#raza')
    var edad = div.querySelector('#edad')
    var color = div.querySelector('#color')
    var esteriliz = div.querySelector('#esterilizado')

    btnS.addEventListener('click', () => {
        if(cedulaC.value.trim() === "" ||
        nombreC.value.trim() === "" ||
        apellidoC.value.trim() === "" ||
        direccionC.value.trim() === "" ||
        celularC.value.trim() === "" ||
        fechaC.value.trim() === "" ||
        nombreAnimal.value.trim() === "" ||
        fechaNac.value.trim() === "" ||
        genero.value.trim() === "" ||
        raza.value.trim() === "" ||
        edad.value.trim() === "" ||
        color.value.trim() === "" ||
        esteriliz.value.trim() === ""){
            alert("completa los campos")
        }else{
            var urlIngreso = "http://localhost:3500/guardarIngreso"
            const datosIngreso = {
               cedula: cedulaC.value.trim(),
               nombre: nombreC.value.trim(),
               apellido: apellidoC.value.trim(),
               direccion: direccionC.value.trim(),
               celular: celularC.value.trim(),
               fechaIngreso: fechaC.value.trim(),
               nombreAni: nombreAnimal.value.trim(),
               fechaNac: fechaNac.value.trim(),
               genero: genero.value.trim(),
               raza: raza.value.trim(),
               edad: edad.value.trim(),
               color: color.value.trim(),
               estirilizado: esteriliz.value.trim()
            }
            enviarFormularios(datosIngreso, urlIngreso)
        } 
    })

    container_ingreso.appendChild(div)

}

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
    <div class="formulario1">
            <img src="../img/default-user-image.png">
            <section>
            <h2>Cliente</h2>
            <p id="pp">Cedula:<p>${params.cedula}</p></p>
            <p id="pp">Nombre:<p>${params.nombre}</p></p>
            <p id="pp">Apellido:<p>${params.apellido}</p></p>
            <p id="pp">Direccion:<p>${params.direccion}</p></p>
            <p id="pp">Celular:<p>${params.celular}</p></p>
            <p id="pp" >Fecha:<p>${params.fechavisita}</p></p>
            </section>
            <section>
            <button id="btnDialog" class="btnDialog">Chequear paciente</button>
            <button id="btnDialogCobrar" class="btnDialogCobrar">Cobrar paciente</button></section>
            </div>
            `

    var btnDialog = tarjetaPaciente.querySelector('.btnDialog')
    var btnDialogCobrar = tarjetaPaciente.querySelector('.btnDialogCobrar')

    btnDialog.addEventListener('click', () => {
        crearChequeo(params)
    })

    btnDialogCobrar.addEventListener('click', ()  => {
        crearFactura(params)
    })

    listaPaciente.appendChild(tarjetaPaciente)
}

function crearFactura(params) {
    formulario.innerHTML = " "
    var formFactura = document.createElement('div')
    formFactura.innerHTML = `
    <form id="container">
    <h2 >Factura de ${params.nombre} - ${params.apellido}</h2>
    <label for="cedulaVeterianario">Pasiente</label>
    <input id="cedulaV" class="cedulaV" 
    type="text" placeholder="CedulaVeterianario" value=${params.nombreanimal} disabled>
    <label for="cedulaVeterianario">fecha de ingreso</label>
    <input id="cedulaV" class="cedulaV" 
    type="text" placeholder="CedulaVeterianario" value=${params.fechavisita} disabled>
    <label for="cedulaVeterianario">nivel de salud</label>
    <input id="cedulaV" class="cedulaV" 
    type="text" placeholder="CedulaVeterianario" value=${params.nivelsalud} disabled>
    <label for="cedulaVeter">cedula del veterinario</label>
    <input id="cedulaV" class="cedulaV" 
    type="text" placeholder="CedulaVeterianario" value=${params.veterinario} disabled>
    <label for="cedulaVeter">descripcion medica</label>
    <input id="cedulaV" class="cedulaV" 
    type="text" placeholder="CedulaVeterianario" value=${params.descripcionmedica} disabled>
    <label for="cedulaVeter">Costo total</label>
    <input id="cedulaV" class="cedulaV" 
    type="text" placeholder="Costa total">

    <button id="btnEnviarChequeo" type="button" class="btnEnviarChequeo">Crear Factura</button>
    </form>
    `

    formulario.appendChild(formFactura)
}


function crearChequeo(params) {
    //creacion del chequeo medico de los animales
    var esterilizado = ""
    if (params.esterilizado) {
        esterilizado = "si"
    } else {
        esterilizado = "no"
    }
    var crearFormularioCheq = document.createElement('div')
    formulario.innerHTML = " "
    crearFormularioCheq.innerHTML = `
    <form id="container">
        <h2 >Ficha medica de ${params.nombreanimal}</h2>
        <label for="cedulaVeterianario">Cedula del veterinario</label>
        <input id="cedulaV" class="cedulaV" 
        type="text" placeholder="CedulaVeterianario" value=${params.veterinario} >
        <label for="responsable">Responsable de animal (dueño)</label>
        <input id="responsable" type="text" placeholder="CedulaVeterianario" 
        value ="${params.nombre} ${params.apellido} " disabled>
        
        <label for="nombreAnimal">Nombre de la mascota</label>
        <input id="nombreAnimal" type="text"  value="${params.nombreanimal}" disabled>
        
        <label for="nivelSalud">Estado de salud</label>
        <input id="nivelSalud" type="text"  value="${params.nivelsalud}">
        
        <label for="fechaNacimi">Fecha de nacimiento del animal</label>
        <input id="fechaNac" type="text" placeholder="fechaNacimi" value="${params.fechanac}" disabled>
        
        <label for="raza">Raza del animal </label>
        <input id="raza" type="text" placeholder="Raza" value="${params.raza}" disabled>
        
        <label for="genero">Genero del animal </label>
        <input id="genero" type="text" placeholder="Genero" value="${params.genero}" disabled>
        
        <label for="esterilizado">Esterilizado del animal </label>
        <input id="esterilizado" type="text" placeholder="Esterilizado" value=${esterilizado}>
        
        <label for="codProducto">descripcion medica</label>
        <input id="codProducto" type="text" 
        placeholder="codProducto" value=${params.descripcionmedica}>
        

        <button id="btnEnviarChequeo" type="button" class="btnEnviarChequeo">EnviarChequeo</button>
        </form>
    `

    var btnEnviarChequeo = crearFormularioCheq.querySelector('.btnEnviarChequeo')
    var cedulaVeterinario = crearFormularioCheq.querySelector('#cedulaV')
    var responsable = crearFormularioCheq.querySelector('#responsable')
    var nombreAnimal = crearFormularioCheq.querySelector('#nombreAnimal')
    var nivelSalud = crearFormularioCheq.querySelector('#nivelSalud')
    var fechaNac = crearFormularioCheq.querySelector('#fechaNac')
    var raza = crearFormularioCheq.querySelector('#raza')
    var genero = crearFormularioCheq.querySelector('#genero')
    var esterilizad = crearFormularioCheq.querySelector('#esterilizado')
    var codProducto = crearFormularioCheq.querySelector('#codProducto')

    btnEnviarChequeo.addEventListener('click', () => {
        if (cedulaVeterinario.value.trim() === "" ||
            responsable.value.trim() === "" ||
            nombreAnimal.value.trim() === "" ||
            nivelSalud.value.trim() === "" ||
            fechaNac.value.trim() === "" ||
            raza.value.trim() === "" ||
            genero.value.trim() === "" ||
            esterilizad.value.trim() === "" ||
            codProducto.value.trim() === "") {
            alert("campos incompletos");
        }
        else {
            const datosRegistro = {
                codProducto: codProducto.value.trim(),
                fechaRegistro: todayDate,
                cedulaResponsable: params.cedula,
                veterinario: cedulaVeterinario.value.trim(),
                nivelSalud: nivelSalud.value.trim(),
                esterilizad: esterilizad.value.trim()
            }

            enviarFormularios(datosRegistro, "http://localhost:3500/actualizarRegistro")
            alert("actualizado")
        }
    })
    formulario.appendChild(crearFormularioCheq)
}


function crearIngreso() {
    //creacion del ingreso del animal
    var crearFormularioIngre = document.createElement('div')
    formulario.innerHTML = " "
    crearFormularioIngre.innerHTML = `
    <form id="container">
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
        </form>
    `

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
            //preparar los datos
            var urlEnvioRegistro = "http://localhost:3500/guardarRegistro"
            const datosRegistro = {
                nombreClient: inputNombreCli.value.trim(),
                apellidoClient: inputApellido.value.trim(),
                cedulaClient: inputCedula.value.trim(),
                dirreClient: inputDirrec.value.trim(),
                celularClient: inputCelular.value.trim(),
                nombreAnimal: inputAnimal.value.trim(),
                generoAnimal: inputGenero.value.trim(),
                fechaIngreso: todayDate
            }
            enviarFormularios(datosRegistro, urlEnvioRegistro)
        }
    })
    formulario.appendChild(crearFormularioIngre)
}


function enviarFormularios(params, urlEnvioRegistro) {
    //enviar formulario
    fetch(urlEnvioRegistro, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.log('ERROR', error))
        .then(response => console.log('SUCEESS', response))
}