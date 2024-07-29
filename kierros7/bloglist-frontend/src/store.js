import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blog: blogReducer,
    },
})
export default store
