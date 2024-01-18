import { useState, useEffect } from 'react'
import personServices from './services/persons'

const ShowNumbers = (props) =>{
  console.log(props.persons)
  console.log("props",props)
  const filteredArray = props.persons.filter(person=> person.name.toLowerCase().includes(props.filter.toLowerCase()))
  console.log("filteredArray",filteredArray)
  return(
    <div>
      {filteredArray.map(person =>
      <li key={person.name}>
        {person.name}  {person.number}
        <button onClick={() =>{
        if (window.confirm()){
            props.removePerson(person.id)
        }
        }
          }>
        Delete user</button>
        </li>)}
    </div>
  )
}
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}
const Errornotification =({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}
const PersonForm = (props) => {
  return(
  <form onSubmit={props.addPerson}>
  <div>
    name: 
    <input
    value={props.newName}
    onChange={props.handleNewName}
    />
  <div>number: 
    <input
    value={props.newNumber}
    onChange = {props.handleNewNumber} 
    />
  </div>
    <button type="submit">add</button>
  </div>
</form>)
}
const Filtteri = (props) => {
  return(
    <div>
  <p>filter with name to show numbers</p>
  <input
    value={props.newFilter}
    onChange = {props.handleNewFilter} 
  />
  </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [updateMessage, setUpdateMessage] = useState(null)
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }
  useEffect(() => {
    personServices.getPersons()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if(persons.map(person => person.name).includes(personObject.name) === true){
      if(window.confirm("Name: " + personObject.name + " already added to the phonebook, replace the old number with the new one?")){
        const samePerson = persons.find(person => person.name === personObject.name);
        const id = samePerson.id
        personServices.changeNumber(id,personObject)
        .then(response => {
          personServices.getPersons()
          .then(response => {
            setPersons(response.data)
            setUpdateMessage(`person with id '${id}'  phone number was successfully updated `)
            setTimeout(() => {
              setUpdateMessage(null)
        }, 5000)
          })}).catch(error => {
            setErrorMessage(`person with id '${id}' was already removed from the database`)
            setTimeout(() => {
            setErrorMessage(null)
            }, 5000)
          })
      }
    
  }
    else{
      personServices.postPersons(personObject)
      .then(response => {
       setPersons(persons.concat(response.data))
       setUpdateMessage(`person with name '${personObject.name}' was successfully added `)
       setTimeout(() => {
        setUpdateMessage(null)
       }, 5000)
      })
       setNewName('')
  }
  }
  const removePerson = (id) => {
    personServices.removeUser(id)
    .then(response => {
      personServices.getPersons()
      .then(response => {
        setPersons(response.data)
        setUpdateMessage(`person with id '${id}' was successfully removed `)
        setTimeout(() => {
        setUpdateMessage(null)
        }, 5000)
      })
    }).catch(error => {
      setErrorMessage(`person with id '${id}' was already removed from the `)
      setTimeout(() => {
      setErrorMessage(null)
      }, 5000)
    })
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={updateMessage} />
      <Errornotification message={errorMessage}/>
      <Filtteri newFilter= {newFilter} handleNewFilter= {handleNewFilter}/>
      <h3>add a new</h3>
      <PersonForm addPerson= {addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} useEffect={useEffect} />
      <h2>Numbers</h2>
      <ShowNumbers persons = {persons} filter = {newFilter} removePerson={removePerson}></ShowNumbers>
    </div>
  )

}
/*
.catch(error => {
        setErrorMessage(`Note '${id}' was already removed from server`)
        setTimeout(() => {
        setErrorMessage(null)
        }, 5000)
      })
*/
export default App
