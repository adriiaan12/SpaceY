function toggleMenu() {
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
