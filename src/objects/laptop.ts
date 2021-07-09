import { load_gltf } from "../utils/load_gltf";

export const load_laptop_object = () => {
  return load_gltf("assets/laptop/laptop.glb");
};
