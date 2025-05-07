import Swiper from "swiper";
import {
  Navigation,
  Pagination,
  EffectCards,
  EffectFade,
} from "swiper/modules";
import mediumZoom from "medium-zoom";

const imagesSwiper = new Swiper(".task-images", {
  modules: [EffectFade],
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  on: {
    click: (swiper) => {
      const zoom = mediumZoom(swiper.clickedSlide.querySelector("img")).open();
      zoom.on("closed", () => zoom.detach(), { once: true });
    },
  },
  allowTouchMove: false,
});

const cardsSwiper = new Swiper(".tasks-cards", {
  modules: [Navigation, Pagination],
  grabCursor: true,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  loop: true,
  on: {
    activeIndexChange: ({ realIndex }) => {
      imagesSwiper.slideTo(realIndex);
    },
  },
});
