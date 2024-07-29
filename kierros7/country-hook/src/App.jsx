import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Custom hook for managing form field
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// Custom hook for fetching country data
const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => {
          if (response.data) {
            setCountry({ found: true, data: response.data})
            console.log(response.data,"in here")
            console.log(country,"and here")
          } else {
            setCountry({ found: false })
            console.log(response)
          }
        })
        .catch(() => {
          setCountry({ found: false })
        })
    }
  }, [name])

  return country
}

// Component for displaying country details
const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      {console.log(country,"ahere is what is rendered")}
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name.common}`}/>  
    </div>
  )
}

// Main application component
const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
