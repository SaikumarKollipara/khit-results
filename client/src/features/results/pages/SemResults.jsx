import React, { useRef } from 'react';
import styled from 'styled-components';
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import Layout from '../components/Layout';
import { deFormatSemNumber, getPercentage } from '../../../utils/helpers';
import Heading from '../components/Heading';
import Subject from '../components/Subject';
import { setCurrentSemester } from '../resultsSlice';
import Button from '../../../components/Button';
import Container from '../components/Container';
import CircularProgress from '../components/CircularProgress';
import { toast } from 'react-toastify';

export default function SemResults() {
  const dispatch = useDispatch();
  const { student } = useSelector(store => store.results);
  if(Object.keys(student).length === 0) {
    toast.warning('Search using Roll No');
    return <Navigate to={'/'}/>;
  };
  const { sem, rollNo } = useParams();
  const printComponentRef = useRef();
  const subjects = student.sems[deFormatSemNumber(sem)].final.results;
  dispatch(setCurrentSemester(student.sems[deFormatSemNumber(sem)]));
  const { currentSemester } = useSelector(store => store.results );
  const handlePrint = useReactToPrint({ content: () => printComponentRef.current });
  return (
    <Layout>
      <FirstSection ref={printComponentRef}>
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
          <Button onClick={handlePrint} style={{padding: '8px 20px'}} size={"var(--font-size1)"} >Print</Button>
        </p>
        <p className="header">
          <span className='code'>Code</span>
          <span className='name'>Name</span>
          <span className='grade'>Grade</span>
          <span className='credits'>Credits</span>
        </p>
        <Subjects>
          {subjects.map((subject, idx) => <Subject key={idx} idx={idx} subject={subject} />)}
        </Subjects>
      </FirstSection>
      <SecondSection>
        <p className='heading'>Overview</p>
        <Container>
          <p className="content">{student.regulation.toUpperCase()}</p>
          <p className="title">{student.branch}</p>
        </Container>
        <Container>
          <a className="content">{currentSemester.final.backlogs.length}</a>
          <a className='title' style={{textDecoration: 'underline', cursor: 'pointer'}}>Total backlogs</a>
        </Container>
        <Container style={{padding: 0}}>
          <CircularProgress number={currentSemester.final.sgpa.toFixed(2)} type={'gpa'} />
          <p className='title' href="">Total SGPA</p>
        </Container>
        <Container>
          <CircularProgress number={getPercentage(currentSemester.final.sgpa).toFixed(2)} type={'percentage'} />
          <p className='title' href="">Total percentage</p>
        </Container>
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
  display: grid;
  gap: 20px;
  grid-template-columns: 47% 47%;
  grid-template-rows: var(--font-size4) 115px 115px auto;
  justify-content: center;
  .heading {
    grid-column: 1 / -1;
    font-size: var(--font-size3);
    font-weight: var(--font-weight4);
    align-self: center;
  }
  #graph {
    grid-column: 1 / -1;
  }
  .content {
    font-size: var(--font-size4);
    font-weight: var(--font-weight4);
  }
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