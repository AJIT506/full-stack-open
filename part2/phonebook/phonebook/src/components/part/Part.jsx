import React from 'react'

const Part = ({part}) => {
    // console.log(name)
  return (
    <>
        <div>
          {part.name} {part.exercises}
        </div>
    </>
   
  )
}

export default Part
