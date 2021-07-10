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

export const clickableImageMeshWithAudio = async (
  imageUrl: string,
  aspect: [number, number],
  audioElement: HTMLAudioElement,
  k: number = 50
) => {
  const loader = new TextureLoader();

  const material = new MeshLambertMaterial({
    map: loader.load(imageUrl),
    transparent: true,
    color: 0xffffff,
    side: DoubleSide,
  });
  const geometry = new PlaneGeometry((aspect[0] / aspect[1]) * k, k);

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
