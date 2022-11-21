import React from 'react'
import { BASE_URL } from '../../utils'
import './index.css'
import { Tag } from 'antd-mobile'
export default function HouseItem({
  key,
  src,
  title,
  desc,
  tags,
  price,
  houseCode
}) {
  // console.log(key)
  return (
    <div className="house">
      <div className="houseImg">
        <img src={`${BASE_URL}${src}`} alt="房源图" />
      </div>
      <div className="houseDetail">
        <div className="houseTitle">{title}</div>
        <div className="houseDesc">{desc}</div>
        {/* 标签 */}
        {tags.map((tag) => {
          return (
            <Tag color="#87d068" style={{ marginRight: '5px' }}>
              {tag}
            </Tag>
          )
        })}
        {/* 价格 */}
        <div className="housePrice">
          <p>{price}元/月</p>
        </div>
      </div>
    </div>
  )
}
