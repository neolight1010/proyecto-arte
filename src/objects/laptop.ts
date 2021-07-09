import { load_gltf } from "../utils/load_gltf";
import laptopUrl from "../../assets/laptop/laptop.glb?url";

export const load_laptop_object = () => {
  return load_gltf(laptopUrl);
};
