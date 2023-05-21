import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export default function Subject({ subject, idx }) {
  const { currentSemester } = useSelector(store => store.results );
  return (
    <Wrapper idx={idx} length={currentSemester.final.results.length} >
      <p className='subCode' >{subject.subCode.toUpperCase()}</p>
      <p className='subName' >{subject.subName}</p>
      <p className='grade' >{subject.grade.toUpperCase()}</p>
      <p className='credits' >{subject.credits}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  text-align: center;
  background-color: var(--white2);
  padding: 7px 7px;
  border-radius: ${props => props.idx === 0 ? 'var(--border-radius1) var(--border-radius1) 0 0':''};
  border-radius: ${props => props.idx === props.length-1 ? '0 0 var(--border-radius1) var(--border-radius1)':''};
  .subCode {
    flex: 1;
    text-align: left;
  }
  .subName {
    flex: 3;
    text-align: left;
    padding: 0 1rem;
  }
  .grade {
    flex: 1;
  }
  .credits {
    flex: 1;
  }
`