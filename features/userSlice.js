import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        uid: null,
        name: null,
        matric: null,
        dob: null,
        gender: null,
        year: null,
        course: null,
        nationality: null,
        type: null,
        classroom: null,
        picture: null,
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;