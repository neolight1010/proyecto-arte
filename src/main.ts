import "./style.css";
import * as three from "three";

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

camera.position.setZ(30);

// Add geometry
const geometry = new three.TorusGeometry(10, 3, 16, 100);
const material = new three.MeshBasicMaterial({
  color: 0xff7437,
  wireframe: true,
});
const torus = new three.Mesh(geometry, material);

scene.add(torus);

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  torus.rotateX(0.02);
}

animate();
