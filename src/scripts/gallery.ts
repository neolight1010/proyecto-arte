import galleryCard from "../components/gallery_card";
import createSupabaseClient from "../utils/createSupabaseClient";

async function gallery_page(): Promise<void> {
  // Get data.
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from("gallery").select("canvas_data");

  if (error) {
    console.log("An error has occurred: ", error);
    return;
  }

  // Generate canvas.
  const drawingsContainer = document.querySelector("#drawings");

  data?.forEach(async (canvasData) => {
    const newCard = await galleryCard(canvasData.canvas_data);
    drawingsContainer?.append(newCard);
  });
}

gallery_page();
