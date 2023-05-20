import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';

import LargeScreenLayout from '../components/LargeScreenLayout';
import { Navigate } from 'react-router-dom';
import { getSemestersData } from '../../../utils/helpers';
import Semester from '../components/Semester';
import Container from '../components/Container';
import Graph from '../components/Graph';
import CircularProgress from '../components/CircularProgress';
import { getPercentage } from '../../../utils/helpers';
import Button from '../../../components/Button';
import { useReactToPrint } from 'react-to-print';
import Heading from '../components/Heading';
import MediumScreenLayout from '../components/MediumScreenLayout';
import { ProgressTile, TextTile } from '../components/Tiles';
import { GreetingTile } from '../components/HeaderTiles';
import NavBar from '../components/NavBar';

export default function AllResults() {
  const { student } = useSelector( store => store.results );
  const semesters = getSemestersData(student);
  const printComponentRef = useRef();
  if(Object.keys(student).length === 0) {
    toast.warning('Search using Roll No');
    return <Navigate to={'/'}/>;
  };
  const isLargeScreen = useMediaQuery({ minWidth: 1151 });
  const isMediumScreen = useMediaQuery({ maxWidth: 1150 });
  const isSmallScreen = useMediaQuery({ maxWidth: 600 });
  return (
    <>
      {isLargeScreen &&     
        <LargeScreenLayout>
          <GreetingTile />
          <div className="semesters-header">
            <RollNo>Results of {student.rollNo.toUpperCase()}</RollNo>
            <Heading text={'Semesters'} printComponentRef={printComponentRef} />
          </div>
          <SemestersContainer ref={printComponentRef} >
            {semesters.map((semester, idx) => <Semester key={idx} semester={semester} />)}
          </SemestersContainer>
          <NavBar />
          <Heading text={'Overview'}/>
          <Overview />
        </LargeScreenLayout>
      }
      {isMediumScreen && 
        <MediumScreenLayout>
          <NavBar />
          <GreetingTile />
          <RollNo>Results of {student.rollNo.toUpperCase()}</RollNo>
          <Heading text={'Overview'}/>
          <Overview />
          <Heading text={'Semesters'} printComponentRef={printComponentRef} />
          <SemestersContainer ref={printComponentRef} >
            {semesters.map((semester, idx) => <Semester key={idx} semester={semester} />)}
          </SemestersContainer>
        </MediumScreenLayout>
      }

    </>

  )
}


function Overview() {
  const { student } = useSelector( store => store.results );
  return <>
    <GridContainer >
      <TextTile title={student.regulation.toUpperCase()} description={student.branch} />
      <TextTile title={student.finalResult.backlogs.length} description={'Total Backlogs'} />
      <ProgressTile progress={student.finalResult.cgpa} text={'Total GPA'} type={'gpa'} />
      <ProgressTile progress={getPercentage(student.finalResult.cgpa)} text={'Total Percentage'} type={'percentage'} />
      <div id='graph'><Graph /></div>
    </GridContainer>
  </>
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: calc(50% - 10px) calc(50% - 10px);
  grid-template-rows: 115px 115px auto;
  gap: 20px;
  #graph {
    grid-column: 1 / -1;
  }
`
const RollNo = styled.p`
  font-size: var(--font-size1);
  font-weight: var(--font-weight4);
  color: var(--black2);
`
const SemestersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
