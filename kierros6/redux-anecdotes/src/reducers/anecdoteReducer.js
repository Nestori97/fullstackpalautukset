// reducers/anecdoteReducer.js
import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer'

import anecdoteService from '../services/anecdotes'

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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

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
