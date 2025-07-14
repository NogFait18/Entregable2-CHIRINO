let empleadosContainer = document.getElementById("empleados-contenedor");
let empleadosStorage = localStorage.getItem("empleados");
empleadosStorage = JSON.parse(empleadosStorage) || [];
console.log(empleadosStorage)

let empleadosEliminados = []

function renderEmpleados(empleados){
    empleadosContainer.innerHTML = ""; // Limpio antes de renderizar
    empleados.forEach((empleado) => {
        const card = document.createElement("div");
        card.innerHTML =
            `<div class="div-h3">
            <h3>Nombre: ${empleado.nombre}</h3>
            <h3> Edad: ${empleado.edad}</h3>
            <h3> DNI: ${empleado.dni}</h3>
            <h3> Puesto: ${empleado.puesto}</h3>
            </div>
            <button id = "modificar-${empleado.id}" class="modificar">Modificar</button>
            <button id="eliminar-${empleado.id}" class="eliminar">Eliminar</button>`;
        empleadosContainer.appendChild(card);
    });
    eliminarEmpleado(empleados);
    modificarEmpleados(empleados);
}

function eliminarEmpleado(empleados){
    const botonesEliminar = document.querySelectorAll("button.eliminar");
    botonesEliminar.forEach(button =>{
        button.onclick = (e) =>{
            const empleadoId = parseInt(e.currentTarget.id.split("-")[1]);
            const nuevosEmpleados = empleados.filter(empleado => empleado.id !== empleadoId);
            localStorage.setItem("empleados", JSON.stringify(nuevosEmpleados));
            renderEmpleados(nuevosEmpleados);
        }
    });
}

function modificarEmpleados(empleados){
    const botonesModificar = document.querySelectorAll(".modificar");
    botonesModificar.forEach(button => {
        button.onclick = (e) => {
            const empleadoId = parseInt(e.currentTarget.id.split("-")[1]);
            const card = e.currentTarget.parentElement;
            const empleado = empleados.find(emp => emp.id === empleadoId);

            // Creo formulario de edición
            card.innerHTML = `
                <input type="text" id="nombre-${empleado.id}" value="${empleado.nombre}">
                <input type="text" id="edad-${empleado.id}" value="${empleado.edad}">
                <input type="text" id="dni-${empleado.id}" value="${empleado.dni}">
                <select id="puesto-${empleado.id}">
                    <option value="">-- Selecciona un puesto --</option>
                    <option value="Frontend" ${empleado.puesto === "Frontend" ? "selected" : ""}>Frontend</option>
                    <option value="Backend" ${empleado.puesto === "Backend" ? "selected" : ""}>Backend</option>
                    <option value="Full Stack" ${empleado.puesto === "Full Stack" ? "selected" : ""}>Full Stack</option>
                </select>
                <button id="guardar-${empleado.id}">Guardar</button>
                <button id="cancelar-${empleado.id}">Cancelar</button>
            `;

            // Evento Guardar
            document.getElementById(`guardar-${empleado.id}`).onclick = () => {
                empleado.nombre = document.getElementById(`nombre-${empleado.id}`).value;
                empleado.edad = document.getElementById(`edad-${empleado.id}`).value;
                empleado.dni = document.getElementById(`dni-${empleado.id}`).value;
                empleado.puesto = document.getElementById(`puesto-${empleado.id}`).value;

                localStorage.setItem("empleados", JSON.stringify(empleados));
                renderEmpleados(empleados);
            }

            // Evento Cancelar
            document.getElementById(`cancelar-${empleado.id}`).onclick = () => {
                renderEmpleados(empleados);
            }
        }
    });
}

renderEmpleados(empleadosStorage);
