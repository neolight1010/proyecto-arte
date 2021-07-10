import { load_gltf } from "../utils/load_gltf";
import headUrl from "../../assets/head/head.glb?url";
import { Matrix4 } from "three";

export const loadHeadObject = async () =>
  load_gltf(headUrl).then((head) => {
    head.applyMatrix4(new Matrix4().makeScale(50, 50, 50));
    return head;
  });
