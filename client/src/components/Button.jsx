import React from 'react';
import styled from 'styled-components';

export default function Button({ children, size, color, bg }) {
  return (
    <Wrapper size={size} color={color} bg={bg}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.button`
  padding: 8px 25px;
  border-radius: var(--border-radius3);
  font-size: ${ props => props.size }rem;
  color: ${ props => props.color };
  background-color: ${ props => props.bg };
`