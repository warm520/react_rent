import React from 'react'
import { NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
export default function Navbar({ title, right }) {
  const history = useNavigate()
  return (
    <NavBar
      right={right}
      onBack={() => {
        history.toString(-1)
      }}
    >
      {title}
    </NavBar>
  )
}
