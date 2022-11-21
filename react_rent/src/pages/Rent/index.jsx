import React, { useState, useEffect } from 'react'
import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/NavBar'
import NoHouse from '../../components/NoHouse'
import HouseItem from '../../components/HouseItem'
import { axiosAPI as axios } from '../../utils'
export default function Rent() {
  // 房源信息列表
  const [list, setList] = useState([])
  useEffect(() => {
    // 获取房源列表的函数
    const getRentList = async () => {
      const result = await axios.get('/user/houses')
      // console.log(result)
      setList(result.data.body)
    }
    getRentList()
  }, [list])
  return (
    <div className="rent">
      <Navbar title="我的出租" color="#f5f6f5" />
      <RentList list={list} />
    </div>
  )
}

const RentList = ({ list }) => {
  const history = useNavigate()
  if (list.length === 0) {
    return (
      <NoHouse>
        暂时还没有房源发布，去
        <Link to="/rent/add">发布房源</Link>吧
      </NoHouse>
    )
  }
  return (
    <>
      <div className="rentList">
        {list.map((item) => {
          return (
            <div className="rentListItem" key={item.houseCode}>
              <div className="rentListItem">
                <Link to={`/detail/${item.houseCode}`}>
                  <HouseItem
                    key={item.houseCode}
                    src={item.houseImg}
                    title={item.title}
                    desc={item.desc}
                    tags={item.tags}
                    price={item.price}
                    houseCode={item.houseCode}
                  />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
      <div
        className="rentBottom"
        onClick={() => {
          history('/rent/add')
        }}
      >发布房源</div>
    </>
  )
}
