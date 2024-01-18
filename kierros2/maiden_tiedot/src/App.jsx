import { useState, useEffect } from 'react'
import axios from 'axios'
const Button = (props) => {
  console.log("props",props.handleClick)
  return(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)}

const ShowCountries =(props) => {
  console.log(props.matchingCountries.map(country=>country.name.common))
  console.log("props",props)
  return (props.matchingCountries.map(country=>
    <li key={country.name.common}>
      {country.name.common}
      <Button handleClick={()=>props.handleNewFilterFromInput(country.name.common)} text="show this country"  />
    </li>)
  )
}
const ShowOneCountry = (props) => {
  const firsttry = (Array.from(props.matchingCountries.map(country=>country.languages)))
  const fuckingfinally = firsttry[0]
  console.log((Object.keys(fuckingfinally)))
  console.log( props.matchingCountries[0].flags.png)
  const lippu = (props.matchingCountries[0].flags.png)
  return(
    <div>
     <h2>{ props.matchingCountries.map(country=>country.name.common)}</h2>
     capital: { props.matchingCountries.map(country=>country.capital)}
     <br></br>
     area: { props.matchingCountries.map(country=>country.area)}
     <h3>languages</h3>
     { Object.values(fuckingfinally).map(name=>
    <li key={name}>
      {name}
    </li>)}
    <img src = {lippu}></img>
    </div>
    
  )
}
const FilteredCountries = (props)=>{
  let text 
  text = "no matches"
  const size = props.matchingCountries.length
  if(size>=10){
    text = "too many matches, be more spesific"
  }
  if(size<10 && size >1){
    text = "these are the countries that match"
    return(
      <div>
        { text }
        <ShowCountries matchingCountries= {props.matchingCountries} handleNewFilterFromInput= {props.handleNewFilterFromInput} />
      </div>
    )
  }
  if(size === 1) {
    text = "found one country that matches"
    return(
      <div>
        { text }
        <ShowOneCountry matchingCountries= {props.matchingCountries}/>
      </div>
    )
  }
  return(
    <div>
      { text }
    </div>
  )
}
const Filtteri = (props) => {
  return(
    <div>
  <p>filter with countrys common name</p>
  <input
    value={props.newFilter}
    onChange = {
      props.handleNewFilter
    } 
  />
  </div>
  )
}
const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('fin')
  const [matchingCountries,setmatchingCountries] = useState([])
  const handleNewFilter = (event) => {
    setNewFilter(event.target.value);
  };
  const handleNewFilterFromInput = (input) =>{
    setNewFilter(input);
  }
  useEffect(() => {
    findCountries();
  }, [newFilter, countries]);

  const handleMatchingCountries=(filteredArray)=>{
    setmatchingCountries(filteredArray)
  }
  const findCountries=()=> {
    const filteredArray = countries.filter(country=> country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
    handleMatchingCountries(filteredArray)
  }
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  

  return (
    <div>
      <h1>Find countries</h1>
      <Filtteri newFilter= {newFilter} handleNewFilter= {handleNewFilter} />
      <FilteredCountries countries = {countries} matchingCountries = {matchingCountries} handleNewFilterFromInput={handleNewFilterFromInput}/>
    </div>
  )
}

export default App
