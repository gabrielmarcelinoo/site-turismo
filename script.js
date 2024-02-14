/*document.addEventListener("DOMContentLoaded", function() {
    const carouselSlide = document.querySelector(".carousel-slide");
    const carouselImages = document.querySelectorAll(".carousel-slide img");

    let counter = 0; // Inicia o contador em 0
    const size = carouselImages[0].clientWidth;

    // Ajusta o tamanho do contêiner do carrossel
    carouselSlide.style.width = `${size * carouselImages.length}px`;

    // Botões de avançar e retroceder
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    function nextSlide() {
        if (counter >= carouselImages.length - 1) return;
        counter++;
        carouselSlide.style.transition = "transform 0.4s ease-in-out";
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    }

    function prevSlide() {
        if (counter <= 0) return;
        counter--;
        carouselSlide.style.transition = "transform 0.4s ease-in-out";
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    }

    // Move para o próximo slide a cada 3 segundos
    setInterval(nextSlide, 3000);
});*/

$('.carousel').carousel();

document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o ícone de seta para baixo
    const scrollIndicator = document.getElementById("scroll-indicator");

    // Adiciona um evento de clique ao ícone de seta para baixo
    scrollIndicator.addEventListener("click", function() {
        // Rola a página para baixo suavemente
        window.scrollBy({
            top: window.innerHeight, // Rola para baixo a altura da janela do navegador
            behavior: "smooth" // Adiciona um comportamento de rolagem suave
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const navbarToggler = document.getElementById("navbarToggler");
    const navbarMenu = document.getElementById("navbarMenu");

    navbarToggler.addEventListener("click", function() {
        navbarMenu.classList.toggle("active");
        navbarToggler.querySelector(".fa-bars").classList.toggle("hidden");
        navbarToggler.querySelector(".fa-times").classList.toggle("hidden");

        if (navbarMenu.classList.contains("active")) {
            navbarMenu.classList.add("show");
        } else {
            navbarMenu.classList.remove("show");
        }
    });
});