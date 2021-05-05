import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    accesstoken: null,
    refreshtoken: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userSet(state,action) {
            state.accesstoken = action.payload
        }
    }
})

export const {userSet} = userSlice.actions;
export const selectUser  = (state) => state.user;
export default userSlice.reducer;