import styled from "styled-components";
import Button from "../../../components/Button";
import { useReactToPrint } from "react-to-print";

export default function Heading({ text, printComponentRef }) {
  const handlePrint = useReactToPrint({ content: () => printComponentRef.current });
  return (
    <Wrapper className='heading'>
      <div className="name">{text}</div>
      {printComponentRef && 
        <Button onClick={handlePrint} style={{ padding: '8px 20px' }} size={"var(--font-size1)"} >Save as PDF</Button>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .name {
    font-size: var(--font-size3);
    font-weight: var(--font-weight4);
  }

`