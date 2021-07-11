import { fabric } from "fabric";

export default async function galleryCard(
  canvasData: string | Object
): Promise<HTMLDivElement> {
  const container = document.createElement("div") as HTMLDivElement;
  container.classList.add("outline", "mw-25", "mr2", "mb2", "h-auto");

  const canvasElement = document.createElement("canvas") as HTMLCanvasElement;
  const canvas = new fabric.StaticCanvas(canvasElement, {
    width: 300,
    height: 300,
  });

  canvas.loadFromJSON(canvasData, () => {
    console.log("Canvas populated successfully.");
  });

  container.append(canvasElement);
  return container;
}
