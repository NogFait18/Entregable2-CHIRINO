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
        Toastify({
            text: "¡Error: Faltan campos por completar!",
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
                width:"fit-content",
                height:"2rem",
                background: "linear-gradient(to right, #b00000ff, #c93d3dff)",
                borderRadius:"10px",
                display:"flex",
                alignItems:"center",
                padding:"10px",
                fontSize:"15px",
                color:"white",
            }
        }).showToast();
        return; 
    }


    /* Validación de edad y DNI */
    const edadNum = parseInt(edad.value);
    const dniNum = parseInt(dni.value);
    if(isNaN(edad.value) || isNaN(dni.value)){
        Toastify({
            text: "¡Error: Los campos de Edad y DNI tienen que ser numeros!",
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
                width:"fit-content",
                height:"2rem",
                background: "linear-gradient(to right, #b00000ff, #c93d3dff)",
                borderRadius:"10px",
                display:"flex",
                alignItems:"center",
                padding:"10px",
                fontSize:"15px",
                color:"white",
            }
        }).showToast();
        return; 
    }
    empleados.push({
        id: id++,
        nombre: nombre.value,
        edad: edad.value,
        dni: dni.value,
        puesto: puesto.value
    });
    Toastify({
        text: "¡Empleado Agregado con Exito!",
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
                width:"fit-content",
                height:"2rem",
                background: "linear-gradient(to right, #00b09b, #60c93dff)",
                position:"fixed",
                borderRadius:"10px",
                display:"flex",
                alignItems:"center",
                padding:"10px",
                fontSize:"15px",
                color:"white"
        }
    }).showToast();


    console.log(empleados);
    localStorage.setItem("empleados", JSON.stringify(empleados));

    form.reset(); // Limpiar el formulario después de agregar
});
