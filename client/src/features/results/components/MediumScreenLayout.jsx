import styled from 'styled-components';
import NavBar from './NavBar';

export default function MediumScreenLayout({ children }) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;  
  padding: 2.2rem 8.5%;
  background-color: var(--blue2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
