import { PointLight, PointLightHelper } from "three";

export default function point_light_with_helper(
  translateX: number,
  translateY: number,
  translateZ: number,
  color?: number
): [PointLight, PointLightHelper] {
  const newLight = new PointLight(color);

  newLight.translateX(translateX);
  newLight.translateY(translateY);
  newLight.translateZ(translateZ);

  const new_helper = new PointLightHelper(newLight, 5);

  return [newLight, new_helper];
}
