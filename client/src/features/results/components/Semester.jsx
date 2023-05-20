import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';

import Button from '../../../components/Button';

export default function Semester({ semester }) {
  const { student, screenType } = useSelector(store => store.results );
  const navigate = useNavigate();
  return (
    <Wrapper>
      <SemNumber>{semester.number}</SemNumber>
      {semester.isCompleted ? 
        <>
          <ContentWrapper>
          <Content>
            <p className="number">{semester.percentage}</p>
            <p className="subscript">&nbsp;%</p>
          </Content>
          <Content>
            <p className="number">{semester.sgpa}</p>
            <p className="subscript">&nbsp;SGPA</p>
          </Content>
          <Content>
            <p className="number">{semester.backlogs.length}</p>
            <p className="subscript">&nbsp;Backlogs</p>
          </Content>
        </ContentWrapper>
        {screenType === 'small' ?
          <Button style={{padding: '8px 12px'}} onClick={()=>navigate(`/results/${semester.number}/${student.rollNo}`)} size={'var(--font-size1)'}>
            {screenType === 'small' ? <FaArrowRight /> : 'View Details'}
          </Button>
          :
          <Button onClick={()=>navigate(`/results/${semester.number}/${student.rollNo}`)} size={'var(--font-size1)'}>
            View Details
          </Button>
        }
        </>
        :
        <ContentWrapper>
          <Content>
            <p className="not-available">Not Available</p>
          </Content>
        </ContentWrapper>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  background-color: var(--white2);
  margin-bottom: 20px;
  padding: 0 10px;
  border-radius: var(--border-radius3);
`
const SemNumber = styled.div`
  width: 50px;
  height: 50px;
  background-color: var(--white1);
  border-radius: var(--border-radius2);
  font-size: var(--font-size2);
  font-weight: var(--font-weight5);
  text-align: center;
  display: grid;
  place-items: center;
`
const ContentWrapper = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-weight: var(--font-weight4);
  .number{
    font-size: var(--font-size2);
    font-weight: var(--font-weight5);
  }
  .subscript{
    font-size: var(--font-size1);
    font-weight: var(--font-weight3);
    margin-bottom: 1px;
  }
  .not-available{
    font-size: var(--font-size3);
    color: var(--black2);
    font-weight: var(--font-weight4);
    margin-right: 3rem;
  }
`