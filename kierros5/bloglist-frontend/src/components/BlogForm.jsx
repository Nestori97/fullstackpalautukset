import { useState } from 'react'
const BlogForm = ({ 
    handleSubmit,
    title,
    handleTitleChange,
    author,
    handleAuthorChange,
    url,
    handleUrlChange
 }) => {
    return (
        <div><h3>Create New</h3>
        <form onSubmit={handleSubmit}>
            <div>
                title:
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={handleTitleChange} 
                    />
            </div>
            <div>
                author:
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={handleAuthorChange}
                     />
            </div>
            <div>
                url:
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={handleUrlChange} 
                    />
            </div>
            <button type="submit">create</button>
        </form>
        </div>
    )
}

export default BlogForm