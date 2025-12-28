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
document.addEventListener("DOMContentLoaded", () => {
  /* --- УНИВЕРСАЛЬНЫЙ СКРИПТ ДЛЯ ВСЕХ ОКОН --- */

  // 1. Функция открытия конкретного окна
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.style.overflow = "hidden"; // Блокируем скролл
    } else {
      console.error(`Окно с id "${modalId}" не найдено`);
    }
  };

  // 2. Функция закрытия всех модальных окон
  const closeAllModals = () => {
    // Находим все элементы, у которых ID начинается с "modal-" или "visa-" или "citizenship-"
    // Но проще найти все, у которых есть класс "fixed" и "z-50" (обычно это модалки),
    // или просто перечислить ваши ID:
    const modals = document.querySelectorAll(
      "#modal-intensive, #modal-visa, #modal-citizenship"
    );

    modals.forEach((modal) => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    });
    document.body.style.overflow = ""; // Возвращаем скролл
  };

  // 3. ЕДИНЫЙ ОБРАБОТЧИК КЛИКОВ (Делегирование)
  // Мы слушаем клики на всей странице и проверяем, куда кликнули
  document.addEventListener("click", (e) => {
    const target = e.target;

    // А. Если кликнули по кнопке ОТКРЫТИЯ (или иконке внутри неё)
    const triggerBtn = target.closest(".js-open-modal");
    if (triggerBtn) {
      e.preventDefault();
      const modalId = triggerBtn.getAttribute("data-modal");
      openModal(modalId);
      return;
    }

    // Б. Если кликнули по ОВЕРЛЕЮ (темный фон)
    // У вас ID оверлеев: modal-overlay, visa-overlay, citizenship-overlay
    if (target.id && target.id.includes("-overlay")) {
      closeAllModals();
      return;
    }

    // В. Если кликнули по КРЕСТИКУ ЗАКРЫТИЯ
    // У вас ID кнопок: modal-close, visa-close, citizenship-close
    // Или если сам элемент (или его родитель) имеет id с "-close"
    const closeBtn = target.closest('[id$="-close"]');
    if (closeBtn || (target.id && target.id.includes("-close"))) {
      closeAllModals();
      return;
    }
  });

  // 4. Закрытие по клавише ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllModals();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // === Логика Модальных Окон ===

  // 1. Открытие
  const openButtons = document.querySelectorAll(".js-open-modal");
  openButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const modalId = this.getAttribute("data-modal");
      const modal = document.getElementById(modalId);

      if (modal) {
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // Блокируем скролл страницы
      }
    });
  });

  // 2. Закрытие (функция для повторного использования)
  function closeModal(modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = ""; // Возвращаем скролл
  }

  // 3. Обработчик кнопок закрытия (крестик)
  const closeButtons = document.querySelectorAll(".js-modal-close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest('[role="dialog"]');
      closeModal(modal);
    });
  });

  // 4. Обработчик клика по фону (оверлей)
  const overlays = document.querySelectorAll(".js-modal-overlay");
  overlays.forEach((overlay) => {
    overlay.addEventListener("click", function () {
      const modal = this.closest('[role="dialog"]');
      closeModal(modal);
    });
  });

  // 5. Закрытие по клавише ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const openModal = document.querySelector('[role="dialog"]:not(.hidden)');
      if (openModal) {
        closeModal(openModal);
      }
    }
  });
});
//
//
document.addEventListener("DOMContentLoaded", () => {
  // Находим элементы по ID, которые ты указал в HTML
  const openBtn = document.getElementById("menu-open-btn");
  const closeBtn = document.getElementById("menu-close-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  // Проверка, чтобы скрипт не ломался, если элементов нет на странице
  if (openBtn && closeBtn && mobileMenu) {
    // Функция открытия
    openBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Предотвращаем переход по ссылке #
      mobileMenu.classList.remove("hidden"); // Показываем меню
      document.body.style.overflow = "hidden"; // Блокируем прокрутку страницы
    });

    // Функция закрытия
    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.add("hidden"); // Скрываем меню
      document.body.style.overflow = ""; // Возвращаем прокрутку
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // 1. Открытие модальных окон
  const openButtons = document.querySelectorAll(".js-open-modal");

  openButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const modalId = this.getAttribute("data-modal");
      const modal = document.getElementById(modalId);

      if (modal) {
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // Блокируем скролл фона
      }
    });
  });

  // 2. Закрытие по кнопке "Крестик" (ищем по новому классу js-modal-close)
  const closeButtons = document.querySelectorAll(".js-modal-close");

  closeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const modal = this.closest('[role="dialog"]');
      modal.classList.add("hidden");
      document.body.style.overflow = ""; // Возвращаем скролл
    });
  });

  // 3. Закрытие по клику на затемненный фон (Overlay)
  const overlays = document.querySelectorAll(".js-modal-overlay");

  overlays.forEach(function (overlay) {
    overlay.addEventListener("click", function () {
      const modal = this.closest('[role="dialog"]');
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    });
  });

  // 4. Закрытие по кнопке ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const openModals = document.querySelectorAll(
        '[role="dialog"]:not(.hidden)'
      );
      openModals.forEach(function (modal) {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
      });
    }
  });
});
