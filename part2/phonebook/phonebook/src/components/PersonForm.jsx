import React from 'react'

const PersonForm = ({newName, newNumber, setNewName, setNewNumber, addPersons}) => {
  return (
    <div>
        <form>
        <div>
          name: <input value={newName} onChange={(e)=>{
            e.preventDefault(),
            setNewName(e.target.value)
            }} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e)=>{
            e.preventDefault(),
            setNewNumber(e.target.value)
            }} />
        </div>
        <div>
          <button type="submit" onClick={addPersons}>add</button>
        </div>
      </form>
      
    </div>
  )
}

export default PersonForm
