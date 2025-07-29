let nombre = document.getElementById("nombre");
let edad = document.getElementById("edad");
let dni = document.getElementById("dni");
let puesto = document.getElementById("puesto");
let form = document.getElementById("form");

let empleados = [];
let id = 0;

// Cargar los empleados del JSON al inicio
fetch("empleados.json")
    .then(response => response.json())
    .then(data => {
        if (empleados.length === 0) { 
            empleados = data;
            localStorage.setItem("empleados", JSON.stringify(empleados));
            id = empleados.length;
        }
    })
    .catch(error => console.log(error));
// Evento submit del formulario
form.addEventListener("submit", function(e) {
    e.preventDefault(); // Evitar el envío del formulario

    // Validar campos
    if (nombre.value === "" || edad.value === "" || dni.value === "" || puesto.value === "") {
        Swal.fire({
        title: "Error",
        text: "Hay campos del formulario vacios, por favor completar!",
        icon: "error"
        });
        return; 
    }


    /* Validación de edad y DNI */
    const edadNum = parseInt(edad.value);
    const dniNum = parseInt(dni.value);
    if(isNaN(edad.value) || isNaN(dni.value)){
        Swal.fire({
        title: "Error",
        text: "¡Los campos de Edad y DNI tienen que ser numeros!",
        icon: "error"
        });
        return; 
    }
    empleados.push({
        id: id++,
        nombre: nombre.value,
        edad: edad.value,
        dni: dni.value,
        puesto: puesto.value
    });
    Swal.fire({
    title: "Éxito",
    text: "¡Empleado agregado con exito!",
    icon: "success"
    });


    console.log(empleados);
    localStorage.setItem("empleados", JSON.stringify(empleados));

    form.reset(); // Limpiar el formulario después de agregar
});
