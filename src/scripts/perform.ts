import { fabric } from "fabric";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import disableAnchorBtn from "../utils/disableAnchorBtn";

// Configure Supabase.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const canvas = new fabric.Canvas(
  document.querySelector("#canvas") as HTMLCanvasElement
);

canvas.isDrawingMode = true;
canvas.backgroundColor = "white";
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
