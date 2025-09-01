import { createSlice } from "@reduxjs/toolkit";

const publishSlice = createSlice({
  name: "publish",
  initialState: { publish: false },
  reducers: {
    isPublish: (state, action) => {
      state.publish = action.payload;
    },
  },
});

export const { isPublish } = publishSlice.actions;

export default publishSlice.reducer;
