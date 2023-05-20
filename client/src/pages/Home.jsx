import React, { useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios';

import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import { BACKEND_URL } from '../data/constants';

export default function Home() {
  (async () => {
    await axios.get(BACKEND_URL);
  })();
  return (
    <Wrapper>
      <Header>
        <Logo src='/assets/images/logo.png' />
        <Links>
          <span className="register">Register</span>
          <span className="or">or</span>
          <Button size={'var(--font-size2)'} color={'white'} bg={'black'}>Login</Button>
        </Links>
      </Header>
      <ContentContainer>
        <Content>
          <p className='para1'>One stop for all your</p>
          <p className='para2'>Exam Results.</p>
          <p className='para3'>Getting results online made easy</p>
          <p className='para4'>All we need is just you roll no.</p>
          <SearchBar className={'searchBar'} style={{marginTop: '3.5rem'}} size={'1.15rem'} />
        </Content>
        <Image src='/assets/images/exams-bro.svg' />
      </ContentContainer>
    </Wrapper>
  )
}


const Header = styled.div`
  width: 100%;
  /* margin-top: 2rem; */
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Logo = styled.img` 
  width: 4rem;
`
const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  .register {
    font-size: calc(var(--font-size3) - 4px);
    font-weight: var(--font-weight4);
    cursor: pointer;
  }
  .or {
    font-size: var(--font-size2);
    font-weight: var(--font-weight4);
  }
`

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  flex: 1;
`
const Content = styled.div`
  width: 50%;
  z-index: 1;
  .para1{
    font-size: var(--font-size5);
    line-height: 1;
  }
  .para2{
    font-size: var(--font-size5);
    font-weight: var(--font-weight4);
  }
  .para3, .para4{
    font-size: var(--font-size3);
    font-weight: var(--font-weight3);
    margin-top: 5px;
  }
`
const Image = styled.img`
  width: 30rem;
  position: absolute;
  right: -5%;
`
const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  padding: 2rem 13%;
  background-image: linear-gradient(to bottom left, var(--blue1), var(--white2));
  display: flex;
  flex-direction: column;
  .searchBar {
    width: 90%;
  }

  @media screen and (max-width: 1025px) {
    && ${ContentContainer} {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    && ${Content} {
      width: 100%;
      text-align: center;
    }
    && ${Image} {
      position: absolute;
      bottom: -2rem;
      right: -2rem;
      opacity: 0.4;
    }
    .searchBar {
      width: 25rem;
      margin: 0 auto;
    }
  }
  @media screen and (max-width: 501px) {
    padding: 20px;
    && ${Header} {
      margin-top: 0;
    }
    && ${Logo} {
      width: 3rem;
    }
    && ${Image} {
      position: absolute;
      width: 105%;
      bottom: -5%;
      opacity: 0.4;
    }
    .searchBar {
      width: 100%;
    }
    
  }

`