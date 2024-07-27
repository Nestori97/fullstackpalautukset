import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/requests'
import { useNotification } from '../NotificationContext'
const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notifyWith = useNotification()
  const newAnecdoteMutation =  useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notifyWith(`anecdote '${anecdote.content}' created`)
    },
    onError: () => {
      notifyWith('anecdote must be longer than 5 chars')
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content})    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
