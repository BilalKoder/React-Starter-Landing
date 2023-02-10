import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    email: null,
    roles: null,
    timeJoined: null,
    metadata: null,
    isEmailVerified: null,
  },
};

export const dateSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.user = action.payload;
    },
    addUserId: (state, action) => {
      state.user.id = action.payload;
    },
  },
});

export const { addUserData, addUserId } = dateSlice.actions;

export default dateSlice.reducer;

export const getUserData = createDraftSafeSelector(
  (state) => state.user,
  (items) => {
    return items;
  }
);
