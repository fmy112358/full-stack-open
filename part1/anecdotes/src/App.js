import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [selected, setSelected] = useState(0)

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const handleVoteClick = () => {
    setPoints(previousPoints => {
      const copy = [...points]
      copy[selected]++
      return copy
    })
  }

  const handleNextClick = () => {
    setSelected(previousSelected => getRandomInt(0, anecdotes.length))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        has {points[selected]} votes
      </p>
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleNextClick} text="next anecdotes" />
      <h1>Anecdote with most votes</h1>
      <p>
        {anecdotes[points.indexOf(points.reduce((a, b) => Math.max(a, b), -Infinity))]}
      </p>
    </div>
  )
}

export default App