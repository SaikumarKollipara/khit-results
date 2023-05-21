import styled from "styled-components";

export function GreetingTile() {
  return <>
    <Wrapper>
      <div className='content'>
        <GreetingText>Hello There!</GreetingText>
        <Description>It's good to see you again.</Description>
      </div>
      <WavingHand src='/assets/images/waving-hand.png' />
    </Wrapper>
  </>
}

export function SemesterTile({ rollNo, number }) {
  return <>
    <Wrapper>
      <div className='content'>
        <Description style={{fontSize: 'var(--font-size1)'}} >Results of</Description>
        <GreetingText>{rollNo.toUpperCase()}</GreetingText>
      </div>
      <SemesterNumber>{number}</SemesterNumber>
    </Wrapper>
  </>
}

const GreetingText = styled.p`
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
const SemesterNumber = styled.p`
  font-size: calc(var(--font-size4) + 1rem);
  font-weight: var(--font-weight4);
  &::after {
    content: 'sem';
    position: relative;
    font-size: var(--font-size2); 
  }
`
const Wrapper = styled.div`
  width: 100%;
  min-height: 150px;
  border-radius: var(--border-radius3);
  background-color: var(--white2);
  display: flex;
  justify-content: center;
  gap: 9rem;
  align-items: center;
  @media (max-width: 600px) {
    gap: 1.8rem;
    justify-content: space-evenly;
    && ${WavingHand} {
      width: 4rem;
    }
    && ${GreetingText} {
      font-size: var(--font-size3);
    }
    && ${SemesterNumber} {
      font-size: var(--font-size5);
    }
  }
`
