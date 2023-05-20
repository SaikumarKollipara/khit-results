import styled from 'styled-components';
export default function SmallScreenLayout({ children }) {
  return (
    <Wrapper>
      <div className="navbar">
        {children[0]}
      </div>
      <div className="header-tile">
        {children[1]}
      </div>
      <div className="roll-no">
        {children[2]}
      </div>
      <div className="buttons">
        {children[3]}
      </div>
      <div className="data-container">
        {children[4] || children[5]}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;  
  height: 100vh;
  overflow: hidden;
  padding: 1.6rem 1rem;
  background-color: var(--blue2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .data-container {
    flex-grow: 1;
    overflow: scroll;
    overflow-x: hidden;
  }
`
