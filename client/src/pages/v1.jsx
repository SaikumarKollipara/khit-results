import React from 'react'
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { FiSearch } from "react-icons/fi";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';

export default function Home() {
  const [rollNo, setRollNo] = useState(''); 
  const [student, setStudent] = useState({});
  const [display, setDisplay] = useState('search');
  const [subjects, setSubjects] = useState([]);

  const printComponentRef = useRef();
  
  async function handleSearch(e) {
    try {
      e.preventDefault();
      const { data } = await axios.get(`http://localhost:5000/api/v1/results/${rollNo}`);
      const tempStudent = {
        sems: [],
        total: {}
      }
      for (const sem in data.student.sems) {
        if (data.student.sems[sem].final.results.length > 0) {
          tempStudent.sems.push({ name: sem, results: data.student.sems[sem].final.results, backlogs: data.student.sems[sem].final.backlogs });
        }
      }
      tempStudent.total = data.student.finalResult;
      setStudent(tempStudent);
      setDisplay('sems');
      console.log(tempStudent)
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
  }

  const handlePrint = useReactToPrint({ content: () => printComponentRef.current })
  
  return <>
    <Wrapper ref={printComponentRef} >
      {display === 'search' && <Header>KHIT RESULTS</Header>}
      <Input display={display} onSubmit={handleSearch}>
        <input onChange={(e) => { setRollNo(e.target.value) }} type="text" placeholder='Enter your Roll No' />
        <FiSearch onClick={handleSearch} className='icon' />
      </Input>
      {
        display === 'sems' && 
        <DisplayResults>
          {student.sems.map( sem => <Sem onClick={() => {setDisplay('subjects'); setSubjects(sem.results)}}><h2>{sem.name}st SEM</h2><button>Details</button></Sem>)}
        </DisplayResults>
      }
      {
        display === 'subjects' && 
        <DisplayResults >
          <div className='navigation'>
            <p onClick={() => {setDisplay('sems')}}>{'< Back'}</p>
            <button onClick={handlePrint} >print</button>
          </div>
          <Subject style={{backgroundColor: 'dodgerblue', color: 'white'}}>
              <p style={{flex: 2}}>Subject Name</p>
              <p style={{flex: 1}}>Grade</p>
              <p style={{flex: 1}}>Credits</p>
            </Subject> 
          {subjects.map( subject => 
            <Subject>
              <span>{subject.subName}</span>
              <span>{subject.grade}</span>
              <span>{subject.credits}</span>
            </Subject> 
          )}
        </DisplayResults> 
      }
    </Wrapper>
    {/* <ToastContainer />  */}
  </>
}


const Wrapper = styled.div`
  width: 100%;
`
const Header = styled.div`
  font-size: 3rem;
  font-weight: bold;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 0);
`
const Input = styled.form`
  width: 55%;
  height: 3rem;
  padding: 5px 60px;
  background-color: white;
  position: absolute;
  top: ${props => props.display === 'search' ? '50%' : '4rem' };
  left: 50%;
  transform: translate(-50%, -100%);
  /* transition: all 0.5s ease-in; */
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.20);
  input{
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    outline: none;
    font-size: 1.3rem;
    color: #505050;
  }
  .icon{
    position: absolute;
    top: 50%;
    font-size: 1.5rem;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
`
const DisplayResults = styled.div`
  width: 65%;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);
  margin-bottom: 20px;
  .navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    p{
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
    }
    button {
      background-color: dodgerblue;
      padding: 5px 17px;
      border: none;
      border-radius: 3px;
      font-size: 1rem;
      color: white;
      cursor: pointer;
    }
  }
`
const Sem = styled.div`
  width: 100%;
  height: 100px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px 10px;
  button {
    background-color: dodgerblue;
    border: none;
    font-size: 1.2rem;
    border-radius: 3px;
    outline: none;
    color: white;
    padding: 7px 15px;
    cursor: pointer;
  }
`
const Subject = styled.div`
    width: 100%;
    height: 3rem;
    background-color: white;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 10px 10px;
    span:nth-child(1){
      flex: 2;
    }
    span:nth-child(2){
      flex: 1;
    }
    span:nth-child(3){
      flex: 1;
    }
`