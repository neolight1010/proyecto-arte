import "./style.css";
import * as three from "three";
import { load_laptop_object } from "./objects/laptop";

// Scene setup.
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
const light1 = new three.PointLight(0xf533e8);
light1.translateY(30);
scene.add(light1);

const light2 = new three.PointLight(0x89f51d);
light2.translateY(30);
light2.translateZ(30);
light2.translateX(40);
scene.add(light2);

const light3 = new three.PointLight(0xf4ede8);
light3.translateY(30);
light3.translateZ(-30);
light3.translateX(-40);
scene.add(light3);

const laptop = await load_laptop_object();
laptop.applyMatrix4(new three.Matrix4().makeScale(0.8, 0.8, 0.8)); // Scale 0.8x
laptop.translateY(-10);
scene.add(laptop);

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  laptop.rotateY(Math.PI / 150);
  laptop.rotateZ(Math.PI / 400);
}

animate();
