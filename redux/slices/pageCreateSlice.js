import { createSlice } from "@reduxjs/toolkit";

const pageCreateSlice = createSlice({
  name: "pageCreate",
  initialState: { pageCreateDetails: {} },
  reducers: {
    setPageCreateDetails: (state, action) => {
      state.pageCreateDetails = action.payload;
    },
  },
});

export const { setPageCreateDetails } = pageCreateSlice.actions;

export default pageCreateSlice.reducer;
