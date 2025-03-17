/*function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.querySelector(".menu-btn");

    sidebar.classList.toggle("open"); // Alterna la visibilidad del sidebar
    menuBtn.classList.toggle("open"); // Alterna la animación del botón

    // Cambia el contenido del botón entre ☰ y ✖
    if (sidebar.classList.contains("open")) {
        menuBtn.innerHTML = "✖"; // Cambia a X cuando el menú está abierto
    } else {
        menuBtn.innerHTML = "☰"; // Cambia de nuevo a ☰ cuando se cierra
    }
}
/*
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar") || document.getElementById("sidebare");
    let lastScrollTop = 0;

    function toggleMenu() {
        sidebar.classList.toggle("open");
    }

    function handleScroll() {
        let currentScroll = window.scrollY;

        if (currentScroll > lastScrollTop) {
            // Si el usuario hace scroll hacia abajo, oculta el sidebar
            sidebar.classList.add("hidden");
        } else {
            // Si el usuario sube, no lo vuelve a mostrar automáticamente (puedes cambiar esto)
            sidebar.classList.remove("hidden");
        }

        lastScrollTop = currentScroll;
    }

    // Detectar cuando el usuario hace scroll
    window.addEventListener("scroll", handleScroll);

    // Botón de menú para abrir/cerrar el sidebar
    document.querySelector(".menu-btn").addEventListener("click", toggleMenu);
});*/


// Función para mostrar/ocultar el sidebar
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.querySelector(".menu-btn");
    const body = document.body;

    sidebar.classList.toggle("open");
    menuBtn.classList.toggle("open");
    body.classList.toggle("menu-open");

    // Cambia el contenido del botón entre ☰ y ✖
    if (sidebar.classList.contains("open")) {
        menuBtn.innerHTML = "✖"; // Cambia a X cuando el menú está abierto
    } else {
        menuBtn.innerHTML = "&#9776;"; // Cambia de nuevo a ☰ cuando se cierra
    }
}

// Manejo del scroll para la barra de navegación
window.addEventListener("scroll", function () {
    let navbar = document.getElementById("menunavegador");
    let sidebar = document.getElementById("sidebar");
    
    if (window.scrollY > 50) {
        navbar.classList.add("scroll");
        sidebar.classList.add("scroll");
    } else {
        navbar.classList.remove("scroll");
        sidebar.classList.remove("scroll");
    }
});

// Función para detectar el cambio de tamaño de la ventana
window.addEventListener("resize", function() {
    updateNavItems();
});

// Función para mover elementos de navegación entre la barra principal y el sidebar
function updateNavItems() {
    const navItems = document.querySelectorAll(".nav-items li");
    const sidebar = document.getElementById("sidebar");
    const mainLinks = document.querySelectorAll(".main-nav-link");
    
    // Si estamos en móvil (ancho < 768px)
    if (window.innerWidth < 768) {
        // Mover los elementos de navegación principal al sidebar si no están ya allí
        mainLinks.forEach(link => {
            // Verificar si ya existe en el sidebar
            const exists = Array.from(sidebar.children).some(child => 
                child.getAttribute('href') === link.getAttribute('href')
            );
            
            if (!exists) {
                // Crear una copia del enlace para el sidebar
                const sidebarLink = document.createElement("a");
                sidebarLink.href = link.getAttribute('href');
                sidebarLink.textContent = link.textContent;
                sidebarLink.classList.add("mobile-main-link");
                
                // Insertar al principio del sidebar
                sidebar.insertBefore(sidebarLink, sidebar.firstChild);
            }
        });
    } else {
        // Si estamos en desktop, eliminar los enlaces principales del sidebar
        const mobileLinks = document.querySelectorAll(".mobile-main-link");
        mobileLinks.forEach(link => {
            link.remove();
        });
    }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    updateNavItems();
});
