// Selecciona el nav
const nav = document.getElementById('menunavegador');

// Función para cambiar el color del fondo al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY >10) { // Si se hace scroll más de 50px
        nav.classList.add('nav-scroll'); // Añadir la clase nav-scroll que cambia el fondo
    } else {
        nav.classList.remove('nav-scroll'); // Si no se ha hecho scroll, quitar la clase
    }
});
