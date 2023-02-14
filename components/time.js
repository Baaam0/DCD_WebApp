import axios from "axios";
import React from "react";
import { useState } from "react";

export default function Time(props) {
  const [show, setShow] = useState();
  const [cnt, setCnt] = useState();
  const [data, setData] = useState([]);

  const changeCnt = () => {
    // const url = `http://worldtimeapi.org/api/timezone/${cnt}`
    const url = `https://api.ipgeolocation.io/timezone?apiKey=38a893a1862346fcb127ba8b44e8be15&tz=${cnt}`

    console.log(cnt);
    axios.get(url)
    .then((response) => {
      setData([...data, response.data]);
      setShow(response.data.date_time_txt);
      console.log(response)
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <select 
        value={cnt} 
        onChange={(e)=>{setCnt(e.target.value)}}
      >
            <option value="America/Los_Angeles"> USD</option>
            <option value="Europe/London"> EUR</option>
            <option value="Canada/Vancouver"> CAD</option>
            <option value="Korea/Seoul"> KRW</option>
          </select>
          <button onClick={changeCnt}>submit</button>
          <div>{show}</div>
          <div>{props.test}</div>
    </div>
  )
}


