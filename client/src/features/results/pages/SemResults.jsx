import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout';

export default function SemResults() {
  const { sem, rollNo } = useParams();
  return (
    <Layout></Layout>
  )
}
