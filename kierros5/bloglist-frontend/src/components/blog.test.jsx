import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import React from 'react'; // Make sure to import React if you're using JSX

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
  };
  
  render(<Blog blog={blog} />);
  const element = screen.getByText('Component testing is done with react-testing-library');
  expect(element).toBeDefined();
});
