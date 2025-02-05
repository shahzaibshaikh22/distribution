import { createSlice } from '@reduxjs/toolkit';

const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    modes:"light",
    sideBarCollapes:'show'
  },
  reducers: {
    setMode:(state)=>{
      state.modes = state.modes === "light" ? "dark" : "light";
    },
    setSideCollapes:(state)=>{
      state.sideBarCollapes = state.sideBarCollapes === "show" ? "hide" : "show";
    },
  },
});

export const { setMode,setSideCollapes } = modeSlice.actions;
export default modeSlice.reducer