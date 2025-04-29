import { createSlice } from "@reduxjs/toolkit";
import { PlaceSliceT } from "./shema";
import { fetchPlaces } from "./placeThunks";



const initialState: PlaceSliceT = {
  places: null,
  loading: false,
  error: null,
  isActive: null,
};

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    setActivePlace(state, action: PayloadAction<string>) {
      state.isActive = action.payload;
    },
    clearActivePlace(state) {
      state.isActive = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaces.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPlaces.fulfilled, (state, action) => {
      state.places = action.payload;
      state.loading = false;
      state.error = null;
      state.isActive = null;
    });
    builder.addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch places";
      },
    );
  },
});

export const { setActivePlace, clearActivePlace } = placeSlice.actions;
export default placeSlice.reducer;
