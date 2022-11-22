import React, { useEffect, useState } from 'react'
import { useCity } from '../../../utils/city'
import SearchBars from '../../../components/SearchBar'
import { Link, useNavigate } from 'react-router-dom'
import { Toast, List as AList } from 'antd-mobile'
import Filter from './components/Filter'
import { axiosAPI } from '../../../utils'
import NoHouse from '../../../components/NoHouse'
import HouseItem from '../../../components/HouseItem'
import './index.css'
export default function Search() {
  // 设置当前筛选条件
  const [filters, setFilters] = useState([])
  // console.log(filters)
  // 获取当前城市
  const [cityValue, cityLabel] = useCity()
  // 房源列表
  const [houseList, setHouseList] = useState([])
  // 房源数量
  const [houseCount, setHouseCount] = useState(0)
  useEffect(() => {
    const getHouseList = async (filters, id) => {
      Toast.show({
        icon: 'loading',
        content: '加载中...'
      })
      // console.log('ok')
      const result = await axiosAPI.get(`/houses`, {
        params: {
          cityId: id,
          ...filters,
          start: 1,
          end: 20
        }
      })
      // console.log(result)
      setHouseList(result.data.body.list)
      setHouseCount(result.data.body.count)
      Toast.clear()

      // if (result.data.body.count > 0) {
      //   Toast.show({
      //     icon: 'success',
      //     content: `已经找到${result.data.body.count}套房源`
      //   })
      // }
    }
    getHouseList(filters, cityValue)
    // Toast.clear()
  }, [filters, cityValue])
  return (
    <>
      <div className="searchHome">
        {/* 头部栏 */}
        <Header city={cityLabel} />
        {/*  */}
        <Filter filters={filters} setFilters={setFilters}></Filter>
        {/* 房源列表 */}
        <div className="houses">
          <HouseList
            filters={filters}
            houseList={houseList}
            setHouseList={setHouseList}
            houseCount={houseCount}
            cityValue={cityValue}
          />
        </div>
      </div>
    </>
  )
}

const Header = ({ city }) => {
  const history = useNavigate()
  return (
    <>
      <div className="searchHeader">
        <i
          className="iconfont icon-back"
          onClick={() => {
            history(-1)
          }}
        ></i>
        <SearchBars city={city} />
      </div>
    </>
  )
}

const HouseList = ({ filters, houseList, houseCount, cityValue }) => {
  if (houseCount === 0) {
    return <NoHouse />
  }

  return (
    <AList>
      {houseList.map((item, index) => {
        // console.log(item)
        return (
          <Link to={`/detail/${item.houseCode}`}>
            <HouseItem
              key={index}
              src={item.houseImg}
              title={item.title}
              desc={item.desc}
              tags={item.tags}
              price={item.price}
              houseCode={item.houseCode}
            />
          </Link>
        )
      })}
    </AList>
  )
}
