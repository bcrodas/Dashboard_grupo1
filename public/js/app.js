alert("app.js SÍ se está ejecutando");
const estudiantes = [];

document.getElementById("btnAgregar").addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value.trim();
    const edad = parseInt(document.getElementById("edad").value);
    const nota = parseFloat(document.getElementById("nota").value);
    const alertas = document.getElementById("alertas");

    alertas.innerHTML = "";

    // Validaciones
    if (nombre === "" || isNaN(edad) || isNaN(nota)) {
        mostrarAlerta("Todos los campos son obligatorios.", "danger");
        return;
    }

    if (nota < 0 || nota > 20) {
        mostrarAlerta("La nota debe estar entre 0 y 20.", "warning");
        return;
    }

    // Agregar estudiante
    estudiantes.push({ nombre, edad, nota });
    actualizarTabla();
    actualizarEstadisticas();
    limpiarCampos();
    mostrarAlerta("Estudiante registrado correctamente.", "success");
});

// Actualizar tabla
function actualizarTabla() {
    const tbody = document.getElementById("tablaEstudiantes");
    tbody.innerHTML = "";

    for (let i = 0; i < estudiantes.length; i++) {
        const est = estudiantes[i];
        tbody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${est.nombre}</td>
                <td>${est.edad}</td>
                <td>${est.nota}</td>
            </tr>`;
    }
}

// Estadísticas
function actualizarEstadisticas() {
    let total = estudiantes.length;
    let suma = 0;
    let aprob = 0;
    let reprob = 0;

    let i = 0;
    while (i < estudiantes.length) {
        suma += estudiantes[i].nota;

        if (estudiantes[i].nota >= 10) aprob++;
        else reprob++;

        i++;
    }

    const promedio = total > 0 ? (suma / total).toFixed(2) : 0;

    document.getElementById("total").textContent = total;
    document.getElementById("promedio").textContent = promedio;
    document.getElementById("aprobados").textContent = aprob;
    document.getElementById("reprobados").textContent = reprob;
}

// Generar reporte por Isaac Mera
document.getElementById("btnReporte").addEventListener("click", () => {
    const promedio = parseFloat(document.getElementById("promedio").textContent);
    const reporte = document.getElementById("reporte");

    reporte.innerHTML = "";

    if (promedio >= 14) {
        reporte.innerHTML = `<div class="alert alert-success">Buen rendimiento.</div>`;
    } else if (promedio >= 10) {
        reporte.innerHTML = `<div class="alert alert-warning">Rendimiento regular.</div>`;
    } else {
        reporte.innerHTML = `<div class="alert alert-danger">Rendimiento bajo.</div>`;
    }
});

// Utilidades
function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("nota").value = "";
}

function mostrarAlerta(mensaje, tipo) {
    document.getElementById("alertas").innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show">
            ${mensaje}
            <button class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
}
