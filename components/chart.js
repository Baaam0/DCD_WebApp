import React from 'react'
import { Pie } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import { useState, useEffect } from 'react';

function Chart({info, name}) {
  const [data, setData] = useState({
    labels: ['daniel', 'peter', 'paul'],  //items name  (ex. food, car) --> ['food', 'bag']
    datasets: [{
      label: 'scores',
      data: [25, 100, 50],   //value ['20', '30']
      backgroundColor: ['red', 'blue', 'green']
    }]
  });

  useEffect(()=> {
    setData({...data,  labels: [name, 'peter', 'paul']})
  }, [name]);

  return (
    <div>
      <h1>{name}</h1>
      <Pie data={data}/>
    </div>
  )
}

export default Chart