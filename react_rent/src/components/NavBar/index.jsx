import React from 'react'
import { NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
export default function Navbar({ title, right, color, fontColor }) {
  const history = useNavigate()
  return (
    <NavBar
      right={right}
      onBack={() => {
        history(-1)
      }}
      style={{ backgroundColor: color, color: fontColor }}
    >
      {title}
    </NavBar>
  )
}
