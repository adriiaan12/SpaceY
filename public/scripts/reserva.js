// Precios base por cohete
const preciosBase = {
    falcon: 10000,
    ariane: 15000,
    saturno: 20000,
    soyuz: 12500,
    delta: 18000
};

function retrocederPaso() {
    document.getElementById('step2').classList.add('hidden'); // Oculta el segundo paso
    document.getElementById('step1').classList.remove('hidden'); // Muestra el primer paso
}

function dobleapellido(input) {
    let regex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ]+(?:\s+[a-zA-ZáéíóúñÁÉÍÓÚÑ]+)+$/; // Permite nombres con tildes
    if (!regex.test(input.value)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Inserta dos apellidos!",

          });
        input.value = ""; // Borra el campo si es inválido
        return false;   
    }
    return true;
}


function mostrarPlanes() {
    // Validar campos obligatorios primero
    const requiredFields = document.querySelectorAll('#step1 [required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    // Validar específicamente el campo de apellidos
    const inputApellidos = document.getElementById("apellidos");
    if (!dobleapellido(inputApellidos)) {
        isValid = false; // Evita avanzar si el apellido no es válido
    }

    const inputfechaini = document.getElementById("fechaini");
    const inputfechafin = document.getElementById("fechafin");
    const today = new Date().toISOString().split('T')[0]; // Fecha del sistema en formato YYYY-MM-DD

// Comprobar si la fecha de inicio es menor que hoy
if (inputfechaini.value < today) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La fecha de inicio no puede ser menor que la fecha de hoy!",
    });
    inputfechaini.value = ""; // Borra el campo si es inválido
    isValid = false;
} 
// Comprobar si la fecha de inicio es mayor que la fecha de fin
else if (inputfechaini.value > inputfechafin.value) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La fecha de inicio no puede ser mayor a la fecha de fin!",
    });
    inputfechaini.value = ""; // Borra el campo si es inválido
    inputfechafin.value = ""; // Borra el campo si es inválido
    isValid = false;
}


    if (isValid) {
        // Obtener el cohete seleccionado
        const coheteSeleccionado = document.querySelector('select[name="cohetes"]').value;
        const precioBase = preciosBase[coheteSeleccionado];

        // Actualizar precios
        document.getElementById('precioBasico').textContent = `$${precioBase}`;
        document.getElementById('precioPremium').textContent = `$${precioBase * 1.5}`;
        document.getElementById('precioBusiness').textContent = `$${precioBase * 2}`;

        // Mostrar el segundo paso
        document.getElementById('step1').classList.add('hidden');
        document.getElementById('step2').classList.remove('hidden');
    }
}


function seleccionarPlan(plan) {
    const coheteSeleccionado = document.querySelector('select[name="cohetes"]').value;
    const precioBase = preciosBase[coheteSeleccionado];
    let precioFinal;

    switch(plan) {
        case 'Básico':
            precioFinal = precioBase;
            break;
        case 'Premium':
            precioFinal = precioBase * 1.5;
            break;
        case 'Business':
            precioFinal = precioBase * 2;
            break;
    }

    // Actualizar el select
    document.getElementById('plan').value = plan;
    
    // Resaltar la card correspondiente
    resaltarCard(plan);
}

function seleccionarPlanDesdeSelect() {
    const planSeleccionado = document.getElementById('plan').value;
    if (planSeleccionado) {
        seleccionarPlan(planSeleccionado);
    }
}

function resaltarCard(plan) {
    // Remover selección de todas las cards
    document.querySelectorAll('.plan').forEach(card => {
        card.classList.remove('selected-plan');
    });

    // Resaltar la card seleccionada
    switch(plan) {
        case 'Básico':
            document.getElementById('planBasico').classList.add('selected-plan');
            break;
        case 'Premium':
            document.getElementById('planPremium').classList.add('selected-plan');
            break;
        case 'Business':
            document.getElementById('planBusiness').classList.add('selected-plan');
            break;
    }
}

// Validación al enviar el formulario
document.querySelector('form').addEventListener('submit', function(e) {
    const planSeleccionado = document.getElementById('plan').value;
    if (!planSeleccionado) {
        e.preventDefault();
        document.getElementById('plan').classList.add('error');
        alert('Por favor, selecciona un plan de vuelo.');
    }
});


// Función para obtener parámetros de la URL
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Función para preseleccionar el cohete al cargar la página
function preseleccionarCohete() {
    const coheteSeleccionado = getParameterByName('cohete');
    if (coheteSeleccionado) {
        const selectorCohetes = document.querySelector('select[name="cohetes"]');
        // Verificar si el valor existe en las opciones
        const opcionExiste = Array.from(selectorCohetes.options).some(option => option.value === coheteSeleccionado);
        
        if (opcionExiste) {
            selectorCohetes.value = coheteSeleccionado;

        }
    }
}
$(document).ready(function() {
    $("#miFormulario").submit(function(event) { 
        event.preventDefault(); // ⛔ Bloquear la recarga de la página
        console.log("Formulario interceptado, no se envía tradicionalmente.");

        const formData = {
            nombre: $("#nombres").val(),
            apellidos: $("#apellidos").val(),
            correo: $("#correo").val(),
            telefono: $("#telefono").val(),
            fechaini: $("#fechaini").val(),
            fechafin: $("#fechafin").val(),
            cantidad: $("#cantidad").val(),
            cohete: $("#cohetes").val(),
            plan: $("#plan").val()
        };

        $.ajax({
            type: "POST",
            url: "/viajes",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(formData),
            success: function() {
                Swal.fire({
                    icon: "success",
                    title: "¡Éxito!",
                    text: "El viaje se ha registrado correctamente.",
                    confirmButtonText: "Aceptar"
                });

                // Limpiar el formulario después de la alerta
                
            },
            error: function(res) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo crear el viaje. Intenta de nuevo.",
                    confirmButtonText: "Aceptar"
                });
            }
        });
    });
});



// Ejecutar la función cuando la página se carga
document.addEventListener('DOMContentLoaded', preseleccionarCohete);