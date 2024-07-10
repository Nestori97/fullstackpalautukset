import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs.sort((a, b) => a.likes - b.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
      setErrorMessage(`Logged in as ${user.name}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser');
    setUser(null);
  };

  const createBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(addedBlog).sort((a, b) => a.likes - b.likes));
      setErrorMessage(`Created new blog ${newBlog.title}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage(exception.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const likeABlog = async (blog) => {
    try {
      const likedBlog = await blogService.like(blog);
      const updatedBlog = { ...likedBlog, user: blog.user };
      setBlogs(blogs.map(b => b.id !== likedBlog.id ? b : updatedBlog).sort((a, b) => a.likes - b.likes));
      setErrorMessage(`liked a blog ${blog.title}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }catch (exception) {
      setErrorMessage(exception.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }
  const deleteABlog = async (blog) => {
    try {
      const likedBlog = await blogService.deleteABlog(blog);
      setBlogs(blogs.filter(b => b.id !== blog.id).sort((a, b) => a.likes - b.likes));
      setErrorMessage(`deleted a blog ${blog.title}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }catch (exception) {
      setErrorMessage(exception.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>
          <Notification message={errorMessage} />
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
    );
  }

  return (
    <div>
      <h1>
        <Notification message={errorMessage} />
      </h1>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      <h2>blogs</h2>
      <Togglable buttonLabel="new blog">
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog => (
        <Blog key = {blog.id} blog={blog} likeABlog={likeABlog} deleteABlog={deleteABlog}  />
      ))}
    </div>
  );
};

export default App;
