import teamsLogoUrl from "../../assets/logos/teams-logo.png";
import { clickableImageMeshWithAudio } from "../utils/clickableImageMeshWithAudio";

export const loadTeamsLogo = async (
  audioElement: HTMLAudioElement,
  k: number = 50
) => clickableImageMeshWithAudio(teamsLogoUrl, [1, 1], audioElement, k);
