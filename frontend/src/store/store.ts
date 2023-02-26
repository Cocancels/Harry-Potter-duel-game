import { configureStore } from "@reduxjs/toolkit";
import { roomSlice } from "./ActualRoom/room";
import { userSlice } from "./User/userSlice";

export const store = configureStore({
  reducer: {
    User: userSlice.reducer,
    ActualRoom: roomSlice.reducer,
  },
});
