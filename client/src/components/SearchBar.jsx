import React from 'react'
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ width, size, boxShadow, style, onChange, handleSearch, setRollNo }) {
  return (
    <Wrapper style={style} width={width} size={size} boxShadow={boxShadow}>
      <FiSearch onClick={handleSearch} id="icon" />
      <input onChange={(e) => setRollNo(e.target.value)} type="text" placeholder='Enter your Roll No'></input>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: ${props => props.width}rem;
  position: relative;
  background-color: var(--white1);
  overflow: hidden;
  border-radius: var(--border-radius1);
  box-shadow: ${props => !props.boxShadow ? 'var(--box-shadow1)' : 'none'};
  input{
    font-size: ${props => props.size}rem;
    width: 100%;
    padding: 13px 4rem; 
    padding-left: 5rem;
    background-color: transparent;
    outline: none;
    border: none;
  }
  #icon{
    font-size: ${props => props.size*1.3}rem;
    position: absolute;
    top: 50%;
    left: 3.2rem;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
`