import { Matrix4 } from "three";
import { load_gltf } from "../utils/load_gltf";
import stethoscopeUrl from "../../assets/stethoscope/stethoscope.glb?url";

export const loadStethoscopeObject = () =>
  load_gltf(stethoscopeUrl).then((stethoscope) => {
    stethoscope.applyMatrix4(new Matrix4().makeScale(90, 90, 90));
    return stethoscope;
  });
