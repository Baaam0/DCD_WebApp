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
      <main className={styles.main}>
     
      <Currency test={test} setTest={setTest} con1={con1} con2={con2} setCon1={setCon1} setCon2={setCon2}/>
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


