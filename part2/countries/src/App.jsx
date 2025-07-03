import { useEffect, useState } from 'react';
import country from './services/country.js';
import './App.css';
import View from './components/View.jsx';
import axios from 'axios';
import dotenv from "dotenv"
// dotenv.config({
//   path: './.env'
// })


function App() {
  
  const [selectedCountryWeatherData, setSelectedCountryWeatherData] = useState([])
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState([])

  
     useEffect(()=>{
      country
      .getAll()
      .then((response)=>{
        // console.log(response.data)
        setCountries(response.data)
      })
     }
     ,[])
    const weatherData = async (city) => {
      const data =await axios.get(`http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}`)
      setSelectedCountryWeatherData(data.data.current)
      console.log(selectedCountryWeatherData)
    }
  
    const filterResults = countries.filter((country) =>{
      const data = country.name.common.toLowerCase();
      // console.log(data)
      const searchValue = search.toLowerCase();
      // console.log(searchValue)
       return  data.includes(searchValue || "")

    });
console.log(selectedCountry)
console.log(selectedCountryWeatherData)
  return (
    <>
    
    <form >
      <label>find countries</label>
      <input  type="text" value={search} onChange={((e)=>{
        e.preventDefault()
        setSearch(e.target.value)
        
      })}/>
      
    </form>
    
        {
          search.length == 0 ? (<p>Enter the country name </p>) 
          :filterResults.length == 1 ? (
            <div>
              <h2>{filterResults[0].name.common}</h2>
              <p>capital {filterResults[0].capital}</p>
              <p>area {filterResults[0].area}</p>
              <p>languages:</p>
              <ul>
                {
                  Object.values(filterResults[0].languages).map((value,index)=>{
                    return <li key={index}>{value}</li>
                  }
                  )
                }
              </ul>
              <img src={filterResults[0].flags.png} alt={filterResults[0].flags.alt} height={150} width={150} ></img>
            </div>
            
          )
          :filterResults.length > 10 ? (<p>Too many matches, specify another filter</p>)
          :(
            selectedCountry.length === 0 ? (
              <ul>
              {
                filterResults.map((result,index)=>{
            
                  return <li key={index}>{result.name.common} 
                      <button onClick={()=>{setSelectedCountry(result);
                      weatherData(result.name.common);
                      }}>show</button>
                    </li>
                })
              }
            </ul>
            ):(null)
          )
       }
      {
        selectedCountry.length ===0 ? (null):(
        <div>
          <h2>{selectedCountry?.name?.common}</h2>
          <p>capital {selectedCountry.capital}</p>
          <p>area {selectedCountry.area}</p>
          <p><b>languages:</b></p>
          <ul>
              {
              Object.values(selectedCountry.languages).map((value,index)=>{
                  return <li key={index}>{value}</li>
              }
              )
              }
          </ul> 
           <img src={selectedCountry.flags.png} alt={selectedCountry.flags.alt} height={120} width={100} ></img>
           <h2>Weather in {selectedCountry.capital}</h2>
           <p>temperature {selectedCountryWeatherData.temp_c}</p>
           <img src={selectedCountryWeatherData.condition?.icon} alt={selectedCountryWeatherData.condition?.text} height={150} width={150}/>
           <p>wind {selectedCountryWeatherData.wind_mph}m/h</p>
        </div>
        
        )
      }
      
      </>
    
  );
}

export default App;
