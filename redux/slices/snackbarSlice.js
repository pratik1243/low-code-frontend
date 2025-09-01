import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: { snackbarProps: {} },
  reducers: {
    setSnackbarProps: (state, action) => {
      state.snackbarProps = action.payload;
    },
  },
});

export const { setSnackbarProps } = snackbarSlice.actions;

export default snackbarSlice.reducer;
