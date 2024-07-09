import { useState } from 'react';
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  if(visible)
  {return(
  
  <div>
    {blog.title} <button onClick={toggleVisibility}>hide</button> <br />{blog.author} <br />likes {blog.likes}
  </div>  
)}
else
return(
<div>
    {blog.title} <button onClick={toggleVisibility}>view</button>
    </div>  )
}
export default Blog