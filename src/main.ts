import "./style.css";
import * as three from "three";
import { load_laptop_object } from "./objects/laptop";

const scene = new three.Scene();

const camera = new three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new three.WebGLRenderer({
  canvas: document.querySelector("#bg") as HTMLCanvasElement,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(100);

// Add objects
const light = new three.AmbientLight();
scene.add(light);

const laptop = await load_laptop_object();
scene.add(laptop);

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  laptop.rotateY(Math.PI / 50);
}

animate();
