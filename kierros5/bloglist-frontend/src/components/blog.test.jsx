import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import React from 'react'
import userEvent from '@testing-library/user-event'
test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
  }

  render(<Blog blog={blog} />)
  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})
test('view button works correctly', async () => {
  const blog = {
    title: 'behind this title is likes, author, url',
    url: 'www.aalto.fi',
    likes: 1,
    author: 'pekka jämsä',
    user: 'sanna marin',
  }
  render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const url = screen.getByText((content, element) => element.tagName.toLowerCase() === 'div' && content.includes('www.aalto.fi'))
  const likes = screen.getByText((content, element) => element.tagName.toLowerCase() === 'div' && content.includes('1'))
  const userr = screen.getByText((content, element) => element.tagName.toLowerCase() === 'div' && content.includes('pekka jämsä'))

  // Assertions
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(userr).toBeDefined()
})
test('pressing like twice means that the function that is responsible for likes is called excatly twice', async () => {
  const blog = {
    title: 'behind this title is likes, author, url',
    url: 'www.aalto.fi',
    likes: 1,
    author: 'pekka jämsä',
    user: 'sanna marin',
  }
  const mockHandler = vi.fn()
  render(<Blog blog={blog} likeABlog={mockHandler} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const likebutton = screen.getByText('like')
  await user.click(likebutton)
  expect(mockHandler.mock.calls).toHaveLength(1)
  await user.click(likebutton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})