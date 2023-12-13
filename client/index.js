
const getData=()=>{
     fetch ("http://localhost:4000/users")
     .then(res=>res.json())
     .then(data=>console.log(data))
    
}

getData()