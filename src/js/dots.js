export class DotGrid {
  constructor(container = "sketch") {
    this.canvasElement = document.getElementById(container);

    this.measureDimensions();

    this.mouseX = 0;
    this.mouseY = 0;
  }

  measureDimensions() {
    this.dpr = window.devicePixelRatio || 1;

    this.drawable = this.canvasElement.getBoundingClientRect();

    this.canvasWidth = this.drawable.width * this.dpr;
    this.canvasHeight = this.drawable.height * this.dpr;

    this.canvasElement.width = this.canvasWidth;
    this.canvasElement.height = this.canvasHeight;

    this.canvas = this.canvasElement.getContext("2d");
    this.canvas.scale(this.dpr, this.dpr);
  }

  onWindowResize() {
    this.measureDimensions();

    this.draw();
  }

  onMouseUpdate(e) {
    this.mouseX = e.pageX - this.drawable.left;
    this.mouseY = e.pageY - this.drawable.top - window.scrollY;
    this.drawable = this.canvasElement.getBoundingClientRect();

    window.requestAnimationFrame(this.draw.bind(this));
  }

  init() {
    window.requestAnimationFrame(this.draw.bind(this));
    // Listen for Mouse updates
    document.body.addEventListener(
      "pointermove",
      this.onMouseUpdate.bind(this),
      false
    );

    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  // Draws the background and calls the function for drawing the dots
  draw() {
    this.canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawDots();
  }

  /*
  ((j - this.mouseY) / dist * 4)
  */

  // i and j function as x and y when drawing the dot grid.
  drawDots() {
    let size = 1.2;
    let gridSize = 30;
    for (var i = 2; i < this.canvasWidth / this.dpr / gridSize - 1; i++) {
      for (var j = 2; j < this.canvasHeight / this.dpr / gridSize - 1; j++) {
        let x = i * gridSize;
        let y = j * gridSize;
        let dist = this.calculateDistance(x, y, this.mouseX, this.mouseY);
        this.canvas.beginPath();

        this.canvas.arc(
          x + ((x - this.mouseX) / dist) * gridSize,
          y + ((y - this.mouseY) / dist) * gridSize,
          size,
          size,
          Math.PI,
          true
        );
        this.canvas.fillStyle = "black";
        this.canvas.fill();
      }
    }
  }

  // Grabs mouse position, checks if the mouse is off the screen (NaN) and calculates the distance from the mouse pointer and each dot using the pythagorean theorem.
  calculateDistance(ellipseX, ellipseY, mouseX, mouseY) {
    let x = mouseX;
    let y = mouseY;

    if (x == NaN) {
      return 1;
    } else {
      let leg1 = Math.abs(x - ellipseX);
      let leg2 = Math.abs(y - ellipseY);
      let pyth = Math.pow(leg1, 1.8) + Math.pow(leg2, 1.8);
      return Math.sqrt(pyth);
    }
  }
}
