import React from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

export default function CircularProgress({ number, type }) {
  let remaining = 0;
  if (type === 'gpa') remaining = 10 - number;
  else if (type === 'percentage') remaining = 100 - number;
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    // labels: ['Red', 'Blue'],
    datasets: [
      {
        data: [number, remaining],
        backgroundColor: [
          '#6494AA',
          '#BBD1DC',
          // 'rgba(255, 206, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: [0, 0]
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '80%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <Wrapper>
      <Doughnut options={options} data={data} />
      <span className="number">{number}</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 95px;
  position: relative;
  .number{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: var(--font-weight4);
  }
  @media (max-width: 600px) {
    width: 80px;
  }
`