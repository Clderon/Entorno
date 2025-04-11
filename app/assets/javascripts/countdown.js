//= require countdown
//= require_tree .

document.addEventListener("DOMContentLoaded", function () {
  // Fechas de los eventos (formato: año, mes-1, día, hora, minuto)
  const fechasEventos = [
    new Date(2025, 4, 18, 0, 0), // FESTILIBRO: 18/07/2025
    new Date(2025, 4, 28, 0, 0), // MERCAFERIA: 28/07/2025
    new Date(2025, 4, 27, 0, 0), // ALIMENTAFERIA: 27/07/2025
  ];

  const countdownElements = document.querySelectorAll(".countdown");

  // Actualizar contadores
  function actualizarContadores() {
    const ahora = new Date();

    countdownElements.forEach((countdown, index) => {
      const tiempoRestante = fechasEventos[index] - ahora;

      if (tiempoRestante > 0) {
        const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
        const horas = Math.floor(
          (tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutos = Math.floor(
          (tiempoRestante % (1000 * 60 * 60)) / (1000 * 60)
        );
        const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

        // Actualizar valores en el DOM
        const valoresCuenta = countdown.querySelectorAll(".countdown-value");
        valoresCuenta[0].textContent = dias.toString().padStart(2, "0");
        valoresCuenta[1].textContent = horas.toString().padStart(2, "0");
        valoresCuenta[2].textContent = minutos.toString().padStart(2, "0");
        valoresCuenta[3].textContent = segundos.toString().padStart(2, "0");
      } else {
        // El evento ya pasó
        const valoresCuenta = countdown.querySelectorAll(".countdown-value");
        valoresCuenta.forEach((valor) => (valor.textContent = "00"));
      }
    });
  }

  // Actualizar cada segundo
  actualizarContadores();
  setInterval(actualizarContadores, 1000);

  // Elementos del carrusel
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  const indicators = document.querySelectorAll(".indicator");

  // Variables de control
  let currentIndex = 0;
  const slideWidth = 100; // Porcentaje
  const totalSlides = slides.length;
  let autoplayInterval;

  // Inicializar carrusel
  function initCarousel() {
    // Establecer ancho del track basado en el número de slides
    track.style.width = `${totalSlides * 100}%`;

    // Establecer ancho de cada slide
    slides.forEach((slide) => {
      slide.style.width = `${slideWidth / totalSlides}%`;
    });

    // Iniciar autoplay
    startAutoplay();

    // Añadir event listeners
    prevButton.addEventListener("click", goToPrevSlide);
    nextButton.addEventListener("click", goToNextSlide);

    // Event listeners para los indicadores
    indicators.forEach((indicator) => {
      indicator.addEventListener("click", function () {
        const slideIndex = parseInt(this.getAttribute("data-index"));
        goToSlide(slideIndex);
      });
    });

    // Pausar autoplay al pasar el mouse sobre el carrusel
    track.addEventListener("mouseenter", stopAutoplay);
    track.addEventListener("mouseleave", startAutoplay);
    prevButton.addEventListener("mouseenter", stopAutoplay);
    prevButton.addEventListener("mouseleave", startAutoplay);
    nextButton.addEventListener("mouseenter", stopAutoplay);
    nextButton.addEventListener("mouseleave", startAutoplay);
  }

  // Ir a un slide específico
  function goToSlide(index) {
    if (index < 0) {
      index = totalSlides - 1;
    } else if (index >= totalSlides) {
      index = 0;
    }

    currentIndex = index;
    updateCarousel();
  }

  // Ir al slide anterior
  function goToPrevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Ir al siguiente slide
  function goToNextSlide() {
    goToSlide(currentIndex + 1);
  }

  // Actualizar la posición del carrusel
  function updateCarousel() {
    // Mover el track
    track.style.transform = `translateX(-${
      currentIndex * (100 / totalSlides)
    }%)`;

    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  // Iniciar autoplay
  function startAutoplay() {
    stopAutoplay(); // Asegurarse de que no haya múltiples intervalos
    autoplayInterval = setInterval(goToNextSlide, 5000); // Cambiar slide cada 5 segundos
  }

  // Detener autoplay
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  }

  // Inicializar el carrusel
  initCarousel();

  // Manejar eventos de teclado
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      goToPrevSlide();
    } else if (e.key === "ArrowRight") {
      goToNextSlide();
    }
  });

  // Manejar eventos táctiles (swipe)
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  });

  track.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay();
  });

  function handleSwipe() {
    const swipeThreshold = 50; // Umbral mínimo para considerar un swipe

    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe izquierda (siguiente slide)
      goToNextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe derecha (slide anterior)
      goToPrevSlide();
    }
  }
});
