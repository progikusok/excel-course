import * as THREE from "three";

export class SvgSwitcher {
  size = 50;
  images = [
    "src/img/icons/circle.svg",
    "src/img/icons/folder.svg",
    "src/img/icons/filter.svg",
  ];

  tick = 0;

  switchingCounter = 0;

  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);

    this.drawable = this.canvas.getBoundingClientRect();
    this.dpr = window.devicePixelRatio || 1;

    this.canvasWidth = this.drawable.width * this.dpr;
    this.canvasHeight = this.drawable.height * this.dpr;

    // this.ctx = this.canvas.getContext("2d");
    // this.ctx.scale(this.dpr, this.dpr);

    this.appendHelperCanvas();
    // this.init();

    // window.addEventListener("click", () => {
    //   const currentPoints = this.collection[counter];

    //   counter++;
    //   counter = counter % this.gallery.length;

    //   const nextPoints = this.collection[counter];

    //   currentPoints.forEach((point, index) => {
    //     const pointObj = { value: point };

    //     gsap.to(pointObj, 2, {
    //       value: nextPoints[index],
    //       ease: "power2.inOut",
    //       delay: index / 10000,
    //       onUpdate: () => {
    //         currentPoints[index] = pointObj.value;

    //         this.geometry.getAttribute("position").set(currentPoints);
    //       },
    //     });
    //   });
    // });
    // this.switching();
  }

  switching() {
    const timer = setTimeout(() => {
      const currentPoints = this.collection[this.switchingCounter];

      this.switchingCounter++;
      this.switchingCounter = this.switchingCounter % this.gallery.length;

      console.log("<<<", this.switchingCounter);

      const nextPoints = this.collection[this.switchingCounter];

      console.log("^^^", this.collection);

      currentPoints.forEach((point, index) => {
        const pointObj = { value: point };

        gsap.to(pointObj, 2, {
          value: nextPoints[index],
          ease: "power2.inOut",
          delay: index / 10000,
          onUpdate: () => {
            currentPoints[index] = pointObj.value;

            this.geometry.getAttribute("position").set(currentPoints);
          },
          onComplete: () => {
            if (index === currentPoints.length - 1) {
              console.log("^^^ complete");
              clearTimeout(timer);
              this.switching();
            }
          },
        });
      });
    }, 2000);
  }

  appendHelperCanvas() {
    this.helperCanvas = document.createElement("canvas");
    this.helperCtx = this.helperCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    this.helperCanvas.width = this.size;
    this.helperCanvas.height = this.size;
  }

  loadImages(paths, whenLoaded) {
    const images = [];

    paths.forEach((path) => {
      const image = new Image();

      image.onload = () => {
        images.push(image);

        if (images.length === paths.length) {
          whenLoaded(images);
          return;
        }
      };

      image.src = path;
    });
  }

  fillUp(array, max) {
    const length = array.length;
    for (let i = 0; i < max - length; i++) {
      array.push(array[Math.floor(Math.random() * length)]);
    }
    return array;
  }

  shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }

  getArrayFromImage(img) {
    let imageCoords = [];

    this.helperCtx.clearRect(0, 0, this.size, this.size);
    this.helperCtx.drawImage(img, 0, 0, this.size, this.size);

    let data = this.helperCtx.getImageData(0, 0, this.size, this.size).data;

    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const red = data[(this.size * y + x) * 4];
        const green = data[(this.size * y + x) * 4 + 1];
        const blue = data[(this.size * y + x) * 4 + 2];
        const alpha = data[(this.size * y + x) * 4 + 3];

        if (alpha > 0) {
          imageCoords.push([
            10 * (x - this.size / 2),
            10 * (this.size / 2 - y),
          ]);
        }
      }
    }
    return this.shuffle(this.fillUp(imageCoords, 1000));
  }

  init() {
    this.loadImages(this.images, (images) => this.createScene(images));
  }

  createScene(images) {
    this.gallery = images.reduce((accumulator, image) => {
      return [...accumulator, this.getArrayFromImage(image)];
    }, []);

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(this.drawable.width, this.drawable.height);

    this.camera = new THREE.PerspectiveCamera(
      90,
      this.canvasWidth / this.canvasHeight,
      1,
      3000
    );
    this.camera.position.z = 500;

    // ЧТО ЕСТЬ НА СЦЕНЕ
    const texture = new THREE.TextureLoader().load("src/img/particle.png");
    const material = new THREE.PointsMaterial({
      size: 8,
      color: "green",
      sizeAttenuation: true,
      alphaTest: 0.5,
      transparent: true,
      map: texture,
    });

    this.geometry = new THREE.BufferGeometry();

    this.collection = this.gallery.map((currentGallery) => {
      const vertices = currentGallery
        .map((item) => [item[0], item[1], Math.random() * 100])
        .flat(1);

      return new Float32Array(vertices);
    });

    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.collection[0], 3)
    );

    const pointCloud = new THREE.Points(this.geometry, material);
    this.scene.add(pointCloud);

    // Конец сцены
    this.animate();
  }

  animate() {
    this.tick++;
    requestAnimationFrame(this.animate.bind(this));

    const positionAttribute = this.geometry.getAttribute("position");

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);

      const dX = Math.sin(this.tick / 10 + i / 2) / 10 + x;
      const dY = Math.cos(this.tick / 5 + i / 1) / 8 + y;
      const dZ = Math.sin(this.tick / 5 + i / 1) / 1.5 + z;

      positionAttribute.setX(i, dX);
      positionAttribute.setY(i, dY);
      positionAttribute.setZ(i, dZ);
    }

    this.geometry.verticesNeedUpdate = true;
    positionAttribute.needsUpdate = true;

    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
