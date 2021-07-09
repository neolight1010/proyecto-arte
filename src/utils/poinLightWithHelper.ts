import { PointLight, PointLightHelper } from "three";

export default function pointLightWithHelper(
  translateX: number,
  translateY: number,
  translateZ: number,
  color?: number
): [PointLight, PointLightHelper] {
  const newLight = new PointLight(color);

  newLight.translateX(translateX);
  newLight.translateY(translateY);
  newLight.translateZ(translateZ);

  const newHelper = new PointLightHelper(newLight, 5);

  return [newLight, newHelper];
}
