import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasmik: {
        id: null,
        title: null,
        date: null,
        time: null,
        place: null,
        details: null,
        attendance: null,
        aspect1: null,
        aspect2: null,
        aspect3: null,
    },
};

export const tasmikSlice = createSlice({
    name: "tasmik",
    initialState,
    reducers: {
        setTasmik: (state, action) => {
            state.tasmik = action.payload;
        },
    },
});

export const { setTasmik } = tasmikSlice.actions;

export const selectTasmik = (state) => state.tasmik.tasmik;

export default tasmikSlice.reducer;