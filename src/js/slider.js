import Swiper from "swiper";
import {
  Navigation,
  Pagination,
  EffectCards,
  EffectFade,
} from "swiper/modules";

const imagesSwiper = new Swiper(".task-images", {
  modules: [EffectFade],
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  allowTouchMove: false,
});

const cardsSwiper = new Swiper(".tasks-cards", {
  modules: [Navigation, Pagination],
  // effect: "cards",
  grabCursor: true,
  // cardsEffect: {
  //   slideShadows: false,
  // },
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
    activeIndexChange: ({ activeIndex }) => {
      console.log(imagesSwiper);
      imagesSwiper.slideTo(activeIndex);
    },
  },
});
