import React from 'react'
import Form from './Form.jsx'
import Closed from './Closed.jsx'
import { Routes, Route } from "react-router-dom";
import Admin from './Admin.jsx';
import RecruitmentPanel from "./components/RecruitmentPanel.jsx"
import CQPanel from "./components/CQPanel.jsx"

export default function App() {
    const currentTime = new Date();
    const closeTime = new Date('2024-08-14T09:30:00Z');
    const formOpen = true //currentTime < closeTime
  return (
    <>
    <Routes>
      <Route path="/" element={formOpen ? <Form /> : <Closed />}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/recruitments" element={<RecruitmentPanel/>}/>
      <Route path="/cq" element={<CQPanel/>}/>
    </Routes>
    </>
  )
}