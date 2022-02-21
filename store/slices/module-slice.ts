import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Module } from '../../types';
import { createGuid } from './utils';

const moduleSlice = createSlice({
  name: 'module',
  initialState: {
    modules: [] as Module[],
  },
  reducers: {
    setModules(state, { payload }: PayloadAction<Module[]>) {
      state.modules = payload;
    },
    addModule(state, { payload }: PayloadAction<Module>) {
      state.modules.push({
        ...payload,
        id: createGuid(),
        createdAt: new Date().toUTCString(),
        lastUsedAt: new Date().toUTCString(),
      });
    },
    updateModule(state, { payload }: PayloadAction<Module>) {
      const index = state.modules.findIndex(
        (module) => module.id === payload.id
      );

      if (index === -1) return;

      state.modules.splice(index, 1, payload);
    },
    removeModule(state, { payload }: PayloadAction<Module | number>) {
      const id = typeof payload === 'number' ? payload : payload.id;

      if (!id) return;

      const index = state.modules.findIndex((module) => module.id === id);

      if (index === -1) return;

      state.modules.splice(index, 1);
    },
  },
});

const { actions, reducer } = moduleSlice;
export const { setModules, addModule, updateModule, removeModule } = actions;

export const modulesSelector = (state: RootState) => state.module.modules;
export const moduleSelector = (id: string) => (state: RootState) =>
  state.module.modules.find((module) => module.id === id);

export default reducer;
