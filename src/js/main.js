import "../scss/style.scss";
import { DotGrid } from "./dots.js";
import { Typewriter } from "./typewriter.js";
import "./slider.js";
import "./accordion.js";

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

const form = document.getElementById("touch-form");
form.addEventListener("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  fetch("/mail.php", {
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
