// reducers/anecdoteReducer.js
import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = asObject(action.payload)
      state.push(newAnecdote)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(n => n.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      ).sort((anecdote1,anecdote2) =>anecdote2.votes-anecdote1.votes );
    },
    appendAnecdote(state, action) {
            state.push(action.payload)
              },
    setAnecdotes(state, action) {
        return action.payload 
    }
  }
})

export const { createAnecdote, voteAnecdote, appendAnecdote,setAnecdotes } = anecdoteSlice.actions

export const createAnecdoteWithNotification = (content, seconds) => {
  return async dispatch => {
    dispatch(createAnecdote(content))
    dispatch(showNotification(`Anecdote '${content}' created!`, seconds))
  }
}

export const voteAnecdoteWithNotification = (id, content, seconds) => {
  return async dispatch => {
    dispatch(voteAnecdote(id))
    dispatch(showNotification(`You voted '${content}'`, seconds))
  }
}

export default anecdoteSlice.reducer
