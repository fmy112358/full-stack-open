import Country from "./Country";
import Button from "./Button";

const Countries = ({ countriesToShow }) => {
  if (countriesToShow.length === 1) {
    return <Country country={countriesToShow[0]}/>
  } 
  else if (countriesToShow.length <= 10) {
    return (
      <div>
      {countriesToShow.map((country) => (
        <div key={country.name.common}>{country.name.common}<Button country={country}/></div>
      ))}
    </div>
    )
  }
  else {
    return <p>Too much matches, specify another filter</p>
  } 
}

export default Countries;