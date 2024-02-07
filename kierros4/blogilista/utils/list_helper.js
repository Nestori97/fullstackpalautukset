const dummy = (blogs) => {
    return 1
  }
  const totalLikes = (blogs) => {
    if(blogs.length === 0){
        return 0
    }
    else if (blogs.length === 1) 
    {   
        return blogs[0].likes
    }
    else(blogs.length>0)
    {  
        var intilialValue = blogs[0].likes
        return blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes,intilialValue)-intilialValue
    }
  }
  const favoriteBlog = (blogs) => {
    const getMostLikedBlog = (a,b) =>{
        var mostLikes =Math.max(a.likes, b.likes)
        if(mostLikes === a.likes){
            return a
        }
        else return b
    }
    if(blogs.length === 0){
        return []
    }
    var mostLiked=blogs.reduce(getMostLikedBlog)
    return mostLiked
  }
  const mostBlogs = (blogs) => {
    var authorWithMostBlogs = []
    for (let i = 0; i < blogs.length; i++) {
        const author = blogs[i].author
        const filteredBlogs = blogs.filter(blogs => blogs.author === author)
        if(filteredBlogs.length>authorWithMostBlogs.length){
            authorWithMostBlogs=filteredBlogs
        }
      }
      if(authorWithMostBlogs.length>0){
        return {
            author: authorWithMostBlogs[0].author,
            blogs:authorWithMostBlogs.length
        }
      } 
      return authorWithMostBlogs
  }
  const mostLikes = (blogs) => {
    var authorWithMostLikes = {
        author:"",
        likes: Number.NEGATIVE_INFINITY
    }
    for (let i = 0; i < blogs.length; i++) {
        const author = blogs[i].author
        const filteredBlogs = blogs.filter(blogs => blogs.author === author)
        var sumOfLikes = 0
        filteredBlogs.forEach(blog => {
            sumOfLikes = sumOfLikes + blog.likes
        });
        if(sumOfLikes>=authorWithMostLikes.likes){
            authorWithMostLikes.author=filteredBlogs[0].author
            authorWithMostLikes.likes=sumOfLikes
        }
    }
    if(authorWithMostLikes.author.length>0){
        return authorWithMostLikes
    }
    return []
}
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }