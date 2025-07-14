let nombre = document.getElementById("nombre");
let edad = document.getElementById("edad");
let dni = document.getElementById("dni");
let puesto = document.getElementById("puesto");
let btnAgregar = document.getElementById("agregar");


let empleados = []
let id = 0;

function agregarEmpleados(){
    btnAgregar.onclick = () =>{
        empleados.push({
            id : id++,
            nombre : nombre.value,
            edad : edad.value,
            dni : dni.value,
            puesto : puesto.value});
        console.log(empleados)
        localStorage.setItem("empleados",JSON.stringify(empleados));
    }
}

agregarEmpleados();

