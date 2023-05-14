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
  border: none;
  outline: none;
  padding: 10px 21px;
  border-radius: var(--border-radius1);
  font-size: ${ props => props.size ? props.size : '1.185rem' };
  color: ${ props => props.color ? props.color : 'var(--white1)'};
  background-color: ${ props => props.bg ? props.bg : 'var(--black1)'};
  cursor: pointer;
`