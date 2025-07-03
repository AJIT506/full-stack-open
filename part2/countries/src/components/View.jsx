import React from 'react'

const View = ({index}) => {
  return (
    <div>
        <h2>{filterResults[index].name.common}</h2>
        <p>capital {filterResults[index].capital}</p>
        <p>area {filterResults[index].area}</p>
        <p>languages:</p>
        <ul>
            {
            Object.values(filterResults[index].languages).map((value,index)=>{
                return <li key={index}>{value}</li>
            }
            )
            }
        </ul>
        <img src={filterResults[index].flags.png} alt={filterResults[index].flags.alt} height={150} width={150} ></img>
    </div>
  )
}

export default View
