const Languages = ({ languages }) => {
  const arr = []
  for (const key in languages) {
    arr.push(languages[key]);
  }
  return (
    <ul>
      {arr.map((language) => {
        return <li key={language}>{language}</li>
      })}
    </ul>
  )
}

export default Languages