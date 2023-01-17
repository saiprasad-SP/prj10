import React from 'react'
import { useState,useRef } from 'react'
import './UI.scss'
import {FaSortDown,FaSortUp} from 'react-icons/fa'
import {SlRefresh} from 'react-icons/sl'
import {GrFormSearch,GrFormClose} from 'react-icons/gr'


const Search=(props)=>{
    return(
        <div className='search-boxes'>
            <label><input type='checkbox' />Select All </label>
            <hr/>
            <label><input type='checkbox' />ReferenceID </label>
            <label><input type='checkbox' />UserName </label>
            <label><input type='checkbox' />OperationName </label>
            <label><input type='checkbox' />Direction </label>
            <label><input type='checkbox' />FromServer </label>
            <label><input type='checkbox' />EventTimestamp </label>
            <label><input type='checkbox' />Status </label>
            <label><input type='checkbox' />LogMessage </label>
        </div>
    )
}
export default function UI(props) {
    const[shown ,isShown] =useState(false)
    const ref = useRef(null)
    // const [search,setSearch]=useState()
    const handleCollapse=()=>{
        alert("Collapse has been clicked")
    }
    const handleReset=()=>{
        window.location.reload()
    }
    const handleSearch=(e)=>{
        isShown(!shown)
    }
    const handleClose=()=>{
        ref.current.value = ''
        props.searchInput =0
    }
  return (
    <div className='ui-content'>
        <button>Total Logs Count {props.length}</button>
        <button onClick={handleCollapse}>Collapse All</button>
        <button onClick={handleReset}><SlRefresh/>Reset Logs</button>
        <label>
            <button onClick={handleSearch}>Search{shown?<FaSortUp/>:<FaSortDown/>}</button>
            <input type='text' onChange={(e)=>props.searchItems(e.target.value)} ref={ref}/>
        </label>
        <GrFormClose className='activity-icons' onClick={handleClose}/>
        <GrFormSearch className='activity-icons'/>
        {shown ? <Search/>:null}
    </div>
  )
}
