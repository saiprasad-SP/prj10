import React, { useEffect, useState } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "./App.scss"
import logo from './Addons/ally-logo.png'
import axios from "axios";
import UI from './UI'
import {DateRangePicker}  from 'react-date-range'
import { format } from 'date-fns'
import { addDays } from 'date-fns'
import {GrRefresh} from 'react-icons/gr'
import {BsFillCalendarCheckFill} from 'react-icons/bs'


const refresh=()=>{
    window.location.reload()
}
export default function DisplayLogTraceJson(prop){
    const[list,setList]=useState([])
    const [loading,setLoading] = useState(true)
    const [showing,setShowing] = useState(true)
    const [isShown, setIsShown] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 0),
          key: 'selection'
        }
      ]);
    const handleClick = () => {
        setIsShown(!isShown);
    };
    const handlrHour=(e)=>{
        let timeParam1 = e.target.value
        axios.post("http://localhost:9000/logsAPI/customTimeRange",{timeParam1})
        .then((response) => setList(response.data))
          .catch(err => {
            console.error(err);
          });
    }
    const len=list.length
    const data = list
    useEffect(()=>{
        axios.get("http://localhost:9000/logsAPI/").then((response)=>{setList(response.data)},
        setLoading(false))
    },[])
    if(loading){
        return(
            <div>Loading ......</div>
        )
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
    const handleDate=(e)=>{
        let starting = state[0].startDate
        let ending = state[0].endDate
        let param1 = format(starting, 'yyyy-MM-dd')
        let param2 = format(ending, 'yyyy-MM-dd')
        console.log(`passed Start date is ==>${param1}`)
        console.log(`passed end date is ==>${param2}`)
        axios
          .post('http://localhost:9000/logsAPI/customDateRange', {param1,param2})
          .then((response) => {setList(response.data)},
          console.log(data))
          .catch(err => {
            console.error(err);
          });
    }
    const closeCalndr=(e)=>{
        
    }
    return(
        <div>
            <div className="container">
                <img src={logo} alt="not-found" className="logo"/>
                <div className="searchSort">
                    <section>
                        select File:<input type="file"/><br/>
                        <button>upload</button>
                        <button>Reset</button>
                    </section>
                    <div>
                        <div className='calndr'>
                            <button className='hr-btn' onClick={handlrHour} value={1}>1hr</button>
                            <button className='hr-btn' onClick={handlrHour} value={3}>3hr</button>
                            <button className='hr-btn' onClick={handlrHour} value={4}>4hr</button>
                            <button className='hr-btn' onClick={handlrHour} value={5}>5hr</button>
                            <button className='hr-btn' onClick={handlrHour} value={6}>6hr</button>
                            <button className='hr-btn' onClick={handleClick}><BsFillCalendarCheckFill/></button>
                            <button className='hr-btn' onClick={refresh}><GrRefresh style={{height:'2vh'}} /></button>
                        </div>
                        {isShown && 
                            <div className='calndr-section'>
                                <DateRangePicker
                                    onChange={item => setState([item.selection])}
                                    showSelectionPreview={true}
                                    moveRangeOnFirstSelection={false}
                                    maxDate={addDays(new Date(),0)}
                                    // months={2}
                                    ranges={state}
                                    direction="horizontal"
                                    preventSnapRefocus={true}
                                    // calendarFocus="backwards"
                                    dateDisplayFormat="yyyy-MM-dd"
                                    fixedHeight={false}
                                    className="calender-edit"
                                    />;
                                <section className='btn-section'>
                                    <button >Clear</button>
                                    <div>
                                        <button onClick={closeCalndr} className="cncl-btn">Cancel</button>
                                        <button  onClick={handleDate} className="apply-btn">Apply</button>
                                    </div>
                                </section>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="partition">
                <h5>Flow trace</h5>
                <p onClick={()=>setShowing(!showing)}>{showing ?<img src="https://img.icons8.com/ios-glyphs/344/sort-up.png" alt="not-found" className="sort-up"/> : <img src="https://img.icons8.com/ios-glyphs/512/sort-down.png" alt="not-found" className="sort-up" />}</p>
            </div>
            <div className="table-data">
                {showing ?
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            <th>srNo</th>
                            <th>EventTimestamp</th>
                            <th>ReferenceId</th>
                            <th>UserName</th>
                            <th>OperationName</th>
                            <th>MessageID</th>
                            <th>CorrelationIDContent</th>
                            <th>Direction</th>
                            <th>FromServer</th>
                            <th>ToServer</th>  
                            </tr>
                        </thead>
                        <tbody>{searchInput.length > 1 ? searched_data : table_data }</tbody>
                    </table> : null
                }
            </div>
            <div>
                <UI length={len} data={data} searchItems={searchItems} searchInput={searchInput}/>
                <div className="message-details">
                    <header>Message Details</header>
                    <input type="text" placeholder="Please select a service to see a log message details"/>
                </div>
            </div>
        </div>
    )
}
