import React from 'react';
import styled from 'styled-components';

export default function Layout({ children }) {
  return (
    <Wrapper>
      <FirstSection>{children[0]}</FirstSection>
      <SecondSection>{children[1]}</SecondSection>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  padding: 2rem 8.5%;
  display: flex;
  gap: 7rem;
  background-color: var(--blue2);
`
const FirstSection = styled.div`
  width: 53%;
  /* border: 1px solid red; */
`
const SecondSection = styled.div`
  flex: 1;
  border: 1px solid green;
`