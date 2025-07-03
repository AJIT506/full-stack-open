
import Part from "./part/Part.jsx"
const Content = ({parts}) => {
  // console.log(parts)
  // console.log(parts[0])
  return (
    <>
    {
        parts.map((part)=> {
        console.log(part)
        return<div key={part.id}>
          <Part part={part} />
        </div> 
          
        })
      }
    
    </>
  )
}
export default Content