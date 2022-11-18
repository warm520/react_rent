import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../pages/HomePages/Home/index.css'
const SearchBars = ({city})=>{
  const history = useNavigate()
  return(
    <div className='searchBar'>
      <div className="search">
        <span onClick={()=>{history('/citylist')}}>{city}</span>
        <i className='iconfont icon-arrow'></i>

        <div className="form">
          <i className='iconfont icon-seach'></i>
          <span>
            请输入小区地址
          </span>
        </div>
      </div>

      <i className='iconfont icon-map' onClick={()=>{history('/map')}}></i>
    </div>
  )
}

export default SearchBars
