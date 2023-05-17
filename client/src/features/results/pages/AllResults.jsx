import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Layout from '../components/Layout';
import Heading from '../components/Heading';
import { Navigate } from 'react-router-dom';
import { getSemestersData } from '../../../utils/helpers';
import Semester from '../components/Semester';
import Container from '../components/Container';
import Graph from '../components/Graph';
import CircularProgress from '../components/CircularProgress';
import { getPercentage } from '../../../utils/helpers';
import Button from '../../../components/Button';
import { useReactToPrint } from 'react-to-print';

export default function AllResults() {
  const { student } = useSelector( store => store.results );
  const semesters = getSemestersData(student);
  const printComponentRef = useRef();
  if(Object.keys(student).length === 0) {
    toast.warning('Search using Roll No');
    return <Navigate to={'/'}/>;
  };
  // toast.success(`Results of ${student.rollNo.toUpperCase()}`);
  const handlePrint = useReactToPrint({ content: () => printComponentRef.current });
  return (
    <Layout>
      <FirstSection>
        <Heading>
          <div className='content'>
            <Greeting>Hello There!</Greeting>
            <Description>It's good to see you again.</Description>
          </div>
          <WavingHand src='/assets/images/waving-hand.png' />
        </Heading>
        <RollNo>Results of {student.rollNo.toUpperCase()}</RollNo>
        <p className='heading'>
          <div className="name">Semesters</div>
          <Button onClick={handlePrint} style={{padding: '8px 20px'}} size={"var(--font-size1)"} >Save as PDF</Button>
        </p>
        <Semesters ref={printComponentRef} >
          {semesters.map((semester, idx) => <Semester key={idx} semester={semester} />)}
        </Semesters>
      </FirstSection>
      <SecondSection className="second-section">
        <p className='heading'>Overview</p>
        <Container>
          <p className="content">{student.regulation.toUpperCase()}</p>
          <p className="title">{student.branch}</p>
        </Container>
        <Container>
          <a className="content">{student.finalResult.backlogs.length}</a>
          <a className='title' style={{textDecoration: 'underline', cursor: 'pointer'}}>Total backlogs</a>
        </Container>
        <Container style={{padding: 0}}>
          <CircularProgress number={student.finalResult.cgpa.toFixed(2)} type={'gpa'} />
          <p className='title' href="">Total CGPA</p>
        </Container>
        <Container>
          <CircularProgress number={getPercentage(student.finalResult.cgpa).toFixed(2)} type={'percentage'} />
          <p className='title' href="">Total percentage</p>
        </Container>
        <div id="graph"><Container><Graph /></Container></div>
      </SecondSection>
    </Layout>
  )
}

const FirstSection = styled.div`
  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      font-size: var(--font-size3);
      font-weight: var(--font-weight4);
      margin-bottom: 10px;
    }
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
const Greeting = styled.p`
  font-size: var(--font-size4);
  font-weight: var(--font-weight4);
`
const Description = styled.p`
  font-size: var(--font-size2);
  font-weight: var(--font-weight3);
`
const WavingHand = styled.img`
  width: 95px;
`
const RollNo = styled.p`
  font-size: var(--font-size1);
  font-weight: var(--font-weight4);
  margin-top: 50px;
  color: var(--black2);
`
const Semesters = styled.div`
  width: 100%;
  height: 60vh;
  overflow: scroll;
  /* -ms-overflow-style: none;
  scrollbar-width: none; 
  &::-webkit-scrollbar { 
    display: none;
  } */
`