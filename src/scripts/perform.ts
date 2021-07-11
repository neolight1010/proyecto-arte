import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";
import createSupabaseClient from "../utils/createSupabaseClient";
import disableAnchorBtn from "../utils/disableAnchorBtn";

// Configure Supabase.
const supabase = createSupabaseClient();

const canvas = new fabric.Canvas(
  document.querySelector("#canvas") as HTMLCanvasElement,
  {
    backgroundColor: "white",
  }
);

canvas.isDrawingMode = true;
canvas.renderAll();

// Submit drawing button.
const submitBtn = document.querySelector("#submit") as HTMLAnchorElement;

submitBtn.onclick = async () => {
  const canvasData = canvas.toJSON();
  const { error } = await supabase
    .from("gallery")
    .insert([{ id: uuidv4(), canvas_data: canvasData }]);

  if (!error) {
    disableAnchorBtn(submitBtn);
    canvas.clear();
    console.log("Data uploaded successfully!");
  } else {
    console.log("An error has occurred: ", error);
  }
};
