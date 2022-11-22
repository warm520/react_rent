import React, { useState } from 'react'
import { SearchBar } from 'antd-mobile'
import { useCity, axiosAPI as axios } from '../../../utils/index.js'
import NoHouse from '../../../components/NoHouse/index.jsx'
import './index.css'
import { useNavigate } from 'react-router-dom'
export default function RentSearch() {
  const history = useNavigate()
  const [cityValue] = useCity()
  // 当前房屋队列
  const [tipsList, setTipsList] = useState([])
  const handelSearch = async (val) => {
    if (!val) {
      return setTipsList([])
    }
    var timer = null
    clearTimeout(timer)
    timer = setTimeout(async () => {
      const result = await axios.get('/area/community', {
        params: {
          name: val,
          id: cityValue
        }
      })
      if (result.data.status === 200) {
        setTipsList(result.data.body)
      }
    }, 500)
  }
  const renderTips = () => {
    if (tipsList.length === 0) {
      return <NoHouse>这里空空如也，换个词试试吧</NoHouse>
    }

    return (
      <div className="tips">
        {tipsList.map((item) => {
          return (
            <div
              className="tip"
              key={item.community}
              onClick={() => {
                history('/rent/add', {
                  replace:true,
                  state: { name: item.communityName, id: item.community }
                })
              }}
            >
              {item.communityName}
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <>
      {/* <div className="searchHeader"> */}
      <SearchBar
        placeholder="请输入小区或地址"
        className="search"
        showCancelButton={() => true}
        onChange={(val) => {
          handelSearch(val)
        }}
      />
      <dic className="tips">{renderTips()}</dic>
      {/* </div> */}
    </>
  )
}
