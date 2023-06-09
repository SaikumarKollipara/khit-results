import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from 'react-redux';
import { getSemestersData } from '../../../utils/helpers';


export default function Graph() {
  const { student } = useSelector(store => store.results);
  const results = getSemestersData(student)
  .map(student => student.sgpa)
  .filter(result => result !== undefined);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2'];

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        display: false
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: student.rollNo.toUpperCase(),
        data: results,
        backgroundColor: "#000",
        borderColor: "#000",
      },
    ],
  };

  return (
    <Wrapper>
      <Line options={options} data={data} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 110px;
  background-color: var(--white2);
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: var(--border-radius1 );
`