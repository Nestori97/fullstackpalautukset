import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)


export const createAnecdote = newNote =>
  axios.post(baseUrl, newNote).then(res => res.data)
export const voteAnecdote = newNote =>{
    console.log(newNote)
    axios.put(`${baseUrl}/${newNote.anecdote.id}`, {content:newNote.anecdote.content, id: newNote.anecdote.id,votes: newNote.anecdote.votes + 1}).then(res => res.data)}