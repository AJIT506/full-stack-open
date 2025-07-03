import React from 'react'
import phonebook from '../services/phonebook'

const Persons = ({ persons, setPersons, filterResults, filterValue }) => {
  // const deletePerson = (id) => {
  //   phonebook
  //   .deletePerson(id)
  //   .then(response =>
  //     console.log(response)
  //   )}
  return (
    <div>
        {
        filterValue.set ? 
          filterResults.map((person, index) => <p key={index}>{person.name} {person.number}</p>)
         : 
        persons.map((person, index) => {
          return (
            <div key={person.id}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px' 
            }}>
              <p>{person.name} {person.number}</p>
              <button onClick={() => {
                  if (window.confirm(`Delete ${person.name}?`)) {
                  phonebook
                  .deletePerson(person.id)
                  .then(() => {
                  setPersons(persons.filter(p => p.id !== person.id))
                  })
                  .catch(error => {
                  console.error('Error deleting person:', error)
                 alert(`Failed to delete ${person.name}`)
                })
             }
              }}>Delete</button>
            </div>
          
        )
          
        }
        
      )
      }
      
    </div>
  )
}

export default Persons
