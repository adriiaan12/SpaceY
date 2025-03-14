// Precios base por cohete
const preciosBase = {
    falcon: 100,
    ariane: 150,
    saturno: 200,
    soyuz: 125,
    delta: 180
};

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
            
            // Opcional: si tienes alguna función que debe ejecutarse al cambiar el cohete
            // Puedes dispararla aquí
            // Por ejemplo, si tienes una función que actualiza precios basados en el cohete
            // actualizarPrecios();
        }
    }
}

// Ejecutar la función cuando la página se carga
document.addEventListener('DOMContentLoaded', preseleccionarCohete);