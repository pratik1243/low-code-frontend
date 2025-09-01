import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { authDetails: {} },
  reducers: {
    setAuthDetails: (state, action) => {
      state.authDetails = action.payload;
    },
  },
});

export const { setAuthDetails } = authSlice.actions;

export default authSlice.reducer;
