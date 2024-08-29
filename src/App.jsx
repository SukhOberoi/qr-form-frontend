import React from 'react'
import Form from './Form.jsx'
import Closed from './Closed.jsx'
import { Routes, Route, Switch, Redirect } from "react-router-dom";
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
      <Switch>
      <Route exact path="/" element={formOpen ? <Form /> : <Closed />}/>
      <Route exact path="/admin" element={<Admin/>}/>
      <Route exact path="/recruitments" element={<RecruitmentPanel/>}/>
      <Route exact path="/cq" element={<CQPanel/>}/>
      <Route exact path="*" component={() => <Redirect to={"/"} />} />
      </Switch>
    </Routes>
    </>
  )
}
