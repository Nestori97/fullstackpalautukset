const Header = (props) => {
    console.log(props,"headeri")
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    )
  }
  const Content = (props) => {
    return(
      <div>
        {props.parts.map(part=>(
          <div key={part.id}>
          <Part {...part}> </Part>
        </div>
        )
        )}
      </div>
    )
  }
  const Part =(props) => {
    return (
      <p>{props.name} {props.exercises}</p>
    )
  }
  const Total = (props) => {
    const startvalue = 0
    const total = props.parts.reduce((accumulator, currentValue) => 
       accumulator + currentValue.exercises,startvalue
    )
  
    return (
      <div>
        <p>Number of exercises {total}</p>
      </div>
    );
  };
  
  const Course = (props) => {
    const { course } = props;
    return (
      <div>
        {course.map((course) => (
          <div key={course.id}>
            <Header {...course} />
            <Content {...course} />
            <Total parts={course.parts} />
          </div>
        ))}
      </div>
    );
  };
export {Course}