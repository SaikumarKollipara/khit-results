import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return (
    <Wrapper>Developed by <a target='_blank' href="https://www.linkedin.com/in/saikumar-kollipara-1162b6199/">Krksaikumar</a></Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  font-size: 14px;
  text-align: center;
  position: fixed;
  bottom: 0;
  padding-bottom: 5px;
  z-index: 10;
`