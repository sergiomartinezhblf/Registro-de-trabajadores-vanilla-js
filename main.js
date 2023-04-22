
let bd =[]
let idinicial=1000
let idactualizar=""

class Trabajador {
    constructor(nombre,correo,telefono,area,genero,id){
        this.nombre= nombre
        this.correo= correo
        this.telefono= telefono
        this.area= area
        this.genero= genero
        this.id= id
    }
}

class Tabla {
    //AGREGA EL REGISTRO TRABAJADOR  Y LO AGREGA A LA TABLA REGISTRO
    agregarTrabajador(trabajador){
        let nuevotrabajador=trabajador
        idinicial+=1
        let id=idinicial 
        nuevotrabajador.id=id
        bd.push(nuevotrabajador)
        // AGREGAR REGISTROS AL LOCAL STORAGE
        localStorage.setItem("registro",JSON.stringify(bd))
        this.pintarregistro()
    }    
    // ELIMINA TRABAJADOR DEL REGISTRO
    eliminarTrabajador(trabajador){
        let indice_eliminado = bd.indexOf(trabajador)
        bd.splice(indice_eliminado,1)
        //ACTUALIZAR LOCAL STORAGE CON EL REGISTRO ELIMINADO
        localStorage.setItem("registro",JSON.stringify(bd))
        //LLENA LAS TABLAS REGISTRO, MARKETING Y TI
        this.pintarregistro()
        this.pintarmarketing()
        this.pintarti()
    }
    
    //OBTIENE EL REGISTRO Y RELLENA EL FORMULARIO PARA ACTUALIZARLO
    actualizarTrabajador(trabajador){
    idactualizar = trabajador.id   
    console.log(idactualizar) 
    document.getElementById("inputNombre").value=trabajador.nombre
    document.getElementById("inputEmail").value=trabajador.correo
    document.getElementById("inputTelefono").value=trabajador.telefono
    document.getElementById("btn-submit").disabled=true
    document.getElementById("btn-form-actualizar").classList.remove("oculto")
    document.getElementById("inputNombre").focus()

    }
    //ACTUALIZA EL REGISTRO
    setactualizado(){
        let x= bd.find(el=>el.id==idactualizar)
        let update = bd.indexOf(x)
        console.log(update)
        bd[update].nombre=document.getElementById("inputNombre").value
        bd[update].correo=document.getElementById("inputEmail").value
        bd[update].telefono=document.getElementById("inputTelefono").value
        bd[update].area=document.getElementById("inputArea").value
        bd[update].genero=document.querySelector('input[name="genero"]:checked').value
         // ACTUALIZAR REGISTROS EN LOCAL STORAGE
         localStorage.setItem("registro",JSON.stringify(bd))
        document.getElementById("btn-submit").disabled=false
        document.getElementById("btn-form-actualizar").classList.add("oculto")
        document.getElementById('formulario').reset()
        document.getElementById("ico-inputNombre").classList.add('input-novalido')
        document.getElementById("spam-inputNombre").classList.add('input-novalido')
        document.getElementById("ico-inputEmail").classList.add('input-novalido')
        document.getElementById("spam-inputEmail").classList.add('input-novalido')
        document.getElementById("ico-inputTelefono").classList.add('input-novalido')
        document.getElementById("spam-inputTelefono").classList.add('input-novalido')
        document.getElementById("ico-inputArea").classList.add('input-novalido')
        document.getElementById("spam-inputArea").classList.add('input-novalido')
        this.pintarregistro()
        this.pintarmarketing()
        this.pintarti()
    }
    //LLENA LA TABLA REGISTRO
    pintarregistro(){
        const template = document.querySelector("#template-columna").content
        const fragment = document.createDocumentFragment()
        const tablareg = document.querySelector("#tabla-trabajadores")
        tablareg.innerHTML=""
        //OBTENER REGISTROS DEL LOCAL STORAGE
        let obtenerbase= JSON.parse(localStorage.getItem("registro"))
        console.log(obtenerbase)
        bd = []
        obtenerbase.forEach(el=>bd.push(el))  
        bd.forEach((registro,index)=>{
            let numero = index+1
            template.querySelector("#temp-index").textContent=numero
            template.querySelector("#temp-id").textContent=registro.id
            template.querySelector("#temp-nombre").textContent=registro.nombre
            template.querySelector("#temp-correo").textContent=registro.correo
            template.querySelector("#temp-telefono").textContent=registro.telefono
            template.querySelector("#temp-area").textContent=registro.area
            template.querySelector("#temp-genero").textContent=registro.genero
            template.querySelector(".actualizar").dataset.id=registro.id
            template.querySelector(".eliminar").dataset.id=registro.id
            const clone = template.cloneNode(true)
            fragment.appendChild(clone)
        })
        tablareg.appendChild(fragment)
        document.getElementById("footregistro").textContent=`Total de Registros: ${bd.length}`
    }
 
    //AGREGAR REGISTROS A LA TABLA DE TI
    pintarti(){
        const template = document.querySelector("#template-columna").content
        const fragment = document.createDocumentFragment()
        const tablati = document.querySelector("#tabla-ti")
        tablati.innerHTML=""
    //OBTENER REGISTROS DEL LOCAL STORAGE
       let obtenerbase= JSON.parse(localStorage.getItem("registro"))
       console.log(obtenerbase)
       bd = []
       obtenerbase.forEach(el=>bd.push(el))  
       let registrosti = bd.filter(el=>el.area==="TI")

        bd.forEach((registro,index)=>{
            if(registro.area==="TI"){
            let numero = index+1
            template.querySelector("#temp-index").textContent=numero
            template.querySelector("#temp-id").textContent=registro.id
            template.querySelector("#temp-nombre").textContent=registro.nombre
            template.querySelector("#temp-correo").textContent=registro.correo
            template.querySelector("#temp-telefono").textContent=registro.telefono
            template.querySelector("#temp-area").textContent=registro.area
            template.querySelector("#temp-genero").textContent=registro.genero
            template.querySelector(".actualizar").dataset.id=registro.id
            template.querySelector(".eliminar").dataset.id=registro.id
            const clone = template.cloneNode(true)
            fragment.appendChild(clone) }
        })
        tablati.appendChild(fragment)
        document.getElementById("footti").textContent=`Total de Registros: ${registrosti.length}`
    }
    // AGREGAR REGISTROS A LA TABLA DE MARKETING
    pintarmarketing(){
        const template = document.querySelector("#template-columna").content
        const fragment = document.createDocumentFragment()
        const tablamarketing = document.querySelector("#tabla-marketing")
        tablamarketing.innerHTML=""
        //OBTENER REGISTROS DEL LOCAL STORAGE
        let obtenerbase= JSON.parse(localStorage.getItem("registro"))
        console.log(obtenerbase)
        bd = []
        obtenerbase.forEach(el=>bd.push(el))  
        let registrosti = bd.filter(el=>el.area==="TI")
        let registrosmarketing= bd.filter(el=>el.area==="Marketing")
        bd.forEach((registro,index)=>{
            if(registro.area==="Marketing"){
            let numero = index+1
            template.querySelector("#temp-index").textContent=numero
            template.querySelector("#temp-id").textContent=registro.id
            template.querySelector("#temp-nombre").textContent=registro.nombre
            template.querySelector("#temp-correo").textContent=registro.correo
            template.querySelector("#temp-telefono").textContent=registro.telefono
            template.querySelector("#temp-area").textContent=registro.area
            template.querySelector("#temp-genero").textContent=registro.genero
            template.querySelector(".actualizar").dataset.id=registro.id
            template.querySelector(".eliminar").dataset.id=registro.id
            const clone = template.cloneNode(true)
            fragment.appendChild(clone) }
        })
        tablamarketing.appendChild(fragment)
        document.getElementById("foomarketing").textContent=`Total de registros: ${registrosmarketing.length}`
    }

    //VALIDA EL INPUT NOMBRE CON LA EXPRESION REGULAR CORRESPONDIENTE
    validarinputnombre(e){
        if(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/.test(e.target.value)){ 
        document.getElementById("ico-inputNombre").classList.remove('input-novalido')
        document.getElementById("spam-inputNombre").classList.remove('input-novalido')
        document.getElementById("icox-inputNombre").classList.add('input-novalido')
        document.getElementById("spamx-inputNombre").classList.add('input-novalido')
    } else{
       
       document.getElementById("ico-inputNombre").classList.add('input-novalido')
       document.getElementById("spam-inputNombre").classList.add('input-novalido')
       document.getElementById("icox-inputNombre").classList.remove('input-novalido')
       document.getElementById("spamx-inputNombre").classList.remove('input-novalido')
    }
    }

    //VALIDA EL INPUT CORREO CON LA EXPRESION REGULAR CORRESPONDIENTE
    validarinputcorreo(e){
        if(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(e.target.value)){
            document.getElementById("ico-inputEmail").classList.remove('input-novalido')
            document.getElementById("spam-inputEmail").classList.remove('input-novalido')
            document.getElementById("icox-inputEmail").classList.add('input-novalido')
            document.getElementById("spamx-inputEmail").classList.add('input-novalido')
        }else{
            document.getElementById("ico-inputEmail").classList.add('input-novalido')
            document.getElementById("spam-inputEmail").classList.add('input-novalido')
            document.getElementById("icox-inputEmail").classList.remove('input-novalido')
            document.getElementById("spamx-inputEmail").classList.remove('input-novalido')
        }
    }

    //VALIDA EL INPUT TELEFONO CON LA EXPRESION REGULAR CORRESPONDIENTE
    validarinputtelefono(e){
        if(/^\d{10}$/.test(e.target.value)){
            document.getElementById("ico-inputTelefono").classList.remove('input-novalido')
            document.getElementById("spam-inputTelefono").classList.remove('input-novalido')
            document.getElementById("icox-inputTelefono").classList.add('input-novalido')
            document.getElementById("spamx-inputTelefono").classList.add('input-novalido')
        }else{
            document.getElementById("ico-inputTelefono").classList.add('input-novalido')
            document.getElementById("spam-inputTelefono").classList.add('input-novalido')
            document.getElementById("icox-inputTelefono").classList.remove('input-novalido')
            document.getElementById("spamx-inputTelefono").classList.remove('input-novalido')
        }
    }
    //VALIDA QUE EL SELECT AREA TENGA ALGUNA OPCIÓN DIFERENTE A "ELEGIR"
    validarselectarea(e){
        if(event.target.value==="elegir"){
            document.getElementById("ico-inputArea").classList.add('input-novalido')
            document.getElementById("spam-inputArea").classList.add('input-novalido')
            document.getElementById("icox-inputArea").classList.remove('input-novalido')
            document.getElementById("spamx-inputArea").classList.remove('input-novalido')
        }else{
            document.getElementById("ico-inputArea").classList.remove('input-novalido')
            document.getElementById("spam-inputArea").classList.remove('input-novalido')
            document.getElementById("icox-inputArea").classList.add('input-novalido')
            document.getElementById("spamx-inputArea").classList.add('input-novalido')
        }
    }
   //MUESTRA EL MENSAJE DE ALERTA DE REGISTRO AGREGADO EXITOSAMENTE
    static alertregistro(mensaje,clase){
        if(clase==="success")
        document.getElementById("alerta").classList.add(`alert-${clase}`)
        document.getElementById("alerta").textContent=`${mensaje}`
        document.getElementById("alerta").classList.remove("alert-oculto")
    }

}

//REGISTRAR TRABAJADOR
document.getElementById("formulario").addEventListener("submit",(e)=>{
    const nombre = document.getElementById("inputNombre").value
    const correo = document.getElementById("inputEmail").value
    const telefono = document.getElementById("inputTelefono").value
    const area = document.getElementById("inputArea").value
    const genero = document.querySelector('input[name="genero"]:checked').value
    const id=""
    e.preventDefault()
    if(
        /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/.test(nombre)&&
        /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(correo)&&
        /^\d{10}$/.test(telefono)&&
        area.value!=="elegir"
        
    ){
        //SE MUESTRA LA ALERTA DE REGISTRO EXITOSO           
        Tabla.alertregistro("¡Registro Exitoso!","success")
        setTimeout(()=>document.getElementById('alerta').classList.add('alert-oculto'),3000)
        const trabajador = new Trabajador(nombre,correo,telefono,area,genero,id)
    const tabla = new Tabla()
    tabla.agregarTrabajador(trabajador)
    tabla.pintarti() 
    tabla.pintarmarketing() 
    document.getElementById('formulario').reset()
    document.getElementById("ico-inputNombre").classList.add('input-novalido')
    document.getElementById("spam-inputNombre").classList.add('input-novalido')
    document.getElementById("ico-inputEmail").classList.add('input-novalido')
    document.getElementById("spam-inputEmail").classList.add('input-novalido')
    document.getElementById("ico-inputTelefono").classList.add('input-novalido')
    document.getElementById("spam-inputTelefono").classList.add('input-novalido')
    document.getElementById("ico-inputArea").classList.add('input-novalido')
    document.getElementById("spam-inputArea").classList.add('input-novalido')
    }
    

    
})

// ELIMINAR REGISTRO
document.getElementById("listaregistro").addEventListener("click",e=>{
    if(e.target.classList.contains("eliminar")){
        let id_a_eliminar=e.target.dataset.id
        console.log(id_a_eliminar)
        let trabajador = bd.find(el=>el.id===id_a_eliminar)
        const tabla = new Tabla()
        tabla.eliminarTrabajador(trabajador) 
        
    }
})

//ACTUALIZAR REGISTRO
document.getElementById("listaregistro").addEventListener("click",e=>{
    if(e.target.classList.contains("actualizar")){
       let id_a_actualizar=e.target.dataset.id
       console.log(id_a_actualizar)
       console.log(bd)
       let trabajador = bd.find(el=>el.id==id_a_actualizar)
       console.log(trabajador)
       const tabla = new Tabla()
       tabla.actualizarTrabajador(trabajador) 
    }
})


document.getElementById("pills-ti-tab").addEventListener("click",()=>{
    const tabla = new Tabla()
        tabla.pintarti() 
})

document.getElementById("pills-marketing-tab").addEventListener("click",()=>{
    const tabla = new Tabla()
        tabla.pintarmarketing() 
})

// ACTUALIZAR REGISTRO
document.getElementById("btn-form-actualizar").addEventListener("click",(e)=>{
    e.preventDefault()
    const tabla= new Tabla()
    tabla.setactualizado()
     
})

//AGREGA LOS REGISTROS A LA TABLA AL CARGARSE LA PAGINA
addEventListener("DOMContentLoaded",()=>{
    const tabla= new Tabla()
    tabla.pintarregistro()
})

// VALIDAR INPUT NOMBRE
document.getElementById("inputNombre").addEventListener("keyup",(e)=>{
    const tabla = new Tabla()
    tabla.validarinputnombre(e)
})
document.getElementById("inputNombre").addEventListener("blur",(e)=>{
    console.log("validando")
    const tabla = new Tabla()
    tabla.validarinputnombre(e)
})

// VALIDAR INPUT CORREO
document.getElementById("inputEmail").addEventListener("keyup",(e)=>{
    const tabla = new Tabla()
    tabla.validarinputcorreo(e)
})
document.getElementById("inputEmail").addEventListener("blur",(e)=>{
    console.log("validando")
    const tabla = new Tabla()
    tabla.validarinputcorreo(e)
})

// VALIDAR INPUT TELÉFONO
document.getElementById("inputTelefono").addEventListener("keyup",(e)=>{
    const tabla = new Tabla()
    tabla.validarinputtelefono(e)
})
document.getElementById("inputTelefono").addEventListener("blur",(e)=>{
    console.log("validando")
    const tabla = new Tabla()
    tabla.validarinputtelefono(e)
})

// VALIDAR INPUT AREA
document.getElementById("inputArea").addEventListener("change",(e)=>{
    const tabla = new Tabla()
    tabla.validarselectarea(e)
})

