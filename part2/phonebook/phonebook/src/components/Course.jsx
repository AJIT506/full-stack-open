import React from 'react'
import Header  from "./Header.jsx"
import Content from './Content.jsx'
import Total from './Total.jsx'
const Course = ({course}) => {
    console.log(course)
  return (
    <>
      <div>
        <Header Header = {course.name}/>
      </div>

      <div>
        <Content parts = {course.parts}/>
      </div>

      <div>
        <Total parts = {course.parts}/>
      </div>
      
    </>
    
  )
}

export default Course
