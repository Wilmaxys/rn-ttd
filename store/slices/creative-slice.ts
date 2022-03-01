import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { CreativeItem } from '../../types';
import { createGuid } from './utils';

const creativeSlice = createSlice({
  name: 'creative',
  initialState: {
    items: [] as CreativeItem[],
  },
  reducers: {
    setCreativeItems(state, { payload }: PayloadAction<CreativeItem[]>) {
      state.items = payload;
    },
    addCreativeItem(state, { payload }: PayloadAction<CreativeItem>) {
      state.items.push({
        ...payload,
        id: createGuid(),
      });
    },
    updateCreativeItem(state, { payload }: PayloadAction<CreativeItem>) {
      const index = state.items.findIndex((item) => item.id === payload.id);

      if (index === -1) return;

      state.items.splice(index, 1, payload);
    },
    removeCreativeItem(
      state,
      { payload }: PayloadAction<CreativeItem | string>
    ) {
      const id = typeof payload === 'string' ? payload : payload.id;

      if (!id) return;

      const index = state.items.findIndex((item) => item.id === id);

      if (index === -1) return;

      state.items.splice(index, 1);
    },
  },
});

const { actions, reducer } = creativeSlice;
export const {
  setCreativeItems,
  addCreativeItem,
  updateCreativeItem,
  removeCreativeItem,
} = actions;

export const lowestCreativeItemZIndexSelector = (state: RootState) => {
  let lowestZ = 0;
  state.creative.items.forEach(({ z }) => {
    if (z > lowestZ) lowestZ = z;
  });
  return lowestZ + 1;
};

export const creativeItemsSelector = (state: RootState) => state.creative.items;
export const creativeItemSelector = (id: string) => (state: RootState) =>
  state.creative.items.find((item) => item.id === id);

export default reducer;
