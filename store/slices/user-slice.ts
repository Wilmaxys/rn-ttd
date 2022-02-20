import { defaultTheme } from '../../constants';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    theme: defaultTheme,
  },
  reducers: {
    setTheme(state, { payload }) {
      state.theme = payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { setTheme } = actions;

export const themeSelector = (state: RootState) => state.user.theme;

export default reducer;
