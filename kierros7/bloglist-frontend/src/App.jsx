import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog as addBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
const App = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        console.log('when this is done there should be blogs')
        dispatch(initializeBlogs())
    }, [dispatch])

    const blogs = useSelector((state) => {
        console.log(state.blog, 'state.blog')
        return state.blog
    })
    const user = useSelector((state) => {
        return state.user
    })

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            dispatch(setUser(user))
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
            dispatch(showNotification(`Logged in as ${user.name}`, 5))
        } catch (exception) {
            dispatch(showNotification(`wrong credentials`, 5))
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogUser')
        dispatch(setUser(null))
    }

    const createBlog = async (newBlog) => {
        try {
            const addedBlog = await blogService.create(newBlog)
            dispatch(addBlog(addedBlog))
            dispatch(showNotification(`Created new blog ${newBlog.title}`, 5))
        } catch (exception) {
            dispatch(showNotification(exception.response.data.error, 5))
        }
    }

    const likeABlog = async (blog) => {
        try {
            const likedBlog = await blogService.like(blog)
            dispatch(initializeBlogs())
            dispatch(showNotification(`liked a blog ${blog.title}`, 5))
        } catch (exception) {
            dispatch(showNotification(exception.response.data.error, 5))
        }
    }

    const deleteABlog = async (blog) => {
        try {
            await blogService.deleteABlog(blog)
            dispatch(initializeBlogs())
            dispatch(showNotification(`deleted a blog ${blog.title}`, 5))
        } catch (exception) {
            dispatch(showNotification(exception.response.data.error, 5))
        }
    }

    if (user === null) {
        return (
            <div>
                <h1>
                    <Notification />
                </h1>
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h1>
                <Notification />
            </h1>
            <p>
                {user.name} logged in
                <button onClick={handleLogout}>Logout</button>
            </p>
            <h2>blogs</h2>
            <Togglable buttonLabel="new blog">
                <BlogForm createBlog={createBlog} />
            </Togglable>
            {blogs &&
                blogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        likeABlog={likeABlog}
                        deleteABlog={deleteABlog}
                    />
                ))}
        </div>
    )
}

export default App
