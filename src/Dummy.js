import React, { useState,useEffect } from 'react'
import './App.scss'
import axios from 'axios'
export default function Dummy() {
    const [list,setList]=useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    useEffect(()=>{ 
        axios.get("http://localhost:9000/logsAPI/").then((response)=>{
            setList(response.data)
            console.log(response.data);
        })
    },[])
    const handleHour=(e)=>{
        const timeParam1 = e.target.value
        axios.post("http://localhost:9000/logsAPI/customTimeRange",{timeParam1})
        .then(response=>setList(response.data))
    }
    const searchItems=(searchValue)=>{
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = list.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(list)
        }
    }
    const searched_data = filteredResults.map((item,i)=>(
        <tr>
        <td>{i+1}</td>
        <td>{item.EventTimestamp}</td>
        <td>{item.FullQualifiedName}</td>
        <td>{item.UserName}</td>
        <td>{item.OperationName}</td>
        <td>{item.MessageID}</td>
        <td>{item.CorrelationIDContent}</td>
        <td>{item.Direction}</td>
        <td>{item.FromServer}</td>
        <td>{item.ToServer}</td>
        </tr>
    ))
    const table_data = list.map((item,i)=>(
        <tr key={i}>
        <td>{i+1}</td>
        <td>{item.EventTimestamp}</td>
        <td>{item.FullQualifiedName}</td>
        <td>{item.UserName}</td>
        <td>{item.OperationName}</td>
        <td>{item.MessageID}</td>
        <td>{item.CorrelationIDContent}</td>
        <td>{item.Direction}</td>
        <td>{item.FromServer}</td>
        <td>{item.ToServer}</td>
        </tr>
    ))    
  return (
    <div>
        <div>
            <button value={1} onClick={handleHour}>1hr</button>
            <button value={2} onClick={handleHour}>2hr</button>
            <button value={3} onClick={handleHour}>3hr</button>
            <button value={12} onClick={handleHour}>12hr</button>
            <input type="text" placeholder='search' onChange={(e)=>searchItems(e.target.value)}/>
        </div>
       <table className="table table-striped">
            <thead>
                <tr>
                <th>srNo</th>
                <th>EventTimestamp</th>
                <th>FullQualifiedName</th>
                <th>UserName</th>
                <th>OperationName</th>
                <th>MessageID</th>
                <th>CorrelationIDContent</th>
                <th>Direction</th>
                <th>FromServer</th>
                <th>ToServer</th>  
                </tr>
            </thead>
            <tbody>{searchInput.length >1 ? searched_data : table_data}</tbody>
        </table> 
        <button>kick</button>
    </div>
  )
}
