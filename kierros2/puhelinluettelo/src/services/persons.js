import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'
const getPersons = () =>{
    return axios.get(baseUrl)
}
const postPersons = (personObject) => {
    return axios.post(baseUrl, personObject)
}
const removeUser = (id) => {
     return axios.delete(`${baseUrl}/${id}`)
}
const changeNumber = (id,person)=>{
    return axios.put(`${baseUrl}/${id}`,person)
}
export default {getPersons,postPersons,removeUser,changeNumber}