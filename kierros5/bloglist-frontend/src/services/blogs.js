import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const setToken = newToken => {  token = `Bearer ${newToken}`}
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const like = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(baseUrl + '/' + blog.id, blog, config)
  return response.data
}
const deleteABlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default { getAll, setToken,create, like, deleteABlog  }