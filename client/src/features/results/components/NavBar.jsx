import styled from "styled-components";
import { BiBell, BiUserCircle } from 'react-icons/bi';

import SearchBar from '../../../components/SearchBar'
import Heading from './Heading';

export default function NavBar() {
  return <>
    <Wrapper>
      <SearchBar width={'80%'} boxShadow={false} size={'var(--font-size2)'} />
      <BiBell className='notification' />
      <BiUserCircle className='profile' />
    </Wrapper>
  </>
}

const Wrapper = styled.nav`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-around;
  align-items: center;
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
