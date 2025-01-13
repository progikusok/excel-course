import "../scss/style.scss";
import { DotGrid } from "./dots.js";

// produceCelledBlockLogic();

// window.addEventListener("resize", produceCelledBlockLogic);

function produceCelledBlockLogic() {
  const celledBlock = document.getElementsByClassName("celled-block")[0];

  celledBlock.innerHTML = "";

  const containerDimensions = {
    w: celledBlock.clientWidth,
    h: celledBlock.clientHeight,
  };

  const numInRow = 15;

  const cellSize = containerDimensions.w / numInRow;

  const numInColumn = Math.floor(containerDimensions.h / cellSize);

  celledBlock.style.setProperty("--cell-size", cellSize);
  celledBlock.style.setProperty("--columns", numInRow);

  const spans = Array.from({ length: numInRow * numInColumn }).map(() => {
    const span = document.createElement("span");
    span.setAttribute("class", "celled-block__item");

    return span;
  });

  celledBlock.append(...spans);

  console.log(celledBlock.clientWidth, containerDimensions, spans);
}

import { GooCursor } from "./cursor.js";

const cursorEl = document.querySelector(".cursor");

// Initialize cursor
// const goo = new GooCursor(cursorEl);

// doMagic();

// Easter egg: click anywhere

function doMagic() {
  gsap
    .timeline()
    .addLabel("start", 0)
    .to(
      goo.DOM.cells,
      {
        duration: 1,
        ease: "power4",
        opacity: 1,
        stagger: {
          from: [...goo.DOM.cells].indexOf(goo.getCellAtCursor()),
          each: 0.02,
          grid: [goo.rows, goo.columns],
        },
      },
      "start"
    )
    .to(
      goo.DOM.cells,
      {
        duration: 1,
        ease: "power1",
        opacity: 0,
        stagger: {
          from: [...goo.DOM.cells].indexOf(goo.getCellAtCursor()),
          each: 0.03,
          grid: [goo.rows, goo.columns],
        },
      },
      "start+=0.3"
    );
}

window.addEventListener("click", () => {
  doMagic();
});

new DotGrid("sketch").init();
