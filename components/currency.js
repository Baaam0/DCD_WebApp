import axios from "axios"
import React from "react"
import { useState } from "react"
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
  const { con1, con2, setCon1, setCon2 } = props;

  const array = Object.entries(value);

  const renderItems = array.map(([key, value]) => {
    return <option value = {key}>{`${value} (${key})`}</option>
  })

  const [amount, setAmount] = useState();
  const [show, setShow] = useState();
  const [time, setTime] = useState();
  const [time2, setTime2] = useState();


  const changeCountry = async() => {
    
    
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;

      // Exchange Rate API
      const url1 = `https://api.exchangerate.host/convert?from=${con1}&to=${con2}&amount=${amount}`;

      axios.get(url1)
      .then((response) => {
        setShow(response.data.result);
        console.log(response.data.result);
        console.log(response)
      }).catch(err => {
        console.log(err);
      })

      // Time Zone API

      axios.get(`https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&location=${value[con1]}`)
      .then((response) => {
        setTime(response.data.date_time_txt);
        console.log(response.data.date_time_txt);
        console.log(response)
      }).catch(err => {
        console.log(err);
      })

      axios.get(`https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&location=${value[con2]}`)
      .then((response) => {
        setTime2(response.data.date_time_txt);
        console.log(response.data.date_time_txt);
      }).catch(err => {
        console.log(err);
      })
  }

  
  return (
    <div>
  {/* Input for exchange amount */}
      <div className={styles.input_cnt}>
      <input
            value={amount}
            type="number"
            onChange={event => setAmount(event.target.value)}
            placeholder="Enter Amount"
            className={styles.input_box}
          />
          <input 
            type="submit" 
            onClick={changeCountry}
            className={styles.submit_button}
          />
      </div>
      <div className={styles.currency_cnt}>

  {/* Pick first currency */}
      <div className={styles.currency_box1} id="currency-box">
        <form>
          <h1 className={styles.currency_h1}> Current Currency: <br/>  {con1}</h1>
          <select value={con1} name="currency-from" onChange={(e)=>{if(e.target.value === con2) {alert("Please select two different currencies")} else {setCon1(e.target.value)}}} className={styles.select_button}>
          {renderItems}
        </select>
          
        </form>
      </div>
      
  {/* pick second currency */}
      <div className={styles.currency_box2}>
        <form>
          <h1 className={styles.currency_h1}> Target Currency : {con2}</h1>
          
          <select value={con2} name="currency-to" onChange={(e)=>{if(e.target.value === con1) {alert("Please select two different currencies")} else {setCon2(e.target.value)}}} className={styles.select_button}>
          {renderItems}
        </select>

        </form>
      </div>
      </div>

      <hr className={styles.hr}/>

  {/* Showing Exchanged Amount */}
      <div className={styles.show}>
        <div className={styles.amount} id="amount">

          <div className={styles.money_img} id="money-bag"/>
          <div>Amount : <br/> {parseFloat(show).toFixed(2)} <span>{con2}</span></div>
          
        </div>
        
  {/* Showing Time-Zone */}
        <div className={styles.time}>
          <div id="time-from" className={styles.time_box1}>Time of {value[con1]} :  <br/> {time}</div>
          <div id="time-to" className={styles.time_box2}>Time of {value[con2]} :  <br/> {time2}</div>
        </div>
     
      </div>
      <hr className={styles.hr}/>
    </div>

  )
}