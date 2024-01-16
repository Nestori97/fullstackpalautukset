import * as Course from './components/Course.jsx'
const App = () => {
  const course = [{
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  },{
  name: 'sa',
  id: 2,
  parts: [
    {
      name: 'testi',
      exercises: 1,
      id: 1
    },
    {
      name: 'seuraava',
      exercises: 0,
      id: 2
    },
    {
      name: 'vika',
      exercises: 0,
      id: 3
    }
  ]
}]

  return (
    <div>
      <Course.Course course={course} />
    </div>
  )
}

export default App