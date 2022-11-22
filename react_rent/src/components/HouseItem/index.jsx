import React from 'react'
import { BASE_URL } from '../../utils'
import './index.css'
import { Tag } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
export default function HouseItem({
  key,
  src,
  title,
  desc,
  tags,
  price,
  houseCode,
  button
}) {
  // console.log(key)
  const history = useNavigate()
  return (
    <div className="house">
      <div className="houseImg">
        <img src={`${BASE_URL}${src}`} alt="房源图" onClick={()=>{history(`/detail/${houseCode}`)}}/>
      </div>
      <div className="houseDetail">
        <div className="houseTitle">{title}</div>
        <div className="houseDesc">{desc}</div>
        {/* 标签 */}
        {tags.map((tag,index) => {
          return (
            <Tag color="#87d068" style={{ marginRight: '5px' }} key={index}> 
              {tag}
            </Tag>
          )
        })}
        {/* 价格 */}
        <div className="housePrice">
          <p>{price}元/月</p>
        </div>
        {button}
      </div>
    </div>
  )
}
