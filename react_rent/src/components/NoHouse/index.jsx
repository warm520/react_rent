import React from 'react'
import './index.css'
import { BASE_URL } from '../../utils'
export default function NoHouse({children}) {
  return (
    <div className='NoHouse'>
      <img src={BASE_URL + '/img/not-found.png'} alt='暂无房源'/>
      <p className='msg'>{children}</p>
    </div>
  )
}
