import "./style.css";
import * as three from "three";
import { load_laptop_object } from "./objects/laptop";
import pointLightWithHelper from "./utils/poinLightWithHelper";
import { loadStethoscopeObject } from "./objects/stethoscope";
import { Clock } from "three";
import ellipseMotion from "./motion_funcs/ellipse";
import neonBackground from "../assets/background/neon.png";

export async function main(): Promise<void> {
  const bgAudio = document.querySelector("#bg-audio") as HTMLAudioElement;

  const playAudioBtn = document.querySelector(
    "#play-audio-btn"
  ) as HTMLAnchorElement;
  const playAudioBtnIcon = playAudioBtn.querySelector("i");

  playAudioBtn.onclick = () => {
    if (bgAudio.paused) {
      bgAudio.play();

      playAudioBtnIcon?.classList.remove("la-volume-off");
      playAudioBtnIcon?.classList.add("la-volume-up");
    } else {
      bgAudio.pause();

      playAudioBtnIcon?.classList.remove("la-volume-up");
      playAudioBtnIcon?.classList.add("la-volume-off");
    }
  };

  // Scene setup.
  const scene = new three.Scene();

  const camera = new three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.setZ(150);

  const renderer = new three.WebGLRenderer({
    canvas: document.querySelector("#bg") as HTMLCanvasElement,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const clock = new Clock(true);

  // Add objects
  const textureLoader = new three.TextureLoader();
  const background = textureLoader.load(neonBackground);
  scene.background = background;

  const [light1, lightHelper1] = pointLightWithHelper(0, 30, 0, 0xf533e8);
  scene.add(light1);
  scene.add(lightHelper1);

  const [light2, lightHelper2] = pointLightWithHelper(40, 30, 30, 0x89f51d);
  scene.add(light2);
  scene.add(lightHelper2);

  const [light3, lightHelper3] = pointLightWithHelper(-40, 30, -30, 0xf4ede8);
  scene.add(light3);
  scene.add(lightHelper3);

  const [light4, lightHelper4] = pointLightWithHelper(0, -40, 30);
  scene.add(light4);
  scene.add(lightHelper4);

  const laptop = await load_laptop_object();
  laptop.applyMatrix4(new three.Matrix4().makeScale(0.8, 0.8, 0.8)); // Scale 0.8x
  laptop.translateY(-10);
  scene.add(laptop);

  const stethoscope = await loadStethoscopeObject();
  scene.add(stethoscope);

  animate();

  // Animate
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    laptop.rotateY(Math.PI / 150);
    laptop.rotateZ(Math.PI / 400);

    // stethoscope orbit motion
    [
      stethoscope.position.x,
      stethoscope.position.z,
      stethoscope.position.y,
    ] = ellipseMotion(clock.getElapsedTime(), 110, 80, 0, -15);

    stethoscope.rotateY(Math.PI / -200);
  }
}

main();
