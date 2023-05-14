import React, { useState } from 'react'
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setStudent } from '../features/results/resultsSlice';
import { getResults } from '../features/results/resultsService';


export default function SearchBar({ width, size, boxShadow=true, style }) {
  const [rollNo, setRollNo] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleSearch(e) {
      e.preventDefault();
      const student = await getResults(rollNo);
      if (student) {
        dispatch(setStudent(student));
        navigate(`/results/all/${student.rollNo}`);
      }
  }
  return (
    <Wrapper style={style} onSubmit={handleSearch} width={width} size={size} boxShadow={boxShadow}>
      <FiSearch onClick={handleSearch} id="icon" />
      <input onChange={(e) => setRollNo(e.target.value)} type="text" placeholder='Enter your Roll No'></input>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  width: ${props => props.width};
  position: relative;
  background-color: var(--white1);
  overflow: hidden;
  border-radius: var(--border-radius1);
  box-shadow: ${props => props.boxShadow ? 'var(--box-shadow1)' : 'none'};
  input{
    font-size: ${props => props.size};
    width: 100%;
    padding: 13px 4rem; 
    padding-left: 5rem;
    background-color: transparent;
    outline: none;
    border: none;
  }
  #icon{
    font-size: ${props => `calc(${props.size} * 1.3)` };
    position: absolute;
    top: 50%;
    left: 3.2rem;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
`