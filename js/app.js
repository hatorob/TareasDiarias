
// Variables

const listaTareas = document.getElementById('lista-tareas');
const listaTareasRealizadas = document.getElementById('lista-tareas-realizadas');


// Event Listener

eventListeners();

function eventListeners() {

    //Cuando se envia un formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTarea);

    //borrar tarea
    listaTareas.addEventListener('click', borrarTarea);

    //Agregar tarea en realizadas
    listaTareas.addEventListener('click', agregarTareaRealizadas);

    //borrar en realizadas
    listaTareasRealizadas.addEventListener('click', borrarTareaRealizada);

    //Cargar contenido en mis tareas pendientes
    document.addEventListener('DOMContentLoaded', localStorageListo);
    //Cargar contenido en mis tareas realizadas
    document.addEventListener('DOMContentLoaded', localStorageListoRealizadas);

}



// funciones

// 1r Añadir tarea del formulario

function agregarTarea(e) {
    e.preventDefault();
    
    //leer el valor de textArea
    const tarea = document.getElementById('tarea').value;

    //Crear boton de listo

    const botonListo = document.createElement('a');
    botonListo.classList = "listo-tarea";
    botonListo.innerText = "✔";

    //Crear boton de eliminar

    const botonBorrar = document.createElement('a');
    botonBorrar.classList = "borrar-tarea";
    botonBorrar.innerText = "X";
    
    
    //crea elemento y añadirle el contenido a la lista

    const li = document.createElement('li');
    const p =document.createElement('span');
    p.innerHTML = tarea;
    //li.innerHTML = tarea;
    li.appendChild(p);
    li.appendChild(botonListo);
    li.appendChild(botonBorrar);
  /*   //Agregar boton listo
    listaTareas.appendChild(botonListo);
    //Agrega el boton borrar
    listaTareas.appendChild(botonBorrar); */
    listaTareas.appendChild(li);

    agregarTareaLocalStorage(tarea);
}

//elimina la tarea del dom

function borrarTarea(e) {
    e.preventDefault();

    if(e.target.className === 'borrar-tarea') {
        
        e.target.parentElement.remove();
        borrarTareaLocalStorage(e.target.parentElement.innerText);
        
    } 
}

function agregarTareaRealizadas(e) {
    e. preventDefault();

    if(e.target.className === 'listo-tarea') {


        const valor = e.target.parentElement.firstChild.innerHTML;

        const li = document.createElement('li');
        li.innerHTML = valor;


        const botonBorrar = document.createElement('a');
        botonBorrar.classList = "borrar-tarea";
        botonBorrar.innerText = "X";


        li.appendChild(botonBorrar);
        listaTareasRealizadas.appendChild(li)

        
        e.target.parentElement.remove();
        
        borrarTareaLocalStorage(e.target.parentElement.innerText);
        agregarTareaListaLocalStorage(valor);
    } 


}

//Borrar Tarea Realizada

function borrarTareaRealizada(e) {
    e.preventDefault();

    if(e.target.className === 'borrar-tarea') {
        
        e.target.parentElement.remove();
        borrarTareaListaLocalStorage(e.target.parentElement.innerText);
    } 
}


//LocalStorage

function localStorageListo() {
    let tareas;

    tareas = obtenerTareasLocalStorage();

    tareas.forEach(function(tarea){
        
        const botonListo = document.createElement('a');
        botonListo.classList = "listo-tarea";
        botonListo.innerText = "✔";

        //Crear boton de eliminar

        const botonBorrar = document.createElement('a');
        botonBorrar.classList = "borrar-tarea";
        botonBorrar.innerText = "X";
        
        
        //crea elemento y añadirle el contenido a la lista

        const li = document.createElement('li');
        const p =document.createElement('span');
        p.innerHTML = tarea;
        //li.innerHTML = tarea;
        li.appendChild(p);
        li.appendChild(botonListo);
        li.appendChild(botonBorrar);
    /*   //Agregar boton listo
        listaTareas.appendChild(botonListo);
        //Agrega el boton borrar
        listaTareas.appendChild(botonBorrar); */
        listaTareas.appendChild(li);
    });
}



function agregarTareaLocalStorage(tarea) {

    let tareas;

    tareas = obtenerTareasLocalStorage();

    //Añadir la nueva tarea
    tareas.push(tarea);

    //Convertir de string a arreglo para localStorage
    localStorage.setItem('tareas', JSON.stringify(tareas));
   
}


function obtenerTareasLocalStorage() {
    let tareas;
    //Revisamos valores de localStorage

    if(localStorage.getItem('tareas') === null) {
        tareas = [];
    } else {
        tareas = JSON.parse(localStorage.getItem('tareas') );
    }

    return tareas;
}

function borrarTareaLocalStorage(tarea) {
    //console.log(tweet);
    let tareas, tareaBorrar;
    //Elimina la x de twwet
    tareaBorrar = tarea.substring(0, tarea.length - 2);
    //console.log(tareaBorrar);

    

    tareas = obtenerTareasLocalStorage();

    tareas.forEach(function(tarea, index){
        if(tareaBorrar === tarea) {
            tareas.splice(index, 1);
        }
    });

    localStorage.setItem('tareas', JSON.stringify(tareas));
}


//LocalStorage Tarea realizadas

function localStorageListoRealizadas() {
    let realizadas;

    realizadas = obtenerTareasListaLocalStorage();

    realizadas.forEach(function(valor){
        
        /* const realizadas = e.target.parentElement.firstChild.innerHTML; */

        const li = document.createElement('li');
        li.innerHTML = valor;
        
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = "borrar-tarea";
        botonBorrar.innerText = "X";


        li.appendChild(botonBorrar);
        listaTareasRealizadas.appendChild(li)
    });
}

function agregarTareaListaLocalStorage(valor) {

    let realizadas;

    realizadas = obtenerTareasListaLocalStorage();

    //Añadir la nueva tarea
    realizadas.push(valor);

    //Convertir de string a arreglo para localStorage
    localStorage.setItem('realizadas', JSON.stringify(realizadas));
   
}


function obtenerTareasListaLocalStorage() {
    let realizadas;
    //Revisamos valores de localStorage

    if(localStorage.getItem('realizadas') === null) {
        realizadas = [];
    } else {
        realizadas = JSON.parse(localStorage.getItem('realizadas') );
    }

    return realizadas;
}


function borrarTareaListaLocalStorage(valor) {
    console.log(valor);
    let realizadas, valorBorrar;
    //Elimina la x de twwet
    valorBorrar = valor.substring(0, valor.length - 1);
    

    

    realizadas = obtenerTareasListaLocalStorage();

    realizadas.forEach(function(valor, index){
        if(valorBorrar === valor) {
            realizadas.splice(index, 1);
        }
    });

    localStorage.setItem('realizadas', JSON.stringify(realizadas));
} 