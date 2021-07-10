import { fabric } from "fabric";

const canvas = new fabric.Canvas(
  document.querySelector("#canvas") as HTMLCanvasElement
);

canvas.isDrawingMode = true;
canvas.backgroundColor = "white";
canvas.renderAll();
