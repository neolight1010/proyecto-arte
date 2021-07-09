import { Matrix4 } from "three";
import { load_gltf } from "../utils/load_gltf";

export const loadStethoscopeObject = () =>
  load_gltf("assets/stethoscope/stethoscope.glb").then((stethoscope) => {
    stethoscope.applyMatrix4(new Matrix4().makeScale(90, 90, 90));
    return stethoscope;
  });
