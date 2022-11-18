import React, { useState, useEffect } from 'react'
import Navbar from '../../components/NavBar'
import { axiosAPI as axios } from '../../utils'
import { getCurrentCity } from '../../utils/city'
import { Space, IndexBar, List as AList } from 'antd-mobile'
import { SearchOutline } from 'antd-mobile-icons'
import { setCity,getCity } from '../../utils/city'
import './index.css'
// import { get } from 'store'
export default function CityLists() {
  return (
    <div className="cityList">
      <Navbar
        title={'城市选择'}
        right={
          <div style={{ fontSize: '18px' }}>
            <Space>
              <SearchOutline />
            </Space>
          </div>
        }
      />
      <AntList />
    </div>
  )
}

// 自定义获取城市列表的hook
const useCityList = () => {
  const [aList, setAList] = useState({})
  const [aIndex, setAIndex] = useState([])

  useEffect(() => {
    const getCityData = async () => {
      // 获取一级城市数据
      const result = await axios.get('/area/city', { params: { level: 1 } })
      // console.log(result)
      // 获取热门城市数据
      const hotResult = await axios.get('/area/hot')
      // console.log(hotResult.data.body)
      // 获取城市列表的列表索引
      const { cityList, cityIndex } = formatData(result.data.body)
      // 获取热门城市，插入到城市列表前面
      cityList['hot'] = hotResult.data.body
      cityIndex.unshift('hot')
      // 获取当前城市
      const currentCity = await getCurrentCity()
      console.log(currentCity)
      cityList['#'] = [currentCity]
      cityIndex.unshift('#')

      // 更新城市列表和城市索引
      setAList(cityList)
      setAIndex(cityIndex)
    }
    getCityData()
  }, [])
  return { aList, aIndex }
}

// 城市列表数据排序
const formatData = (list) => {
  const cityList = {}
  list.forEach((item) => {
    // 获取当前城市的首字母
    const first = item.short.substr(0, 1)
    // console.log(first)
    if (cityList[first]) {
      cityList[first].push(item)
    } else {
      cityList[first] = [item]
    }
  })
  // 排序列表的索引字母
  const cityIndex = Object.keys(cityList).sort()
  return { cityList, cityIndex }
}
// 更改当前城市
const changeCity = (list) => {
  console.log(list)
  const {label,value} = list
  setCity(JSON.stringify({label,value}))
  window.history.go(-1)
}
const AntList = () => {
  const { aList, aIndex } = useCityList()
  console.log(aList)
  return (
    <div style={{ height: window.innerHeight }}>
      <IndexBar className='cityList'>
        {Object.keys(aList)
          .sort((first, next) => {
            // 创建'a'的unicode位置
            const charCodeOfa = 'a'.charCodeAt(0)
            // 根据'a'的unicode位置生成字母表
            const alphabet = Array.from(new Array(26), (ele, index) => {
              return String.fromCharCode(charCodeOfa + index)
            })
            //创建Index的排列顺序
            const order = ['#', 'hot', ...alphabet]
            // console.log(order)
            return order.indexOf(first) - order.indexOf(next)
          })
          .map((k) => {
            var m = []
            for (var i = 0; i < aList[k].length; i++) {
              m.push(aList[k][i])
            }
            return (
              <IndexBar.Panel
                index={k === 'hot' ? '热' : k}
                title={
                  k === '#' ? '当前城市' : k === 'hot' ? '热门城市' : k.toUpperCase()
                  
                }
                key={k}
                className='city'
              >
                <AList>
                  {m.map((list, index) => {
                    return (
                      <AList.Item
                        key={index}
                        clickable={true}
                        arrow={false}
                        onClick={() => {
                          changeCity(list)
                        }}
                        className='cityItem'
                      >
                        {list.label}
                      </AList.Item>
                    )
                  })}
                </AList>
              </IndexBar.Panel>
            )
          })}
      </IndexBar>
    </div>
  )
}
