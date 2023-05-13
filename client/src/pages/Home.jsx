import React, { useState } from 'react'
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import Button from '../components/Button';
import SearchBar from '../components/SearchBar';

export default function Home() {

  const [rollNo, setRollNo] = useState('');
  
  async function handleSearch(e) {
    e.preventDefault();
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/results/${rollNo}`);
      console.log(data);
    } catch(err) {
      if (err.response) {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
  }
  
  return (
    <Wrapper>
      <Header>
        <Logo>KHIT</Logo>
        <Links>
          <span className="register">Register</span>
          <span className="or">or</span>
          <Button size={1.1875} color={'white'} bg={'black'}>Login</Button>
        </Links>
      </Header>
      <ContentContainer>
        <Content>
          <p className='para1'>One stop for all your</p>
          <p className='para2'>Exam Results.</p>
          <p className='para3'>Getting results online made easy</p>
          <p className='para4'>All we need is just you roll no.</p>
          <form onSubmit={handleSearch}>
            <SearchBar onChange={(e)=>setRollNo(e.target.value)} style={{marginTop: '3.5rem'}} width={29} size={1.15} />
          </form>
        </Content>
        <Image src='/assets/images/exams-bro.svg' />
      </ContentContainer>
      <ToastContainer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  padding: 0 13%;
  background-image: linear-gradient(to bottom left, var(--blue1), var(--white2));
`
const Header = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Logo = styled.span` 
  font-size: var(--font-size3);
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
  position: relative;
  margin-top: 11rem;
`
const Content = styled.div`
  width: 50%;
  .para1{
    font-size: var(--font-size4);
    line-height: 1;
  }
  .para2{
    font-size: var(--font-size4);
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
  bottom: -18%;
  right: -5%;
`