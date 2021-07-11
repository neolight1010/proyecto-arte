import "./style.css";
import * as three from "three";
import { load_laptop_object } from "./objects/laptop";
import pointLightWithHelper from "./utils/poinLightWithHelper";
import { loadStethoscopeObject } from "./objects/stethoscope";
import { Clock } from "three";
import ellipseMotion from "./motion_funcs/ellipse";
import neonBackground from "../assets/background/neon.png";
import { loadHeadObject } from "./objects/head";
import { loadZoomLogo } from "./objects/zoomLogo";
import { MouseEventManager } from "threejs-interactive-object";
import { loadTeamsLogo } from "./objects/teamsLogo";

export async function main(): Promise<void> {
  // Set up audio button.
  const bgAudio = document.querySelector("#bg-audio") as HTMLAudioElement;

  const playAudioBtn = document.querySelector(
    "#play-audio-btn"
  ) as HTMLAnchorElement;
  const playAudioBtnIcon = playAudioBtn.querySelector("i");

  playAudioBtn.onclick = () => {
    if (bgAudio.paused) {
      bgAudio.play();

      playAudioBtnIcon?.classList.remove("la-play");
      playAudioBtnIcon?.classList.add("la-stop");
    } else {
      bgAudio.pause();

      playAudioBtnIcon?.classList.remove("la-stop");
      playAudioBtnIcon?.classList.add("la-play");
    }
  };

  // Scene setup.
  const scene = new three.Scene();

  const camera = new three.PerspectiveCamera(75, 2, 0.1, 1000);
  camera.position.setZ((1536 / window.innerWidth) * 120);
  camera.updateProjectionMatrix();

  const renderer = new three.WebGLRenderer({
    canvas: document.querySelector("#bg") as HTMLCanvasElement,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  MouseEventManager.init(scene, camera, renderer);

  const clock = new Clock(true);

  // Add objects
  const textureLoader = new three.TextureLoader();
  const background = textureLoader.load(neonBackground);
  scene.background = background;

  const [light1] = pointLightWithHelper(0, 30, 0, 0xf533e8);
  scene.add(light1);

  const [light2] = pointLightWithHelper(40, 30, 30, 0x89f51d);
  scene.add(light2);

  const [light3] = pointLightWithHelper(-40, 30, -30, 0xf4ede8);
  scene.add(light3);

  const [light4] = pointLightWithHelper(0, -40, 30);
  scene.add(light4);

  const laptop = await load_laptop_object();
  laptop.applyMatrix4(new three.Matrix4().makeScale(0.8, 0.8, 0.8)); // Scale 0.8x
  laptop.translateY(-10);
  scene.add(laptop);

  const stethoscope = await loadStethoscopeObject();
  scene.add(stethoscope);

  const head = await loadHeadObject();
  scene.add(head);
  head.translateY(10);

  const zoomLogo = await loadZoomLogo(
    document.querySelector("#zoom-audio") as HTMLAudioElement
  );
  zoomLogo.translateX(90);
  zoomLogo.translateY(70);
  scene.add(zoomLogo);

  const teamsLogo = await loadTeamsLogo(
    document.querySelector("#teams-audio") as HTMLAudioElement
  );
  teamsLogo.translateX(-90);
  teamsLogo.translateY(-70);
  scene.add(teamsLogo);

  animate();

  // Animate
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    laptop.rotateY(Math.PI / 150);
    laptop.rotateZ(Math.PI / 400);

    // stethoscope orbit motion
    [
      stethoscope.position.x,
      stethoscope.position.z,
      stethoscope.position.y,
    ] = ellipseMotion(clock.getElapsedTime(), 110, 80, 0, -15);

    stethoscope.rotateY(Math.PI / -200);
    zoomLogo.rotateY(Math.PI / 300);
    teamsLogo.rotateY(-Math.PI / 300);
  }
}

main();
