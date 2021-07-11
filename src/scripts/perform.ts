import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";
import createSupabaseClient from "../utils/createSupabaseClient";
import disableAnchorBtn from "../utils/disableAnchorBtn";
import enableAnchorBtn from "../utils/enableAnchorBtn";

// Configure Supabase.
const supabase = createSupabaseClient();

const canvasElement = document.querySelector("#canvas") as HTMLCanvasElement;
const canvas = new fabric.Canvas(canvasElement, {
  width: canvasElement.width,
  height: canvasElement.height,
  backgroundColor: "white",
});

canvas.isDrawingMode = true;
canvas.renderAll();

// Submit drawing button.
const submitBtn = document.querySelector("#submit") as HTMLAnchorElement;
const hasAlreadySubmitted = false;

submitBtn.onclick = async () => {
  if (!hasAlreadySubmitted) {
    disableAnchorBtn(submitBtn);

    const canvasData = canvas.toJSON();
    const { error } = await supabase
      .from("gallery")
      .insert([{ id: uuidv4(), canvas_data: canvasData }]);

    if (!error) {
      const succesText = document.createElement("span") as HTMLSpanElement;
      succesText.classList.add("mt3");
      succesText.textContent = "Dibujo enviado correctamente.";
      submitBtn.before(succesText);

      enableAnchorBtn(submitBtn);

      submitBtn.text = "Ir a galería.";
      submitBtn.href = "gallery.html";
    } else {
      console.log("An error has occurred: ", error);
    }
  }
};
