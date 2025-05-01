import { createSlice } from "@reduxjs/toolkit";
import { PlaceSliceT } from "./schema";
import { addPlace, deletePlace, editPlace, fetchPlaces } from "./placesThunk";

const initialState: PlaceSliceT = {
  places: [],
};

export const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlaces.fulfilled, (state, action) => {
      state.places = action.payload;
    });
    builder.addCase(fetchPlaces.rejected, (state, action) => {
      console.error("Failed to fetch places:", action.error);
      state.places = [];
    });

    builder.addCase(editPlace.fulfilled, (state, action) => {
      state.places = state.places.map((place) =>
        place.id === action.payload.id ? action.payload : place
      );
    });
    builder.addCase(editPlace.rejected, (_, action) => {
      console.error("Failed to edit place:", action.error);
    });

    builder.addCase(deletePlace.fulfilled, (state, action) => {
      state.places = state.places.filter(
        (place) => place.id !== action.payload
      );
    });
    builder.addCase(deletePlace.rejected, (_, action) => {
      console.error("Failed to delete place:", action.error);
    });

    builder.addCase(addPlace.fulfilled, (state, action) => {
      state.places.push(action.payload);
    });
    builder.addCase(addPlace.rejected, (_, action) => {
      console.error("Failed to add place:", action.error);
    });
  },
});

export default placesSlice.reducer;
