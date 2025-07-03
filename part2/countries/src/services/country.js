import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = async () => {
  const request = await axios.get(`${baseUrl}/api/all`)
  //`${baseUrl}/${id}`
  // return request.then(response => response.data)
  console.log(request)
  console.log(request.data)
  return request
}

// const create = newObject => {
//   const request = axios.post(baseUrl, newObject)
//   return request.then(response => response.data)
// }

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject)
//   return request.then(response => response.data)
// }
// const deletePerson = (id) => {
//     const request = axios.delete(`${baseUrl}/${id}`)
//     return request.then(response => response.data)
// }    

export default { 
  getAll: getAll
//   create: create, 
//   update: update,
//   deletePerson: deletePerson
}