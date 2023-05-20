import React from 'react';
import styled from 'styled-components';

export default function Button({ children, size, isActive=true, onClick, style, className }) {
  return (
    <Wrapper className={className} style={style} onClick={onClick} size={size} isActive={isActive}>
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
  color: ${ props => props.isActive ? 'var(--white1)' : 'var(--black1)'};
  background-color: ${ props => props.isActive ? 'var(--black1)' : 'transparent'};
  border: ${ props => props.isActive ? 'none' : '1px solid var(--black1)' };
`