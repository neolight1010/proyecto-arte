export default function ellipseMotion(
  t: number,
  a: number,
  b: number,
  cx: number = 0,
  cy: number = 0
): [x: number, y: number, z: number] {
  const x = a * Math.cos(t) + cx;
  const y = b * Math.sin(t) + cy;
  const z = 0;

  return [x, y, z];
}
