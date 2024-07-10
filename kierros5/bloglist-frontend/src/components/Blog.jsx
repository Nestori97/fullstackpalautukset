import { useState } from 'react';
const Blog = ({ blog, likeABlog }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const handlebutton = (event) =>{
    event.preventDefault();
    const updatedBlog =  {
      title:blog.title,
      author:blog.author,
      url:blog.url,
      likes: blog.likes + 1,
      id: blog.id,
      user: blog.user
    }
    likeABlog(
      updatedBlog
    )
    console.log(blog.user.name)
  }
  if(visible)
  {console.log(blog)
    return(
  
  <div>
    {blog.title} <button onClick={toggleVisibility}>hide</button> <br />{blog.author} <br /> {blog.url} <br /> likes {blog.likes} <button onClick={handlebutton}>like</button> <br /> {blog.user.name}
  </div>  
)}
else
return(
<div>
    {blog.title} <button onClick={toggleVisibility}>view</button>
    </div>  )
}
export default Blog