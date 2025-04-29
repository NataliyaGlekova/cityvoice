import { createSlice } from "@reduxjs/toolkit";
import { PlaceSliceT } from "./shema";
import { fetchPlaces } from "./placeThunks";

const initialState: PlaceSliceT = {
  places: [],
  loading: false,
  activePlace: null,
};

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    setActivePlace: (state, action) => {
      state.activePlace = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaces.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlaces.fulfilled, (state, action) => {
      state.places = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPlaces.rejected, (state, action) => {
      state.loading = false;
<<<<<<< HEAD
      state.error = action.error.message || "Failed to fetch places";
=======
>>>>>>> eugene3
    });
  },
});

export default placeSlice.reducer;
