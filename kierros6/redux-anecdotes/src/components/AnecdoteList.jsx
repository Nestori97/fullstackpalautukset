import { voteAnecdote } from '../reducers/anecdoteReducer';
import { useSelector, useDispatch } from 'react-redux';
const anecdoteList = () => {
    const dispatch = useDispatch();
    const vote = (id) => {
        console.log('vote', id);
        dispatch(voteAnecdote(id));
      }
      const anecdotes = useSelector(state => {
        if ( state.filter === '' ) {
          return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      })
      return(
        <div>
    {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>)
}
export default anecdoteList