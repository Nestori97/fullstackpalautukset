import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdoteWithNotification } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const vote = async (anecdote) => {
    await anecdoteService.voteAnecdote(anecdote)
    dispatch(voteAnecdoteWithNotification(anecdote.id, anecdote.content, 5))
  }

  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
