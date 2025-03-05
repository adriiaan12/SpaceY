window.addEventListener("scroll", function () {
    let navbar = document.getElementById("menunavegador");
    let asides = document.getElementById("sidebar");
    

    if (window.scrollY > 50) { // Cambia si el usuario baja 50px
        navbar.classList.add("scroll");
        asides.classList.add("scroll");
         
    } else {
        navbar.classList.remove("scroll"); 
        asides.classList.remove("scroll"); 
        
    }
});