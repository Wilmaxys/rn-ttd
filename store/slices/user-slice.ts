import { defaultTheme } from "../../constants";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const userSlice = createSlice({
  name: "user",
  initialState: {
    theme: defaultTheme,
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { setTheme } = actions;

export const selectTheme = (state: RootState) => state.user.theme;
export const selectColors = (state: RootState) => state.user.theme.colors;

export default reducer;
