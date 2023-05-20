import axios from 'axios';
import React, { useState } from 'react'
import { BACKEND_URL } from '../../data/constants';

export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    examType: '',
    sem: '',
    availableRegulations: [],
    examDate: '',
    resultsFile: ''
  })
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const form = new FormData();
      form.append('examType', formData.examType)
      form.append('sem', formData.sem)
      form.append('availableRegulations', formData.availableRegulations)
      form.append('examDate', formData.examDate)
      form.append('file', formData.resultsFile)
      setLoading(true)
      const res = await axios.post(`${BACKEND_URL}/api/v1/results/upload`, form);
      setLoading(false)
      console.log(res.data);
    } catch (err) {
      //refresh page when upload file changed
      console.log(err.response.data)
      setLoading(false)
    }
  }
  function handleRegulation(e) {
    if (e.target.checked) {
      setFormData(prev => {return {...prev, availableRegulations: [...prev.availableRegulations, e.target.value]}})
    } else {
      setFormData(prev => {return {...prev, availableRegulations: prev.availableRegulations.filter(reg => reg !== e.target.value)}})
    }
  }
  console.log(formData)
  return <>
    <form onSubmit={handleSubmit}>
    <select required onChange={(e) => setFormData(prev => {return {...prev, sem: e.target.value}})} name='sem'>
        <option value=''>Select sem</option>
        <option value='1'>1-1</option>
        <option value='2'>1-2</option>
        <option value='3'>2-1</option>
        <option value='4'>2-2</option>
        <option value='5'>3-1</option>
        <option value='6'>3-2</option>
        <option value='7'>4-1</option>
        <option value='8'>4-2</option>
      </select><br />

      r19: <input onChange={handleRegulation} name='regulation' type='checkbox' value='r19' />
      r16: <input onChange={handleRegulation} name='regulation' type='checkbox' value='r16' />
      <br />

      <select required onChange={(e) => setFormData(prev => {return {...prev, examType: e.target.value}})} name='exam-type'>
        <option value=''>Select exam type</option>
        <option value='regular'>Regular</option>
        <option value='supply'>supply</option>
        <option value='regular and supply'>regular and supply</option>
        <option value='revaluation'>revaluation</option>
      </select><br />

      Date: <input required onChange={(e)=>setFormData(prev => {return {...prev, examDate: new Date(e.target.value)}})} type='month' />

      File: <input required onChange={(e)=>setFormData(prev => {return {...prev, resultsFile: e.target.files[0]}})} type='file' accept='.xlsx' />

      <input type="submit" />
    </form>
    {loading && <div>Loading...</div>}
  </>
}
