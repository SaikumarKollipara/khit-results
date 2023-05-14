import React from 'react'
import styled from 'styled-components';

import Button from '../components/Button';
import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <Wrapper>
      <Header>
        <Logo>KHIT</Logo>
        <Links>
          <span className="register">Register</span>
          <span className="or">or</span>
          <Button color={'white'} bg={'black'}>Login</Button>
        </Links>
      </Header>
      <ContentContainer>
        <Content>
          <p className='para1'>One stop for all your</p>
          <p className='para2'>Exam Results.</p>
          <p className='para3'>Getting results online made easy</p>
          <p className='para4'>All we need is just you roll no.</p>
          <SearchBar style={{marginTop: '3.5rem'}} width={'29rem'} size={'1.15rem'} />
        </Content>
        <Image src='/assets/images/exams-bro.svg' />
      </ContentContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  padding: 0 13%;
  background-image: linear-gradient(to bottom left, var(--blue1), var(--white2));
  display: flex;
  flex-direction: column;
  `
const Header = styled.div`
  width: 100%;
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0 13%;
  position: fixed;
  top: 0;
  left: 0; */
`
const Logo = styled.span` 
  font-size: 2rem;
  font-weight: var(--font-weight4);
`
const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  .register {
    font-size: 20px;
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
  /* margin-top: 9rem; */
  /* border: 1px solid red; */
`
const Content = styled.div`
  width: 50%;
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
  width: 43%;
  position: absolute;
  right: -5%;
`