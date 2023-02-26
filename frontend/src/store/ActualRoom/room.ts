import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: null,
  reducers: {
    setRoom: (state, action) => {
      return (state = action.payload);
    },

    updateRoom: (state, action) => {
      return (state = action.payload);
    },

    removeRoom: () => {
      return null;
    },
  },
});

export const { setRoom, updateRoom, removeRoom } = roomSlice.actions;
