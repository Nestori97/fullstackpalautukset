import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
      username, password,})
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
        ) 
      setUsername("")
      setPassword("")
      setErrorMessage(`logged in as ${user.name}` )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }
  const handleLogout = async (event) =>{
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }
  const handleNewBlog = async (event) =>{
    event.preventDefault()
    try {
    const newblog = {
      title:title,
      author:author,
      url:url,
    }
    const addedblog=await blogService.create(newblog)
    setBlogs(blogs.concat(addedblog))
    setErrorMessage(`created new blog ${title}` )
    setTitle("")
    setAuthor("")
    setUrl("")
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  } catch(exception){
    setErrorMessage(exception.response.data.error)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  }
  if(user === null){
    return(
      <div>
        <h1>
          <Notification message={errorMessage} />
        </h1>
         <h2>Log in to application</h2>
         <form onSubmit={handleLogin}>
          <div>
            username
            <input
            type = "text"
            value = {username}
            name = "Username"
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
      <Notification message={errorMessage} />
      </h1>
      <p>{user.name} logged in
      <button onClick= {handleLogout}> Logout
      </button>
      </p>
      <h2>blogs</h2>
      <div>
        <h3>Create New</h3>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
          type = "text"
          value = {title}
          name = "Title"
          onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
          type = "text"
          value = {author}
          name = "Author"
          onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
          type = "text"
          value = {url}
          name = "Url"
          onChange={({ target }) => setUrl(target.value)}
          />
        </div>
      <button type="submit">create</button>
      </form>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App