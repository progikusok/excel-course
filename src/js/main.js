import "../scss/style.scss";
import { DotGrid } from "./dots.js";
import { Typewriter } from "./typewriter.js";
import "./scroll-timeline.js";
import "./slider.js";
import "./accordion.js";

document.documentElement.style.setProperty(
  "--vh",
  `${window.innerHeight * 0.01}px`
);

new DotGrid("sketch").init();

new Typewriter("intro-typewriter", [
  "=СУММ",
  "=MAKC",
  "=ECЛИ",
  "=СЧЕТ",
  "=CЦЕП",
  "=КОРРЕЛ",
  "=СРЗНАЧ",
]);

window.addEventListener("scroll", () => {
  const section = document.getElementById("main-section-id");
  const button = document.getElementById("main-button-fixed-id");

  const sectionBottom = section.getBoundingClientRect().bottom;

  if (sectionBottom <= 0) {
    button.classList.add("active");
  } else {
    button.classList.remove("active");
  }
});

const form = document.getElementById("touch-form");
form.addEventListener("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  fetch("https://formsubmit.co/210af3bfe186ea6b44f9c2096250731f", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      const successBlock = document.getElementById("touch-form-success");
      form.classList.add("hidden");
      successBlock.classList.add("active");

      fetch(`https://eov1j3c0nvnrpou.m.pipedream.net/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          test: `<strong>Новая заявка</strong>\n\n${e.target.name.value}\n${e.target.email.value}\n\n<blockquote>${e.target.message.value}</blockquote>`,
        }),
      });

      setTimeout(() => {
        successBlock.classList.remove("active");
        form.classList.remove("hidden");

        form.reset();
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
    });
}
