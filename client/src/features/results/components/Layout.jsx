import React from 'react';
import styled from 'styled-components';
import { BiBell, BiUserCircle } from 'react-icons/bi';

import SearchBar from '../../../components/SearchBar'

export default function Layout({ children=['', ''] }) {
  return (
    <Wrapper>
      <FirstSection>{children[0]}</FirstSection>
      <SecondSection>
        <NavBar>
          <SearchBar width={'80%'} boxShadow={false} size={'var(--font-size2)'} />
          <BiBell className='notification' />
          <BiUserCircle className='profile' />
        </NavBar>
        {children[1]}
      </SecondSection>
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
  /* border: 1px solid green; */
`
const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 3rem;
  .notification, .profile {
    cursor: pointer;
  }
  .notification {
    font-size: 2.1rem;
  }
  .profile {
    font-size: 2.2rem;
  }
`