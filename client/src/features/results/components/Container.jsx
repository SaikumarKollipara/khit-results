import React from 'react';
import styled from 'styled-components';

export default function Container({ children, style }) {
  return (
    <Wrapper style={style} >
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 110px;
  background-color: var(--white2);
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: var(--border-radius1 );
`
