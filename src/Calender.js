import React,{useState} from 'react'
import './App.scss'
import {DateRangePicker}  from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
import { addDays } from 'date-fns'
import axios from "axios";
import {GrRefresh} from 'react-icons/gr'
import {BsFillCalendarCheckFill} from 'react-icons/bs'

const refresh=()=>{
    window.location.reload()
}
const Box=()=>{
    const [data,setData]=useState([])
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 0),
          key: 'selection'
        }
      ]);
    const handleDate=(e)=>{
        let starting = state[0].startDate
        let ending = state[0].endDate
        let param1 = format(starting, 'yyyy-MM-dd')
        let param2 = format(ending, 'yyyy-MM-dd')
        console.log(`passed Start date is ==>${param1}`)
        console.log(`passed end date is ==>${param2}`)
        axios
          .post('http://192.168.2.23:9000/readAPI/customDateRange', {param1,param2})
          .then((response) => setData(response),
          console.log(data))
          .catch(err => {
            console.error(err);
          });
        // const parseDate = (timestamp) => new Date(timestamp).toISOString().slice(0, 10)//this will format date into yyyy-mm-dd
        // const params = {
        //     param1: parseDate(starting),
        //     param2: parseDate(ending)
        // };
        // const options = {
        //     method: 'POST',
        //     body: JSON.stringify( params )
        // };
        // fetch('http://192.168.2.23:9000/readAPI/customDateRange',options)
        // .then(() => console.log('Date and Time format has been sent'))
        //   .catch(err => {
        //     console.error(err);
        //   });
          
    }
    const closeCalndr=(e)=>{
        
    }
    return(
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
        
    )
}
export default function Calender() {
    const [isShown, setIsShown] = useState(false);
    const handleClick = () => {
        setIsShown(!isShown);
    };
    const handlrHour=(e)=>{
       let date = new Date()
       let time =(date.getHours()+':'+date.getMinutes()) - (1000*60*60)
    //    var hourago = new Date(date.getTime() - (1000*60*60));
    //    let time = hourago.getTime()+":"+hourago.getMinutes()
       alert(time)
    }
  return (
    <div>
        <div className='calndr'>
            <button className='hr-btn' onClick={handlrHour}>1hr</button>
            <button className='hr-btn' onClick={handlrHour}>3hr</button>
            <button className='hr-btn' onClick={handlrHour}>12hr</button>
            <button className='hr-btn' onClick={handleClick}><BsFillCalendarCheckFill/></button>
            <button className='hr-btn' onClick={refresh}><GrRefresh style={{height:'2vh'}} /></button>
        </div>
            {isShown && <Box />}
        {/* <hr/> */}
    </div>
  )
}
