import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const changeFilter = (event) => {
    event.preventDefault()
    setCountriesToShow(() => {
      return countries.filter((country) => {
        return country.name.common.toLowerCase().includes(filter.toLowerCase())
      })
    })
  }

  const handleFilterChange = (event) => {
    setFilter(() => {
      return event.target.value
    })
  }

  return (
    <div>
      <Filter changeFilter={changeFilter} filter={filter} handleFilterChange={handleFilterChange}/>
      <Countries countriesToShow={countriesToShow} />
    </div>
  )
}

export default App
