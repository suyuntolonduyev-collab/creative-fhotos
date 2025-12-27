import "./style.css";
import javascriptLogo from "./javascript.svg"; // Если не используются, можно убрать
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

document.addEventListener("DOMContentLoaded", () => {
  const initChatImageSlider = () => {
    const slides = [
      "./public/images/chat-mockup-01.svg",
      "./public/images/chat-mockup-02.svg",
      "./public/images/chat-mockup-03.svg",
      "./public/images/chat-mockup-04.svg",

      "./public/images/chat-mockup-05.svg",

      "./public/images/chat-mockup-00.svg",
    ];

    const imgElement = document.getElementById("chat-slider-image");
    // Используем классы кнопок, так как ID могут быть неуникальными или отсутствовать
    const prevButtons = document.querySelectorAll(".js-slider-prev");
    const nextButtons = document.querySelectorAll(".js-slider-next");

    if (!imgElement) return; // Если элемента нет, выходим, чтобы не было ошибок

    let currentIndex = 0;

    // Предзагрузка картинок (чтобы не моргало при первом клике)
    slides.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const updateSlide = (index) => {
      // 1. Делаем прозрачным
      imgElement.classList.add("opacity-70");
      imgElement.classList.remove("opacity-100");

      setTimeout(() => {
        // 2. Меняем источник
        imgElement.src = slides[index];

        // 3. Когда загрузится (или сразу, если из кеша), возвращаем видимость
        const showImage = () => {
          imgElement.classList.remove("opacity-70");
          imgElement.classList.add("opacity-100");
        };

        if (imgElement.complete) {
          showImage();
        } else {
          imgElement.onload = showImage;
        }
      }, 300); // Тайминг должен совпадать с duration-300 в CSS
    };

    const handleNext = () => {
      currentIndex++;
      if (currentIndex >= slides.length) currentIndex = 0;
      updateSlide(currentIndex);
    };

    const handlePrev = () => {
      currentIndex--;
      if (currentIndex < 0) currentIndex = slides.length - 1;
      updateSlide(currentIndex);
    };

    nextButtons.forEach((btn) => btn.addEventListener("click", handleNext));
    prevButtons.forEach((btn) => btn.addEventListener("click", handlePrev));
  };

  // ==================================================
  // 2. ЛОГИКА ГЛАВНОГО СЛАЙДЕРА (С КАРТОЧКАМИ КУРСОВ)
  // ==================================================
  const initCoursesSlider = () => {
    const slider = document.getElementById("slider");
    // Обратите внимание: я ищу кнопки внутри секции или по конкретным классам/ID
    // Предполагаю, что кнопки у вас лежат рядом со слайдером
    // Если у кнопок нет ID, лучше найти их через querySelector в контексте родителя
    const prevBtn = document.querySelector('[aria-label="Previous slide"]');
    const nextBtn = document.querySelector('[aria-label="Next slide"]');

    if (!slider || !prevBtn || !nextBtn) return;

    const getScrollAmount = () => {
      const card = slider.querySelector("article");
      if (!card) return 300; // запасное значение
      const style = window.getComputedStyle(slider);
      const gap = parseFloat(style.columnGap) || 16; // получаем gap из CSS
      return card.offsetWidth + gap;
    };

    prevBtn.addEventListener("click", () => {
      slider.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      slider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });

    // (Опционально) Скрытие кнопок, если доскроллили до конца

    const updateButtonState = () => {
      // Ваша логика с opacity...
    };
    slider.addEventListener("scroll", updateButtonState);
  };

  // ==================================================
  // ЗАПУСК ФУНКЦИЙ
  // ==================================================
  initChatImageSlider();
  initCoursesSlider();
});
