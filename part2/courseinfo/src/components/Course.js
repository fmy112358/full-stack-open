import React from 'react'

const Course = ({ course }) => {
  const { name, parts } = course
  const total = parts.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.exercises
  }, 0)
  return (
    <div>
      <h2>{name}</h2>
      {parts.map((part) =>
        <div key={part.id}>
          <p>
            {part.name} {part.exercises}
          </p>
        </div>
      )}
      <h3>
        total of {total} exercises
      </h3>
    </div>
  )
}

export default Course