import { configureStore } from "@reduxjs/toolkit";
import announcementReducer from "./features/announcementSlice";

export const store = configureStore({
  reducer: {
    announcement: announcementReducer,
  },
});
