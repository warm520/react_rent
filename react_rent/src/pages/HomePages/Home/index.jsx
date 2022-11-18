import React, { useState, useEffect } from 'react'
import './index.css'
import { Swiper, Grid } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import SearchBars from '../../../components/SearchBar/index.jsx'
import { useCity } from '../../../utils/city'
import { axiosAPI as axios } from '../../../utils'
import { BASE_URL } from '../../../utils'
import Nav1 from '../../../asserts/images/nav-1.png'
import Nav2 from '../../../asserts/images/nav-2.png'
import Nav3 from '../../../asserts/images/nav-3.png'
import Nav4 from '../../../asserts/images/nav-4.png'

export default function Home() {
  const [cityLabel, cityValue] = useCity()
  useEffect(() => {})
  return (
    <>
      <div className="swipers">
        <Swipers />
        <SearchBars city={cityValue} />
      </div>
      <Nav />
      <div className="group">
        <div className="groupTitle">
          <h3>
            租房小组
            <span>更多</span>
          </h3>
        </div>
        <Group cityLabel={cityLabel} />
      </div>
      <div className="news">
        <div className="groupTitle">
          <h3>最新资讯</h3>
        </div>
        <News cityLabel={cityLabel} />
      </div>
    </>
  )
}

// 轮播图组件
const Swipers = () => {
  const [swipersImg, setSwipersImg] = useState([])
  const [swipersLoaded, setsSwipersLoaded] = useState(false)
  useEffect(() => {
    console.log('ik')
    const getSwiperImgs = async () => {
      const res = await axios.get('/home/swiper')
      setSwipersImg(res.data.body)
      setsSwipersLoaded(true)
    }
    getSwiperImgs()
    // 卸载组件时取消加载状态
    return () => {
      setsSwipersLoaded(false)
    }
  }, [])
  const swipers = swipersImg.map((img) => {
    return (
      <Swiper.Item key={img.id}>
        <div>
          <img
            src={`${BASE_URL}${img.imgSrc}`}
            alt=""
            style={{ width: '100%' }}
          />
        </div>
      </Swiper.Item>
    )
  })

  return (
    setsSwipersLoaded && (
      <Swiper autoplay={true} loop={true}>
        {swipers}
      </Swiper>
    )
  )
}

// 导航区域
const Nav = () => {
  const navigate = useNavigate()
  const navs = [
    {
      id: 1,
      img: Nav1,
      title: '整租',
      key: '/home/search'
    },
    {
      id: 1,
      img: Nav2,
      title: '合租',
      key: '/home/search'
    },
    {
      id: 1,
      img: Nav3,
      title: '地图找房',
      key: '/home/search'
    },
    {
      id: 1,
      img: Nav4,
      title: '去出租',
      key: '/home/search'
    }
  ]

  return (
    <>
      <Grid columns={4} gap={8} className="nav">
        {navs.map((nav) => {
          return (
            <Grid.Item
              key={nav.id}
              onClick={() => {
                navigate(nav.key)
              }}
            >
              <div className="navGrid">
                <img src={nav.img} alt="" />
                <h2>{nav.title}</h2>
              </div>
            </Grid.Item>
          )
        })}
      </Grid>
    </>
  )
}

// 租房小组
const Group = ({ cityLabel }) => {
  const [groupList, setGroupList] = useState([])
  const [loadGroupList, setLoadGroupList] = useState(false)
  useEffect(() => {
    const getRentGroups = async () => {
      const res = await axios.get('/home/groups', {
        params: { area: cityLabel }
      })
      setGroupList(res.data.body)
      setLoadGroupList(true)
    }
    getRentGroups()
    return () => {
      setLoadGroupList(false)
    }
  }, [])
  const gridItems = groupList.map((list) => {
    return (
      <Grid.Item key={list.id} className="groupGridItem">
        <div className="desc">
          <p className="title">{list.title}</p>
          <span className="info">{list.desc}</span>
        </div>
        <img src={`${BASE_URL}${list.imgSrc}`} alt="" />
      </Grid.Item>
    )
  })
  return (
    loadGroupList && (
      <Grid columns={2} gap={12} className="groupGrid">
        {gridItems}
      </Grid>
    )
  )
}

// 最新资讯
const News = ({ cityLabel }) => {
  const [newsList, setnewsList] = useState([])
  const [loadNewsList, setLoadNewsList] = useState(false)
  useEffect(() => {
    console.log(cityLabel)
    const getNewsList = async () => {
      const res = await axios.get('/home/news', {
        params: {
          area: cityLabel
        }
      })
      setnewsList(res.data.body)
      setLoadNewsList(true)
    }
    getNewsList()
    return()=>{
      setLoadNewsList(false)
    }
  }, [])
  const newsGridItem = newsList.map((list) => {
    return (
      <Grid.Item key={list.id} className="newsGridItem">
        <img src={`${BASE_URL}${list.imgSrc}`} alt="" />
        <div className="desc">
          <h2>{list.title}</h2>
          <span className="from">{list.from}</span>
          <span className="date">{list.date}</span>
        </div>
      </Grid.Item>
    )
  })
  return (
    loadNewsList && (
      <Grid columns={1} className="newsGrid">
        {newsGridItem}
      </Grid>
    )
  )
}
