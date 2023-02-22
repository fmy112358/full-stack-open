const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      {personsToShow.map((person) => {
        return <p key={person.name}>{person.name} {person.number} <button onClick={(event) => {deletePerson(event,person.id)}}>delete</button></p>
      })}
    </div>
  )
}

export default Persons