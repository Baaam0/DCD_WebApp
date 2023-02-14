import axios from "axios"
import React from "react"
import { useState } from "react"
import Chart from "./chart"
import Category from "./category"
import styles from '@/styles/Home.module.css'

const value = {
  USD: "America/Los_Angeles",
  EUR : "Europe/London",
  CAD : "Canada/Vancouver",
  KRW : "South Korea/Seoul",
  CNY : "China",
  AUD : "Australia/Brisbane",
  CHF : "Swiss",
  COP : "Colombia",
  GBP : "United Kingdom",
  HKD : "Hongkong",
  INR : "India",
  JPY : "Japan/Tokyo",
  MXN : "Mexico",
  PHP : "Philippines",
};

export default function Currency(props) {

  const array = Object.entries(value);

  const renderItems = array.map(([key, value]) => {
    return <option value = {key}>{`${value} (${key})`}</option>
  })

  const [con1, setCon1] = useState('');
  const [con2, setCon2] = useState('');
  const [amount, setAmount] = useState();
  const [show, setShow] = useState();
  const [time, setTime] = useState();
  const [time2, setTime2] = useState();
  // const [name, setName] = useState();

  // const clicked = () => {
  //   console.log("hello")
  //   setName("John")
  // }

  const changeCountry = async() => {
      const url1 = `https://api.exchangerate.host/convert?from=${con1}&to=${con2}&amount=${amount}`;

      axios.get(url1)
      .then((response) => {
        setShow(response.data.result);
        console.log(response.data.result);
        console.log(response)
      }).catch(err => {
        console.log(err);
      })

      setTime(await getTime(con1));
      setTime2(await getTime(con2));

  }

  const getTime = async(country) => {
    try {
      console.log(value[country]);
      let data = await axios.get(`https://api.ipgeolocation.io/timezone?apiKey=38a893a1862346fcb127ba8b44e8be15&location=${value[country]}`);
      if(data){
        console.log(data);
        return data.data.date_time_txt;
      }
    }catch(err){
      console.log(err);
    }
  }
  
  // const changeTest = (value) => {
  //   props.setTest(value);
  // }
  
  return (
    <div>

     <input
          value={amount}
          type="number"
          onChange={event => setAmount(event.target.value)}
          placeholder="Enter Amount"
        />
        <input 
          type="submit" 
          onClick={changeCountry}
        />

        {/* <input value={props.test} onChange={(e)=>{ changeTest(e.target.value) }} />
        <div>{props.test}</div> */}

        <form>
          <h1> Current currency : {con1}</h1>
          <select value={con1} onChange={(e)=>{setCon1(e.target.value)}}>
            {renderItems}
            
          </select>
        </form>

        <form>
          <h1> Current currency : {con2}</h1>
          <select value={con2} onChange={(e)=>{setCon2(e.target.value)}}>
            {/* <option value = "USD"> USD</option>
            <option value = "EUR"> EUR</option>
            <option value = "CAD"> CAD</option>
            <option value = "KRW"> KRW</option> */}
            {renderItems}
          </select>
        </form>
      <hr className={styles.hr}/>
      <div className={styles.show}>
        <div className={styles.amount}>
          <div>Amount : {show} <span>{con2}</span></div>
        </div>

        <div className={styles.time}>
          <div>Time of {value[con1]} : {time}</div>
          <div>Time of {value[con2]} : {time2}</div>
        </div>
      </div>
      {/* <Chart info={show} name={name}/>
      <Category func={clicked}/> */}
    </div>

  )
}