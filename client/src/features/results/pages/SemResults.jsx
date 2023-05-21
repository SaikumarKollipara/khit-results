import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import { deFormatSemNumber, getPercentage } from '../../../utils/helpers';
import { setActiveTab, setCurrentSemester } from '../resultsSlice';
import { toast } from 'react-toastify';
import LargeScreenLayout from '../components/LargeScreenLayout';
import { GreetingTile, SemesterTile } from '../components/HeaderTiles';
import Heading from '../components/Heading';
import NavBar from '../components/NavBar';
import Overview from '../components/Overview';
import Subject from '../components/Subject';
import MediumScreenLayout from '../components/MediumScreenLayout';
import SmallScreenLayout from '../components/SmallScreenLayout';
import Button from '../../../components/Button';

export default function SemResults() {
  const { student, screenType, currentSemester, activeTab } = useSelector(store => store.results);
  if(Object.keys(student).length === 0) {
    toast.warning('Search using Roll No', {toastId: 'SemResults'});
    return <Navigate to={'/'}/>;
  };
  const dispatch = useDispatch();
  const { sem, rollNo } = useParams();
  const printComponentRef = useRef();
  dispatch(setCurrentSemester(student.sems[deFormatSemNumber(sem)]));
  const subjects = currentSemester.final.results;
  useEffect(()=>{
    dispatch(setActiveTab('subjects'));
  }, [])
  return <>
    {screenType === 'large' && 
      <LargeScreenLayout>
          <SemesterTile rollNo={rollNo} number={sem} />
          <div className="subjects-header">
            <Heading text={'Subjects'} printComponentRef={printComponentRef} />
            <TableHeader>
              <span className='code'>Code</span>
              <span className='name'>Name</span>
              <span className='grade'>Grade</span>
              <span className='credits'>Credits</span>
            </TableHeader>
          </div>
          <SubjectsContainer ref={printComponentRef} >
            {subjects.map((subject, idx) => <Subject key={idx} idx={idx} subject={subject} />)}
          </SubjectsContainer>
          <NavBar />
          <Heading text={'Overview'}/>
          <Overview backlogs={currentSemester.final.backlogs} gpa={currentSemester.final.sgpa} type={'subjects'} />
      </LargeScreenLayout>
    }
    {screenType === 'medium' && 
      <MediumScreenLayout>
        <NavBar />
        <SemesterTile rollNo={rollNo} number={sem} />
        <RollNo>Results of {student.rollNo.toUpperCase()}</RollNo>
        <Heading text={'Overview'}/>
        <Overview backlogs={currentSemester.final.backlogs} gpa={currentSemester.final.sgpa} type={'subjects'} />
        <div className="subjects-header">
            <Heading text={'Subjects'} printComponentRef={printComponentRef} />
            <TableHeader>
              <span className='code'>Code</span>
              <span className='name'>Name</span>
              <span className='grade'>Grade</span>
              <span className='credits'>Credits</span>
            </TableHeader>
          </div>
        <SubjectsContainer ref={printComponentRef} >
          {subjects.map((subject, idx) => <Subject key={idx} idx={idx} subject={subject} />)}
        </SubjectsContainer>
      </MediumScreenLayout>
    }
    {screenType === 'small' && 
      <SmallScreenLayout>
        <NavBar />
        <SemesterTile rollNo={rollNo} number={sem} />
        <RollNo style={{textAlign: 'center'}} ></RollNo>
        <div>
          <Buttons className="buttons">
            <Button
              onClick={()=>dispatch(setActiveTab('subjects'))}
              isActive={activeTab === 'subjects'} 
              size={'var(--font-size1)'} 
            >Subjects</Button>
            <Button 
              onClick={()=>dispatch(setActiveTab('overview'))}
              isActive={activeTab === 'overview'} 
              size={'var(--font-size1)'} 
            >Overview</Button>
          </Buttons>
          <TableHeader>
              <span className='code'>Code</span>
              <span className='name'>Name</span>
              <span className='grade'>Grade</span>
              <span className='credits'>Credits</span>
          </TableHeader>
        </div>
        {activeTab === 'subjects' && 
          <SubjectsContainer ref={printComponentRef} >
            {subjects.map((subject, idx) => <Subject key={idx} idx={idx} subject={subject} />)}
          </SubjectsContainer>
        } 
       {activeTab === 'overview' && 
          <Overview backlogs={currentSemester.final.backlogs} gpa={currentSemester.final.sgpa} type={'subjects'} />
        }
      </SmallScreenLayout>
    }
  </>
}

const SubjectsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const TableHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: var(--font-weight4);
  padding-right: 1rem;
  text-align: center;
  .code{ flex: 1 }
  .name{ flex: 2 }
  .grade{ flex: 1 }
  .credits{ flex: 1}
  @media (min-width: 601px) and (max-width: 1150px) {
    margin-top: 2rem;
  }
  @media (max-width: 600px) {
    margin-top: 1.5rem;
  }
`
const RollNo = styled.p`
  font-size: var(--font-size1);
  font-weight: var(--font-weight4);
  color: var(--black2);
`
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`