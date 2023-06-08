import styled from 'styled-components';
import { BiBell, BiUserCircle } from 'react-icons/bi';

import SearchBar from '../../../components/SearchBar'

export default function LargeScreenLayout({ children=['', ''] }) {
  return (
    <Wrapper>
      <FirstSection>
        <div className="header-container">
          {children[0]}
        </div>
        <div className="heading">
          {children[1]}
        </div>
        <div className="results-container">
          {children[2]}
        </div>
      </FirstSection>
      <SecondSection>
        <div className="navbar">
          {children[3]}
        </div>
        <div className="heading">
          {children[4]}
        </div>
        <div className="overview">
          {children[5]}
        </div>
      </SecondSection>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  padding: 2.2rem 8.5%;
  display: flex;
  gap: 7rem;
  background-color: var(--blue2);

  @media (max-width: 1371px) {
    padding: 2rem 4rem;
    gap: 3rem;
  }
`
const FirstSection = styled.div`
  width: 69%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .heading{
    margin-bottom: 1rem;
  }
  .header-container {
    margin-bottom: 3rem;
  }
  .results-container {
    flex-grow: 1;
    overflow-x: hidden;
  }
`
const SecondSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  overflow: hidden;
  .heading{
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
`