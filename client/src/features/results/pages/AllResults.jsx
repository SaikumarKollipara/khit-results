import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Layout from '../components/Layout';
import Heading from '../components/Heading';
import { useNavigate } from 'react-router-dom';

export default function AllResults() {
  const navigate = useNavigate();
  const { student } = useSelector( store => store.results )
  useEffect(()=>{
    if(Object.keys(student).length === 0) {
      navigate('/');
      toast.warning('Search using Roll No');
      return;
    };
    toast.success(`Results of ${student.rollNo}`);
  }, [])
  console.log(student)
  return (
    <Layout>
      <FirstSection>
        <Heading>
          <div className='content'>
            <Greeting>Hello 198X1A0575!</Greeting>
            <Description>It's good to see you again.</Description>
          </div>
          <WavingHand src='/assets/images/waving-hand.png' />
        </Heading>
        <p>Results of {student.rollNo}</p>
        <Semesters>

        </Semesters>
      </FirstSection>
      <SecondSection className="second-section">fskljldfskj</SecondSection>
    </Layout>
  )
}

const FirstSection = styled.div`
`
const SecondSection = styled.div`
`
const Greeting = styled.p`
  font-size: var(--font-size4);
  font-weight: var(--font-weight4);
`
const Description = styled.p`
  font-size: var(--font-size2);
  font-weight: var(--font-weight3);
`
const WavingHand = styled.img`
  width: 95px;
`
const Semesters = styled.div`
  
`