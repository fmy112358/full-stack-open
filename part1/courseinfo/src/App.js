const Header = (props) => {
  console.log(props)
  console.log(props.course.name)
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  const ret = props.course.parts.map((part) =>
    <div key={part.name}>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
  return ret
}

const Total = (props) => {
  let total = 0;
  for (let i = 0; i < props.course.parts.length; i++) {
    total += props.course.parts[i].exercises;
  }
  return (
    <div>
      <p>
        Number of exercises {total}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App