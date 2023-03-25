import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Currency from '@/components/currency'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import Form from '@/components/form'
import { Pie } from 'react-chartjs-2'
import Time from '@/components/time'
import record from '@/data/BigmacPrice.json'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

const [errorMsg, setErrorMsg] = useState()
const [data, setData] = useState([]);
const [item, setItem] = useState([]);
const [value, setValue] = useState([]);
const [test, setTest] = useState('');

const [con1, setCon1] = useState('');
const [con2, setCon2] = useState('');

useEffect(() => {
  console.log(item)
    const data = {
    labels: item,
    datasets: [{
      label: 'items',
      data: value,
      backgroundColor: ['red', 'blue', 'green', 'yellow']
    }]
  }
    setData(data)
}, [item, value]);

  const clicked = (e) => {
    e.preventDefault();   // → doesn’t need to refresh 
    console.log(e.target[0].value)   // → first input ‘s value
    if(item.length == value.length) {
      setErrorMsg('choose an item');
    } else {
      setErrorMsg('')
      convertCurrency(e.target[0].value)  //  → pur that value into currency function
    }

  }

  const buttons = (e) => {
    console.log(e.target.textContent) //  → what’s inside of button
    if (item.includes(e.target.textContent)) {
        setErrorMsg('choose another item')
    } else {
        setItem([...item, e.target.textContent]);
    };
  } 

      
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} id="main">
     
      <Currency test={test} setTest={setTest} con1={con1} con2={con2} setCon1={setCon1} setCon2={setCon2}/>
{/* 
      <div>{con1}</div>
      <div>{con2}</div> */}
     
             {record

  .filter(r => r.currency_code === con1 || r.currency_code === con2)
  .sort((a, b) => {
    if (a.currency_code === con1) {
      return -1;
    } else if (b.currency_code === con1) {
      return 1;
    } else {
      return 0;
    }
  })
  .map((r,i) => (
    <div id="BicMac" key={i} className={`${styles.con_cnt} ${r.currency_code === con1 ? styles.con1 : styles.con2}`}>
      {r.currency_code === con1 && <div className={styles.con_h2}>{con1}</div>}
      {r.currency_code === con2 && <div className={styles.con_h2}>{con2}</div>}  
      <div> Local Price: &nbsp; <span style={{color: '#fcc219',fontWeight:'bold'}}>{r.local_price}</span></div>
      <div> Dollar Exchange:&nbsp; <span style={{color: '#fcc219',fontWeight:'bold'}}> {r.dollar_ex} </span></div>
      <div> Dollar Price: &nbsp; <span style={{color: '#fcc219',fontWeight:'bold'}}> {r.dollar_price} </span></div>
      <div className={styles.symbol}  style={r.currency_code === con2 ? {right: '210px', position: 'absolute',fontSize:'80px'} : {}}>{r.dollar_symbol}</div>
    </div>
))}
             
     

    


    
{/* 
      <Form buttons={buttons} click={clicked}/>
      {errorMsg!== '' && <h6> { errorMsg }</h6>}
      {value.length > 0  && <div>
	      <Pie data={data}/>
      </div>
      } */}

      {/* <Time test={test} setTest={setTest}/> */}

      </main>
    </>
  )
}


