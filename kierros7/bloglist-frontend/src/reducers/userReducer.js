import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        clearNotification() {
            return ''
        },
    },
})
export const { setUser, clearNotification } = userSlice.actions

export default userSlice.reducer
