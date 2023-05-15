import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../components/Layout';
import { deFormatSemNumber } from '../../../utils/helpers';
import Heading from '../components/Heading';
import Subject from '../components/Subject';
import { setCurrentSemester } from '../resultsSlice';
import Button from '../../../components/Button';

export default function SemResults() {
  const dispatch = useDispatch();
  const { student } = useSelector(store => store.results);
  const { sem, rollNo } = useParams();
  const subjects = student.sems[deFormatSemNumber(sem)].final.results;
  dispatch(setCurrentSemester(student.sems[deFormatSemNumber(sem)]));
  return (
    <Layout>
      <FirstSection>
        <Heading>
          <div className='content'>
            <Description>Results of</Description>
            <RollNo>{student.rollNo.toUpperCase()}</RollNo>
          </div>
          <div className="sem">
            <p className="number">{sem}</p>
            <p>sem</p>
          </div>
        </Heading>
        <p className='heading'>
          <div className="name">Subjects</div>
          <Button style={{padding: '8px 20px'}} size={"var(--font-size1)"} >Print</Button>
        </p>
        <p className="header">
          <span className='code'>Code</span>
          <span className='name'>Name</span>
          <span className='grade'>Grade</span>
          <span className='credits'>Credits</span>
        </p>
        <Subjects>
          {subjects.map((subject, idx) => [<Subject key={idx} idx={idx} subject={subject} />,<Subject key={idx} idx={idx} subject={subject} />])}
        </Subjects>
      </FirstSection>
      <SecondSection>
        f;dk
      </SecondSection>
    </Layout>
  )
}

const FirstSection = styled.div`
  .sem {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 5px;
    p:nth-child(2) {
      margin-bottom: 10px;
      font-size: var(--font-size1);
      font-weight: var(--font-weight4);
    }
  }
  .sem > .number{
    font-size: 2.3rem;
    font-weight: var(--font-weight4);
  }
  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3rem;
    .name {
      font-size: var(--font-size3);
      font-weight: var(--font-weight4);
      margin-bottom: 10px;
    }
  }
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: var(--font-weight4);
    padding: 10px 0;
    text-align: center;
    .code{ flex: 1 }
    .name{ flex: 2 }
    .grade{ flex: 1 }
    .credits{ flex: 1}
  }
`
const SecondSection = styled.div`
  
`
const RollNo = styled.p`
  font-size: var(--font-size4);
  font-weight: var(--font-weight4);
`
const Description = styled.p`
  font-size: var(--font-size2);
  font-weight: var(--font-weight3);
`
const Subjects = styled.div`
  width: 100%;
  height: 56vh;
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar { /* Chrome */
    display: none;
  }
`