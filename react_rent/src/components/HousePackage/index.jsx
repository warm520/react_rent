import React, { useState } from 'react'
import './index.css'
export default function HousePackage({ supporting, select, onSelect }) {
  // console.log(supporting)
  const HOUSE_PACKAGE = [
    {
      id: 1,
      name: '衣柜',
      icon: 'icon-wardrobe'
    },
    {
      id: 2,
      name: '洗衣机',
      icon: 'icon-wash'
    },
    {
      id: 3,
      name: '空调',
      icon: 'icon-air'
    },
    {
      id: 4,
      name: '天然气',
      icon: 'icon-gas'
    },
    {
      id: 5,
      name: '冰箱',
      icon: 'icon-ref'
    },
    {
      id: 6,
      name: '暖气',
      icon: 'icon-Heat'
    },
    {
      id: 7,
      name: '电视',
      icon: 'icon-vid'
    },
    {
      id: 8,
      name: '热水器',
      icon: 'icon-heater'
    },
    {
      id: 9,
      name: '宽带',
      icon: 'icon-broadband'
    },
    {
      id: 10,
      name: '沙发',
      icon: 'icon-sofa'
    }
  ]
  // 设置房屋配置列表
  const [packList, setPackList] = useState([])
  const clickValue = (value) => {
    let newPackList = []
    if (packList.includes(value)) {
      newPackList = [...packList]
      const index = newPackList.indexOf(value)
      newPackList.splice(index, 1)
    } else {
      newPackList = [...packList, value]
    }
    onSelect(newPackList)
    setPackList([...newPackList])
  }
  const renderHousePackage = () => {
    if (supporting) {
      return HOUSE_PACKAGE.map((item) => {
        if (supporting.includes(item.name)) {
          return (
            <div key={item.id} className="unactive">
              <i className={`iconfont ${item.icon}`}></i>
              <p>{item.name}</p>
            </div>
          )
        }else{
          return <div></div>
        }
      })
    } else if (select) {
      return HOUSE_PACKAGE.map((item) => {
        const isSelected = packList.includes(item.name)
        return (
          <div
            key={item.id}
            className={`unactive ${isSelected ? 'active' : ''}`}
            onClick={(value) => {
              clickValue(item.name)
            }}
          >
            <i className={`iconfont ${item.icon}`}></i>
            <p>{item.name}</p>
          </div>
        )
      })
    } else {
      return 'none selected'
    }
  }
  return <div class="housePackageList">{renderHousePackage()}</div>
}
