import styled from "styled-components";
import Header from "./Header";

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

export function SemesterTile() {
  
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
    gap: 1rem;
    && ${WavingHand} {
      width: 4rem;
    }
  }
`