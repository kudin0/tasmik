import { configureStore } from "@reduxjs/toolkit";
import announcementReducer from "./features/announcementSlice";
import tasmikReducer from "./features/tasmikSlice";

export const store = configureStore({
  reducer: {
    announcement: announcementReducer,
    tasmik: tasmikReducer,
  },
});
