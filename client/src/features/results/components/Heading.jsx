import React from 'react';
import styled from 'styled-components';

export default function Heading({ children }) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 150px;
  border-radius: var(--border-radius3);
  background-color: var(--white2);
  display: flex;
  justify-content: center;
  gap: 6rem;
  align-items: center;
`