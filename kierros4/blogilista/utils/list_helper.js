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
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }