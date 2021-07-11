export default function disableAnchorBtn(btn: HTMLAnchorElement) {
  btn.style.pointerEvents = "none";
  btn.style.cursor = "default";
}
