import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewPlaceT, PlaceArraySchema, PlaceT } from "./schema";
import axiosInstance from "../../../shared/api/axiosInstance";

export const fetchPlaces = createAsyncThunk(
  "places/fetch",
  async (category: string) => {
    try {
      const response = await axiosInstance.get("/markers", {
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

export const editPlace = createAsyncThunk(
  "places/edit",
  async (place: PlaceT) => {
    try {
      const response = await axiosInstance.put("/markers/" + place.id, place);
      console.log("Response from API:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error editing place:", error);
      throw new Error("Failed to edit place");
    }
  }
);

export const deletePlace = createAsyncThunk(
  "places/delete",
  async (id: number) => {
    try {
      await axiosInstance.delete("/markers/" + id);
      return id;
    } catch (error) {
      console.error("Error deleting place:", error);
      throw new Error("Failed to delete place");
    }
  }
);

export const addPlace = createAsyncThunk(
  "places/add",
  async (place: NewPlaceT) => {
    try {
      const response = await axiosInstance.post("/markers", place);
      console.log("Response from API:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding place:", error);
      throw new Error("Failed to add place");
    }
  }
);
