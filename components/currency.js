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
  const { con1, con2, setCon1, setCon2 } = props;

  const array = Object.entries(value);

  const renderItems = array.map(([key, value]) => {
    return <option value = {key}>{`${value} (${key})`}</option>
  })


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

      axios.get(`https://api.ipgeolocation.io/timezone?apiKey=38a893a1862346fcb127ba8b44e8be15&location=${value[con1]}`)
      .then((response) => {
        setTime(response.data.date_time_txt);
        console.log(response.data.date_time_txt);
        console.log(response)
      }).catch(err => {
        console.log(err);
      })

      axios.get(`https://api.ipgeolocation.io/timezone?apiKey=38a893a1862346fcb127ba8b44e8be15&location=${value[con2]}`)
      .then((response) => {
        setTime2(response.data.date_time_txt);
        console.log(response.data.date_time_txt);
      }).catch(err => {
        console.log(err);
      })

      // setTime(await getTime(con1));
      // setTime2(await getTime(con2));

  }

  // const getTime = async(country) => {
  //   try {
  //     console.log(value[country]);
  //     let data = await axios.get(`https://api.ipgeolocation.io/timezone?apiKey=38a893a1862346fcb127ba8b44e8be15&location=${value[country]}`);
  //     if(data){
  //       console.log(data);
  //       return data.data.date_time_txt;
  //     }
  //   }catch(err){
  //     console.log(err);
  //   }
  // }
  
  // const changeTest = (value) => {
  //   props.setTest(value);
  // }
  
  return (
    <div>
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

          {/* <input value={props.test} onChange={(e)=>{ changeTest(e.target.value) }} />
          <div>{props.test}</div> */}
      </div>

      <div className={styles.currency_cnt}>
      <div className={styles.currency_box1} id="currency-box">
        <form>
          <h1 className={styles.currency_h1}> Current currency: <br/>  {con1}</h1>
          <select value={con1} onChange={(e)=>{if(e.target.value === con2) {alert("Please select two different currencies")} else {setCon1(e.target.value)}}} className={styles.select_button}>
          {renderItems}
        </select>
          {/* <select value={con1} onChange={(e)=>{setCon1(e.target.value)}} className={styles.select_button}>
            {renderItems}
          </select> */}
        </form>
      </div>
      
      <div className={styles.currency_box2}>
        <form>
          <h1 className={styles.currency_h1}> Current currency : {con2}</h1>
          
          <select value={con2} onChange={(e)=>{if(e.target.value === con1) {alert("Please select two different currencies")} else {setCon2(e.target.value)}}} className={styles.select_button}>
          {renderItems}
        </select>
          
          {/* <select value={con2} onChange={(e)=>{setCon2(e.target.value)}} className={styles.select_button}> */}
            {/* <option value = "USD"> USD</option>
            <option value = "EUR"> EUR</option>
            <option value = "CAD"> CAD</option>
            <option value = "KRW"> KRW</option> */}
            {/* {renderItems}
          </select> */}
        </form>
      </div>
      </div>

      <hr className={styles.hr}/>
      <div className={styles.show}>
        <div className={styles.amount}>

          <div className={styles.money_img} id="money-bag"/>
          <div>Amount : <br/> {parseFloat(show).toFixed(2)} <span>{con2}</span></div>

        </div>
        

        <div className={styles.time}>
          <div className={styles.time_box1}>Time of {value[con1]} :  <br/> {time}</div>
          <div className={styles.time_box2}>Time of {value[con2]} :  <br/> {time2}</div>
        </div>
     
      </div>
      {/* <Chart info={show} name={name}/>
      <Category func={clicked}/> */}
    </div>

  )
}