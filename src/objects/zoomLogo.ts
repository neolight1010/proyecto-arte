import {
  DoubleSide,
  Mesh,
  MeshLambertMaterial,
  PlaneGeometry,
  TextureLoader,
} from "three";
import zoomLogoUrl from "../../assets/logos/zoom-logo.png";

export const loadZoomLogo = async (k: number = 50) => {
  const loader = new TextureLoader();

  const material = new MeshLambertMaterial({
    map: loader.load(zoomLogoUrl),
    transparent: true,
    color: 0xffffff,
    side: DoubleSide,
  });
  const geometry = new PlaneGeometry(1.78 * k, k);

  return new Mesh(geometry, material);
};
