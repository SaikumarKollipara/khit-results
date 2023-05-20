import styled from 'styled-components';

import CircularProgress from './CircularProgress';
import Container from './Container';

export function TextTile({ title, description }) {
  return <Wrapper>
    <p className="content">{title}</p>
    <p className="title">{description}</p>
  </Wrapper>
}

export function ProgressTile({ progress, text, type }) {
  return <Wrapper>
    <CircularProgress number={progress.toFixed(2)} type={type} />
    <p>{text}</p>
  </Wrapper>
}

const Wrapper = styled.div`
  min-height: 110px;
  background-color: var(--white2);
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: var(--border-radius1 );
`