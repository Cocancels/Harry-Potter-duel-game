import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload);
    },

    updateUser: (state, action) => {
      return (state = action.payload);
    },

    removeUser: () => {
      return null;
    },
  },
});

export const { setUser, updateUser, removeUser } = userSlice.actions;
