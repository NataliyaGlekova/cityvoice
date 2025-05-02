import { createSlice } from "@reduxjs/toolkit";
import { PlaceSliceT } from "./shema";
import { fetchPlaces, fetchCategoryPlaces } from "./placeThunks";

const initialState: PlaceSliceT = {
  places: [],
  loading: false,
  activePlace: null,
  isModalVisible: false,
  activePlaces: [],
  isYamapReady: false,
  
};

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    setActivePlace: (state, action) => {
      state.activePlace = action.payload;
    },
    setIsModalVisible: (state, action) => {
      state.isModalVisible = action.payload;
    },
    setIsYamapReady: (state, action) => {
      state.isYamapReady = action.payload;
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
    });
    builder.addCase(fetchCategoryPlaces.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryPlaces.fulfilled, (state, action) => {
      state.activePlaces = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCategoryPlaces.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { setActivePlace, setIsModalVisible, setIsYamapReady } = placeSlice.actions;
export default placeSlice.reducer;
