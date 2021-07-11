import { fabric } from "fabric";

export default async function galleryCard(
  canvasData: string | Object
): Promise<HTMLDivElement> {
  const container = document.createElement("div") as HTMLDivElement;
  container.classList.add("outline", "w-25", "pa3", "mr2", "mb2");

  const canvasElement = document.createElement("canvas") as HTMLCanvasElement;
  const canvas = new fabric.StaticCanvas(canvasElement, {
    width: container.clientWidth,
  });

  canvas.loadFromJSON(canvasData, () => {
    canvas.renderAll();
    console.log("Canvas populated successfully.");
  });

  container.append(canvasElement);
  return container;
}
