import axios from "axios"
import React from "react"
import { useState } from "react"


export default function Currency() {
  const [con1, setCon1] = useState('');
  const [con2, setCon2] = useState('');
  const [amount, setAmount] = useState();
  const [show, setShow] = useState()

  const url = `https://api.exchangerate.host/convert?from=${con1}&to=${con2}&amount=${amount}`;

  const changeCountry = () => {
    
      axios.get(url)
      .then((response) => {
        console.clear();
        setShow(response.data.result);
        console.log(response.data.result);
        console.log(response)
      }).catch(err => {
        console.log(err);
      })
    
  }
  return (
    <div>

     <input
          value={amount}
          type="number"
          onChange={event => setAmount(event.target.value)}
          placeholder="Enter Amount"
          onClick={changeCountry}
        />
        <input 
          type="submit" 
          onClick={changeCountry}
        />

        <form>
          <h1> current currency : {con1}</h1>
          <select value={con1} onChange={(e)=>{setCon1(e.target.value)}}>
            <option value = "USD"> USD</option>
            <option value = "EUR"> EUR</option>
            <option value = "CAD"> CAD</option>
            <option value = "KRW"> KRW</option>
          </select>
        </form>
        
        <form>
          <h1> current currency : {con2}</h1>
          <select value={con2} onChange={(e)=>{setCon2(e.target.value)}}>
            <option value = "USD"> USD</option>
            <option value = "EUR"> EUR</option>
            <option value = "CAD"> CAD</option>
            <option value = "KRW"> KRW</option>
          </select>
        </form>

      <div>{show}</div>
    </div>

  )
}