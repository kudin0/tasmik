import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasmik: {
        id: null,
        title: null,
        date: null,
        marks1: null,
        marks2: null,
        marks3: null,
        aspect1: null,
        aspect2: null,
        aspect3: null,
    },
};

export const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        setReport: (state, action) => {
            state.tasmik = action.payload;
        },
    },
});

export const { setReport } = reportSlice.actions;

export const selectReport = (state) => state.report.tasmik;

export default reportSlice.reducer;