import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import LargeScreenLayout from '../components/LargeScreenLayout';
import { Navigate } from 'react-router-dom';
import { getSemestersData } from '../../../utils/helpers';
import Semester from '../components/Semester';
import Button from '../../../components/Button';
import { useReactToPrint } from 'react-to-print';
import Heading from '../components/Heading';
import MediumScreenLayout from '../components/MediumScreenLayout';
import { GreetingTile } from '../components/HeaderTiles';
import NavBar from '../components/NavBar';
import SmallScreenLayout from '../components/SmallScreenLayout';
import { setActiveTab } from '../resultsSlice';
import Overview from '../components/Overview';

export default function AllResults() {
  const { student, activeTab, screenType } = useSelector( store => store.results );
  if(Object.keys(student).length === 0) {
    toast.warning('Search using Roll No', {toastId: "Allresults"});
    return <Navigate to={'/'}/>;
  };
  useEffect(()=>{
    if (activeTab === 'subjects') {
      dispatch(setActiveTab('semesters'));
    } else {
      dispatch(setActiveTab('overview'));
    }
  }, [])
  const dispatch = useDispatch();
  const semesters = getSemestersData(student);
  const printComponentRef = useRef();

  return (
    <>
      {screenType === 'large' &&     
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
          <Overview backlogs={student.finalResult.backlogs} gpa={student.finalResult.cgpa} type={'semesters'} />
        </LargeScreenLayout>
      }
      {screenType === 'medium' && 
        <MediumScreenLayout>
          <NavBar />
          <GreetingTile />
          <RollNo>Results of {student.rollNo.toUpperCase()}</RollNo>
          <Heading text={'Overview'}/>
          <Overview backlogs={student.finalResult.backlogs} gpa={student.finalResult.cgpa} type={'semesters'} />
          <Heading text={'Semesters'} printComponentRef={printComponentRef} />
          <SemestersContainer ref={printComponentRef} >
            {semesters.map((semester, idx) => <Semester key={idx} semester={semester} />)}
          </SemestersContainer>
        </MediumScreenLayout>
      }
      {screenType === 'small' && 
        <SmallScreenLayout>
          <NavBar />
          <GreetingTile />
          <RollNo style={{textAlign: 'center'}} >Results of {student.rollNo.toUpperCase()}</RollNo>
          <Buttons className="buttons">
            <Button 
              onClick={()=>dispatch(setActiveTab('overview'))}
              isActive={activeTab === 'overview'} 
              size={'var(--font-size1)'} 
            >Overview</Button>
            <Button 
              onClick={()=>dispatch(setActiveTab('semesters'))}
              isActive={activeTab === 'semesters'} 
              size={'var(--font-size1)'} 
            >Semesters</Button>
          </Buttons>
          {activeTab === 'overview' && 
            <Overview backlogs={student.finalResult.backlogs} gpa={student.finalResult.cgpa} type={'semesters'} />
          }
          {activeTab === 'semesters' && 
            <SemestersContainer ref={printComponentRef} >
              {semesters.map((semester, idx) => <Semester key={idx} semester={semester} />)}
            </SemestersContainer>
          }
        </SmallScreenLayout>
      }
    </>

  )
}

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
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`