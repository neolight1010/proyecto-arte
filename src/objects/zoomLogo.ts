import {
  DoubleSide,
  MeshLambertMaterial,
  PlaneGeometry,
  TextureLoader,
} from "three";

import {
  ClickableMesh,
  StateMaterialSet,
  ThreeMouseEventType,
} from "threejs-interactive-object";

import zoomLogoUrl from "../../assets/logos/zoom-logo.png";

export const loadZoomLogo = async (
  audioElement: HTMLAudioElement,
  k: number = 50
) => {
  const loader = new TextureLoader();

  const material = new MeshLambertMaterial({
    map: loader.load(zoomLogoUrl),
    transparent: true,
    color: 0xffffff,
    side: DoubleSide,
  });
  const geometry = new PlaneGeometry(1.78 * k, k);

  const mesh = new ClickableMesh({
    geo: geometry,
    material: new StateMaterialSet({
      normal: material,
    }),
  });

  mesh.addEventListener(ThreeMouseEventType.CLICK, (_e) => {
    audioElement.play();
  });

  return mesh;
};
