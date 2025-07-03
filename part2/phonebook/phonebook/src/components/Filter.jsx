import React from 'react'

const Filter = ({filterValue, setFilterValue}) => {
  return (
    <div>
       <div>
       filter shown with <input type='text' value={filterValue.content} onChange={(e)=>{
        e.preventDefault(),
        setFilterValue(()=>{return {set: true, content: e.target.value}})
       }} />
      </div>
      
    </div>
  )
}

export default Filter
