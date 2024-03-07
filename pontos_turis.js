
        document.addEventListener("DOMContentLoaded", function() {
            const attractions = document.querySelectorAll(".attraction");

            attractions.forEach((attraction, index) => {
                const stars = attraction.querySelectorAll(".fa-star");

                stars.forEach((star, i) => {
                    star.addEventListener("click", () => {
                        // Define a avaliação do usuário com base na posição da estrela clicada
                        const rating = i + 1;

                        // Atualiza a cor das estrelas clicadas
                        stars.forEach((star, j) => {
                            star.classList.toggle("far", j >= rating);
                            star.classList.toggle("fas", j < rating);
                        });

                        // Aqui você pode enviar a avaliação para o servidor ou realizar outras ações com ela
                    });
                });

                // Alterna a ordem das atrações para que elas apareçam alternadamente à esquerda e à direita
                if (index % 2 !== 0) {
                    attraction.style.order = "-1";
                }
            });
        });