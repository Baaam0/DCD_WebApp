import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Currency from '@/components/currency'
import axios from 'axios'


const inter = Inter({ subsets: ['latin'] })

export default  async function Home({myChart}) {

  // const url = `https://quickchart.io/chart?c={type:'bar',data:{labels:[2012,2013,2014,2015, 2016],datasets:[{label:'Users',data:[120,60,50,180,120]}]}}`;


  
  // qc.setConfig({
  //   type: 'bar',
  //   data: { labels: ['Hello world', 'Foo bar'], datasets: [{ label: 'Foo', data: [1, 2] }] },
  // });
  // qc.setWidth(500).setHeight(300).setBackgroundColor('transparent');

  // console.log(qc.getUrl());
  
  // const url = await qc.getShortUrl();
  // console.log(url);
  // const image = async(qc.toBinary());

  // const makeChart = () => {
  //   axios.get(url)
  //   .then((response) => {
  //     console.clear();
  //     console.log(response);
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }

  // const data = [
  //   { year: 2010, count: 10 },
  //   { year: 2011, count: 20 },
  //   { year: 2012, count: 15 },
  //   { year: 2013, count: 25 },
  //   { year: 2014, count: 22 },
  //   { year: 2015, count: 30 },
  //   { year: 2016, count: 28 },
  // ];

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <div>{myChart}</div>
      <Currency/>

      {/* <button
        onClick = {makeChart}
        style={{width: '200px', height: '50px'}}
      >make chart</button> */}

      {/* <div>{url}</div> */}



      </main>
    </>
  )
}


export async function getStaticProps() {
  const QuickChart = require('quickchart-js');

  const myChart = new QuickChart();

  myChart.setConfig({
    type:"bar",
    data:{ 
      labels: ['Hello world', 'Foo bar'], 
      datasets: [{ label: 'Foo', data: [1, 2] }]
    }
  })

  console.log(myChart.getUrl())
  return {
    props: {
      myChart
    }
  }
}