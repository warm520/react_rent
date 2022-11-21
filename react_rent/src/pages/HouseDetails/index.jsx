import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { axiosAPI as axios } from '../../utils'
import Navbar from '../../components/NavBar'
import { BASE_URL } from '../../utils'
import HousePackage from '../../components/HousePackage'
import { useCity } from '../../utils/city'
import { Toast, Swiper, Grid, Modal } from 'antd-mobile'
import HouseItem from '../../components/HouseItem'
import './index.css'
export default function HouseDetails() {
  const { id } = useParams()
  const history = useNavigate()
  // 设置百度地图全局常量
  const BMapGL = window.BMapGL
  // 房屋数据
  const [houseData, setHouseData] = useState({})
  const [isLoadHouseData, setIsLoadHouseData] = useState(false)
  // 设置是否收藏的状态
  const [isFavorite, setIsFavorite] = useState(false)
  useEffect(() => {
    // 获取房屋数据
    const getHouseData = async () => {
      const result = await axios.get(`/houses/${id}`)
      setHouseData(result.data.body)
      setIsLoadHouseData(true)
      // 获取小区名称和地理位置
      const { coord, community } = result.data.body

      // 渲染地图
      const renderMap = (coord, community) => {
        const { latitude, longitude } = coord
        // 创建地图实例
        const map = new BMapGL.Map('map-container')
        // 创建坐标实例
        const areaPoint = new BMapGL.Point(longitude, latitude)
        // 地图定位当前城市
        map.centerAndZoom(areaPoint, 16)
        // 禁止地图拖动
        map.disableDragging()
        // 添加缩放控件
        const zoomCtrl = new BMapGL.ZoomControl()
        map.addControl(zoomCtrl)

        // 添加文本标注
        var opts = {
          position: areaPoint,
          offset: new BMapGL.Size(0, -35)
        }
        // 创建覆盖物实例
        var label = new BMapGL.Label('', opts)
        // 设置覆盖物内容
        label.setContent(
          `<div class='houseDetailBubble'>
            <div class='housename'>${community}</div>
          </div>`
        )
        label.setStyle({
          cursor: 'pointer',
          border: '0px solid rgb(255, 0, 0)',
          padding: '0px',
          whiteSpace: 'nowrap',
          fontSize: '14px',
          color: 'rgb(255, 255, 255)',
          textAlign: 'center'
        })
        map.addOverlay(label)
      }
      renderMap(coord, community)
    }
    getHouseData()
    return () => {
      setIsLoadHouseData(false)
    }
  }, [])

  // 获取房屋详情中各种各样的数据
  const {
    community,
    houseImg,
    description,
    floor,
    oriented,
    price,
    roomType,
    size,
    supporting,
    tags,
    title
  } = houseData
  // console.log(community)
  useEffect(() => {
    const checkIsFavorite = async (houseId) => {
      const isLogin = !!sessionStorage.getItem('hkzf_token')
      if (!isLogin) {
        return
      }
      // 检查收藏
      const result = await axios.get(`/user/favorites/${houseId}`)
      setIsFavorite(result.data.body.isFavorite)
    }
    checkIsFavorite(id)
  },[id])
  const handleFavorite = async(isFavorite) => {
    const isLogin = !!sessionStorage.getItem('hkzf_token')
    console.log(isFavorite)
    if (isLogin) {
      if (!isFavorite) {
        const result = await axios.post(`/user/favorites/${id}`)
        if(result.data.status===200){
          if(result.data.status===200){
            Toast.show({
              icon:'success',
              content:'已收藏'
            })
          }else{
            Toast.show({
              icon:'fail',
              content:'网络延时，请重新登录'
            })
          }
        }
        setIsFavorite(true)
      } else {
        const result = await axios.delete(`/user/favorites/${id}`)
        if(result.data.status===200){
          Toast.show({
            icon:'success',
            content:'已取消收藏'
          })
        }else{
          Toast.show({
            icon:'fail',
            content:'网络延时,请重新登录'
          })
        }
        setIsFavorite(false)
      }
    } else {
      Modal.confirm({
        content: '您还没有登录',
        cancelText: '取消',
        confirmText: '去登陆',
        onConfirm: () => {
          history('/login')
        }
      })
    }
  }
  return (
    <div className="houseDetail">
      <div className="houseDetailBavBar">
        <Navbar
          title={community}
          right={<i className="iconfont icon-share"></i>}
          color={'rgba(0, 0, 0, 0.25)'}
          fontColor={'#fff'}
        />
      </div>

      {/* 获取房屋详情后渲染信息 */}
      {isLoadHouseData && (
        // 轮播图
        <>
          <Swipers houseImg={houseImg} />
          <Info
            community={community}
            title={title}
            tags={tags}
            price={price}
            roomType={roomType}
            size={size}
            floor={floor}
            oriented={oriented}
            supporting={supporting}
            description={description}
          />
          <Likes />
        </>
      )}

      <Buttons
        isFavorite={isFavorite}
        handleFavorite={()=>{handleFavorite(isFavorite)}}
      ></Buttons>
    </div>
  )
}

// 轮播图
const Swipers = ({ houseImg }) => {
  return (
    <Swiper auto={true} loop={true}>
      {houseImg.map((item, index) => {
        return (
          <Swiper.Item key={index}>
            <div className="swiperDetails">
              <img
                src={`${BASE_URL}${item}`}
                alt=""
                style={{ width: '100%' }}
              />
            </div>
          </Swiper.Item>
        )
      })}
    </Swiper>
  )
}

// 信息渲染
const Info = ({
  community,
  title,
  tags,
  price,
  roomType,
  size,
  floor,
  oriented,
  supporting,
  description
}) => {
  return (
    <div className="info">
      <div className="infoFirst">
        {/* 标题 */}
        <div className="infoTitle">
          <h3>{community}</h3>
        </div>
        {/* 标签 */}
        <Grid columns={1} className="infoTag">
          <Grid.Item>
            {tags.map((tag) => {
              return <span>{tag}</span>
            })}
          </Grid.Item>
        </Grid>
        {/* 房源价格、面积 */}
        <Grid className="infoPrice" columns={3} gap={12}>
          <Grid.Item className="infoPriceItem">
            <div>
              {price}
              <span className="priceMonth">/月</span>
            </div>
            <div>租金</div>
          </Grid.Item>
          <Grid.Item className="infoPriceItem">
            <div>{roomType}</div>
            <div>房型</div>
          </Grid.Item>
          <Grid.Item className="infoPriceItem">
            <div>{size}平方</div>
            <div>面积</div>
          </Grid.Item>
        </Grid>
        {/* 基础简介 */}
        <div className="infoSimple">
          <Grid columns={2}>
            <Grid.Item className="infoSimpleItem">
              <div>
                装修:&nbsp;&nbsp;
                <span>{'精装'}</span>
              </div>
              <div>
                楼层:&nbsp;&nbsp;
                <span>{floor}</span>
              </div>
            </Grid.Item>
            <Grid.Item className="infoSimpleItem">
              <div>
                朝向:&nbsp;&nbsp;
                <span>{oriented.join('、')}</span>
              </div>
              <div>
                类型:&nbsp;&nbsp;
                <span>{'普通住宅'}</span>
              </div>
            </Grid.Item>
          </Grid>
        </div>
      </div>
      {/* 地图渲染 */}
      <div className="houseMap">
        <div className="mapTitle">
          小区：
          <span>{community}</span>
        </div>
        <div id="map-container"></div>
      </div>
      {/* 房屋配套 */}
      <div className="housePackage">
        <div className="housePackageTitle">房屋配套</div>
        {<HousePackage supporting={supporting} />}
      </div>
      {/* 房屋概况 */}
      <div className="houseIntroduce">
        <div className="houseIntroduceTitle">房屋概况</div>
        <div className="concat">
          <div className="userinfo">
            <img src={BASE_URL + '/img/avatar.png'} alt="" />
            <div>张女士</div>
            <div className="userAuth">
              <i className="iconfont icon-auth"></i>
              <span>已认证房主</span>
            </div>
          </div>
          <span>发消息</span>
        </div>
        <div className="houseDesc">{description || '暂无房源数据'}</div>
        {/* <div className="desc"></div> */}
      </div>
    </div>
  )
}

// 推荐模块
const Likes = () => {
  // 获取当前城市id
  const [cityValue, cityLabel] = useCity()
  // 设置房源列表和房源数量
  const [likeList, setLikeList] = useState([])
  useEffect(() => {
    // 随机获取房屋信息
    const getLikeHouseList = async (id, start) => {
      const result = await axios.get('/houses', {
        params: {
          cityId: id,
          start: start,
          end: start + 2
        }
      })
      // console.log(result.data.body.list)
      setLikeList(result.data.body.list)
    }
    // 随机生成start 1000以内的整数
    const start = Math.floor(Math.random() * (1000 - 1)) + 1
    getLikeHouseList(cityValue, start)

    return () => {
      setLikeList([])
    }
  }, [cityValue])

  return (
    <div className="houseLike">
      <div className="likeTitle">猜你喜欢</div>
      {likeList.map((item) => {
        return (
          <Link to={`/detail/${item.houseCode}`}>
            <div className="houseLikeItem" key={item.houseCode}>
              <HouseItem
                key={item.houseCode}
                src={item.houseImg}
                title={item.title}
                desc={item.desc}
                tags={item.tags}
                price={item.price}
                houseCode={item.houseCode}
              />
            </div>
          </Link>
        )
      })}
    </div>
  )
}

// 按钮模块
const Buttons = ({ isFavorite, handleFavorite }) => {
  return (
    <div className="buttons">
      <span
        className="favorite"
        onClick={() => {
          handleFavorite(isFavorite)
        }}
      >
        <img
          src={
            isFavorite
              ? `${BASE_URL}/img/star.png`
              : `${BASE_URL}/img/unstar.png`
          }
          alt=""
        />
        {isFavorite ? '已收藏' : '收藏'}
      </span>
      <span
        className="onLineAsk"
        onClick={() => {
          Toast.show({
            content: '暂未开通该功能'
          })
        }}
      >
        在线咨询
      </span>
      <span className="preDate">
        <a href="tel:">电话预约</a>
      </span>
    </div>
  )
}
