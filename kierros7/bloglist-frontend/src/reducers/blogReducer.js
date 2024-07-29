import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        createBlog(state, action) {
            state.push(action.payload)
            state.sort((a, b) => a.likes - b.likes)
        },
        setBlogs(state, action) {
            return action.payload.sort((a, b) => b.likes - a.likes)
        },
    },
})

export const { createBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export default blogSlice.reducer
