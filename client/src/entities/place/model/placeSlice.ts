import { createSlice } from "@reduxjs/toolkit";
import { PlaceSliceT } from "./shema";
import { fetchPlaces } from "./placeThunks";



const initialState: PlaceSliceT = {
  places: null,
  loading: false,
  error: null,
};

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlaces.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPlaces.fulfilled, (state, action) => {
      state.places = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch places";
      },
    );
  },
});


export default placeSlice.reducer;
