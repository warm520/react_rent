import React from 'react'
import './index.css'
export default function HousePackage({supporting}) {
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
];
  return (
    <div class="housePackageList">
      {
        HOUSE_PACKAGE.map((item)=>{
          if(item){
            if(supporting.includes(item.name)){
              // console.log('ok')
              return (
                <div key={item.id} className='housePackageItem'>
                  <i className={`iconfont ${item.icon}`}></i>
                  <p>{item.name}</p>
                </div>
              )
            }
          }else{
            return 'none selected'
          }
        })
      }
    </div>
  )
}
