import React from 'react';
//import DisplayJson from './Displayjson';
import DisplayLogTraceJson from './DisplayLogTraceJson';
// import Dummy from './Dummy';

export default function App(){
  console.log(new Date().getUTCDate())
  return(
    <div>
    {/* <DisplayJson/> */}
      <DisplayLogTraceJson/>
      {/* <Dummy/> */}
    </div>
  )
}
