import styled from "styled-components";
import { useSelector } from "react-redux";

import { getPercentage } from "../../../utils/helpers";
import Graph from "./Graph";
import { ProgressTile, TextTile } from "./Tiles";

export default function Overview({ backlogs, gpa, type }) {
  const { student } = useSelector( store => store.results );
  let gpaText = '';
  if (type === 'semesters') gpaText = 'Total CGPA';
  else if (type === 'subjects') gpaText = 'Total SGPA';
  return <>
    <GridContainer >
      <TextTile title={student.regulation.toUpperCase()} description={student.branch} />
      <TextTile title={backlogs.length} description={'Total Backlogs'} />
      <ProgressTile progress={gpa} text={gpaText} type={'gpa'} />
      <ProgressTile progress={getPercentage(gpa)} text={'Total Percentage'} type={'percentage'} />
      {type === 'semesters' && <div id='graph'><Graph /></div>}
    </GridContainer>
  </>
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: calc(50% - 10px) calc(50% - 10px);
  grid-template-rows: 115px 115px auto;
  gap: 10px;
  #graph {
    grid-column: 1 / -1;
  }
`