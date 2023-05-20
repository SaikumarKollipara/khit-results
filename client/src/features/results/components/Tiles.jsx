import styled from 'styled-components';

import CircularProgress from './CircularProgress';
import Container from './Container';

export function TextTile({ title, description }) {
  const isBacklog = description.toLowerCase().includes('backlogs');
  return <Wrapper>
    <p className="title">{title}</p>
    <p style={{ textDecoration: isBacklog ? 'Underline' : 'none'}} className="description">{description}</p>
  </Wrapper>
}

export function ProgressTile({ progress, text, type }) {
  return <Wrapper>
    <CircularProgress number={progress.toFixed(2)} type={type} />
    <p className='description progress' >{text}</p>
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
  .title {
    font-size: calc(var(--font-size4) + 4px);
    font-weight: var(--font-weight4);
    text-decoration: ${props => props.isUnderline ? 'underline' : 'none'};
  }
  .description {
    font-size: var(--font-size1);
  }
`