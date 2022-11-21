import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/NavBar'
import NoHouse from '../../components/NoHouse'
import HouseItem from '../../components/HouseItem'
import { axiosAPI as axios } from '../../utils'
import './index.css'
export default function Favorite() {
  // 设置Favorite列表
  const [favoriteList, setFavoriteList] = useState([])
  useEffect(() => {
    const getFavoriteList = async () => {
      const result = await axios.get('/user/favorites')
      console.log(result)
      setFavoriteList(result.data.body)
    }
    getFavoriteList()
  }, [])
  return (
    <div className="favorite">
      <Navbar title={'我的收藏'} color="#f5f6f5" />
      <FavoriteList favoriteList={favoriteList} />
    </div>
  )
}

const FavoriteList = ({ favoriteList }) => {
  const history = useNavigate()
  if (favoriteList.length === 0) {
    return (
      <NoHouse>
        您还没有收藏房源，快去
        <Link to="/home/search">收藏房源</Link>
      </NoHouse>
    )
  }
  return (
    <>
      <div className="favoriteHouseList">
        {favoriteList.map((item) => {
          console.log(item)
          return (
            <div className="favHouseLIstItem" key={item.houseCode}>
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
          )
        })}
      </div>
      <div
        className="favBottom"
        onClick={() => {
          history('/home/search')
        }}
      >
        去收藏
      </div>
    </>
  )
}
