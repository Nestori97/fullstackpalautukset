import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
test('blogform calls correct props when blog is created', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()
  render(<BlogForm createBlog={createBlog} />)
  screen.debug()
  const createButton = screen.getByText('create')
  const titleInput = screen.getByPlaceholderText('write Title here')
  const authorInput = screen.getByPlaceholderText('write Author here')
  const urlInput = screen.getByPlaceholderText('write URL here')
  await user.type(titleInput, 'testin title')
  await user.type(authorInput, 'testin author')
  await user.type(urlInput, 'testin url')
  await user.click(createButton)
  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testin title')
  expect(createBlog.mock.calls[0][0].author).toBe('testin author')
  expect(createBlog.mock.calls[0][0].url).toBe('testin url')
})