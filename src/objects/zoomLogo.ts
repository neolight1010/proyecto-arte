import zoomLogoUrl from "../../assets/logos/zoom-logo.png";
import { clickableImageMeshWithAudio } from "../utils/clickableImageMeshWithAudio";

export const loadZoomLogo = async (
  audioElement: HTMLAudioElement,
  k: number = 50
) => clickableImageMeshWithAudio(zoomLogoUrl, [1.78, 1], audioElement, k);
// 1.78, 1
