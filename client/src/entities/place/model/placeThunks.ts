import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstant from "@/shared/axiosInstant";
import { PlaceArraySchema } from "./shema";

export const fetchPlaces = createAsyncThunk("places/fetch", async () => {
  try {
    const response = await axiosInstant.get("/markers");
    console.log("Response from API:", response.data);

    return PlaceArraySchema.parse(response.data);
  } catch (error) {
    console.error("Error fetching places:", error);
    throw new Error("Failed to fetch places");
  }
});
