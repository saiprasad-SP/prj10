import {useState} from 'react'
import './App.css';
import {data} from './Users'
function SearchSort() {
  const[users,setUsers]=useState(data)
  const[sorted,setsorted]=useState({sorted:"id",reversed:false});
  const[searchPhrase,setSearchPhrase]=useState("");
  const sortById=()=>{
    setsorted({sorted:"id",reversed:!sorted.reversed})
    const userCopy=[...users];
    userCopy.sort((userA,userB)=>{
      if(sorted.reversed){
        return userB.id-userA.id
      }
      return userA.id-userB.id
    })

    setUsers(userCopy);
  }
  // 
  const search=(event)=>{
    const matcedhUser=data.filter((user)=>{
      return user.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setUsers(matcedhUser)
    setSearchPhrase(event.target.value)
  }
  // 
  const renderUser=()=>{
    return users.map((user)=>{
      return(
        <tr>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.website}</td>
        </tr>
      )
    })
  }
  return (
    <div className="App">
      <div>
        <input onChange={search} value={searchPhrase}/>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={sortById}>id</th>
              <th>name</th>
              <th>email</th>
              <th>gender</th>
            </tr>
          </thead>
          <tbody>{renderUser()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchSort;
