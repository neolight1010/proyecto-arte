import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const load_gltf = (path: string): Promise<Group> =>
  new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      path,
      (gltf) => {
        const laptop = gltf.scene;
        resolve(laptop);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (err) => {
        reject(err);
      }
    );
  });
