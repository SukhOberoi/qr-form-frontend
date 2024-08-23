import React from 'react'
import Form from './Form.jsx'
import Closed from './Closed.jsx'

export default function App() {
    const currentTime = new Date();
    const closeTime = new Date('2024-08-14T09:30:00Z');
    const formOpen = true //currentTime < closeTime
  return (
    <>
      {formOpen ? <Form /> : <Closed />}
    </>
  )
}
