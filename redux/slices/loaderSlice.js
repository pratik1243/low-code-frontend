import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: { open: false },
  reducers: {
    setLoader: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
