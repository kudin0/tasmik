import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    announcement: {
        id: null,
        title: null,
        imgUrl: null,
        byName: null,
        date: null,
        details: null,
    },
};

export const announcementSlice = createSlice({
    name: "announcement",
    initialState,
    reducers: {
        setAnnouncement: (state, action) => {
            state.announcement = action.payload;
        },
    },
});

export const { setAnnouncement } = announcementSlice.actions;

export const selectAnnouncement = (state) => state.announcement.announcement;

export default announcementSlice.reducer;