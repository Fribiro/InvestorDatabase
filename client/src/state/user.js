import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    accesstoken: null,
    refreshtoken: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    accesstoken(state, action) {
      state.accesstoken = action.payload;
    },
    refreshtoken(state, action) {
      state.refreshtoken = action.payload;
    },
  },
});

export const { accesstoken, refreshtoken } = userSlice.actions;
export const selectUser  = (state) => state.user;
export default userSlice.reducer;