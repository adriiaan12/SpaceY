$(document).ready(function () {
    $('.multiple-card-slider .carousel').each(function () {
        var currentCarouselId = $(this).attr('id');
        const multipleItemCarousel = document.getElementById(currentCarouselId);

        if (window.matchMedia("(min-width:576px)").matches) {
            const carousel = new bootstrap.Carousel(multipleItemCarousel, {
                interval: false,
                wrap: false
            });

            var carouselWidth = $('#' + currentCarouselId + ' .carousel-inner')[0].scrollWidth;
            var cardWidth = $('#' + currentCarouselId + ' .carousel-item').outerWidth(true);
            var scrollPosition = 0;

            $('#' + currentCarouselId + ' .carousel-control-next').on('click', function () {
                // Verificamos si hemos llegado al final, si es así, volvemos al principio
                if (scrollPosition < (carouselWidth - (cardWidth * 4))) {
                    console.log('next');
                    scrollPosition += cardWidth;
                    $('#' + currentCarouselId + ' .carousel-inner').animate({ scrollLeft: scrollPosition }, 600);
                } else {
                    // Si estamos al final, vamos al principio
                    scrollPosition = 0;
                    $('#' + currentCarouselId + ' .carousel-inner').animate({ scrollLeft: scrollPosition }, 600);
                }
            });

            $('#' + currentCarouselId + ' .carousel-control-prev').on('click', function () {
                // Si estamos al principio, vamos al final
                if (scrollPosition > 0) {
                    console.log('prev');
                    scrollPosition -= cardWidth;
                    $('#' + currentCarouselId + ' .carousel-inner').animate({ scrollLeft: scrollPosition }, 600);
                } else {
                    // Si estamos al principio, vamos al final
                    scrollPosition = carouselWidth - (cardWidth * 4);
                    $('#' + currentCarouselId + ' .carousel-inner').animate({ scrollLeft: scrollPosition }, 600);
                }
            });
        } else {
            $(multipleItemCarousel).addClass('slide');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {  //para asegurarnos que se cargue 
    document.querySelectorAll(".cohete").forEach(fila => {
        fila.style.display = "none";
    });
});






document.addEventListener("DOMContentLoaded", function () {
    let filas = document.querySelectorAll(".cohete");

    // Selecciona todas las imágenes dentro de las tarjetas
    let imagenes = document.querySelectorAll(".cohete-img");

    imagenes.forEach(img => {
        img.addEventListener("click", function () {
            let coheteSeleccionado = this.getAttribute("data-cohete");

            // Mostrar en consola
            console.log("Cohete seleccionado:", coheteSeleccionado);

            // Mostrar en una etiqueta <p> con el id "cohete-seleccionado"
            let mensaje = document.getElementById("cohete-seleccionado");
            mensaje.textContent = "Cohete seleccionado: " + coheteSeleccionado;

            // Oculta todas las filas primero
            filas.forEach(fila => {
                fila.style.display = "none";
            });

            // Muestra solo las filas del cohete seleccionado
            let filasMostrar = document.querySelectorAll("." + coheteSeleccionado);
            filasMostrar.forEach(fila => {
                fila.style.display = "table-row";
            });
        });
    });
});
