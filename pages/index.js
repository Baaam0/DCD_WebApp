import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Currency from '@/components/currency'
import { useState } from 'react'
import { useEffect } from 'react'
import record from '@/data/BigmacPrice.json'

export default function Home() {


const [test, setTest] = useState('');
const [con1, setCon1] = useState('');
const [con2, setCon2] = useState('');
      
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

      <div>
       <h1 style={{ fontSize: "30px", marginBottom: "30px"}}>BicMac Price of each Country </h1>
      </div>
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
   

      </main>
    </>
  )
}


