import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstant from "@/shared/axiosInstant";
import { PlaceArraySchema } from "./shema";

export const fetchPlaces = createAsyncThunk(
  "places/fetch",
  async (category: string) => {
    try {
      const response = await axiosInstant.get("/markers", {
        params: { category },
      });
      console.log("Response from API:", response.data);

      return PlaceArraySchema.parse(response.data);
    } catch (error) {
      console.error("Error fetching places:", error);
      throw new Error("Failed to fetch places");
    }
  }
);

export const fetchCategoryPlaces = createAsyncThunk(
  "placesCategory/fetch",
  async (category: string) => {
    try {
      const response = await axiosInstant.get("/markers", {
        params: { category },
      });
      console.log("Response from API:", response.data);

      return PlaceArraySchema.parse(response.data);
    } catch (error) {
      console.error("Error fetching places:", error);
      throw new Error("Failed to fetch places");
    }
  }
);
