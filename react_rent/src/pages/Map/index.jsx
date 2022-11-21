import React, { useEffect, useState } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import Navbar from '../../components/NavBar'
import { useCity } from '../../utils/city'
import { Toast } from 'antd-mobile'
import HouseItem from '../../components/HouseItem'
import { axiosAPI as axios } from '../../utils'
const BMapGL = window.BMapGL
export default function Map() {
  // 设置小屋房源列表
  const [houseList, setHouseList] = useState([])
  // 房屋列表是否可见
  const [isShowHouseList, setIsShowHouseList] = useState(false)
  // 获取当前城市
  const [cityValue, cityLabel] = useCity()
  useEffect(() => {
    // 创建地图
    const map = new BMapGL.Map('container')
    // 渲染地图函数
    const renderMap = () => {
      // 设置鼠标的滚动缩放地图
      map.enableScrollWheelZoom(true)
      // 设置比例尺控件
      var scaleCtrl = new BMapGL.ScaleControl()
      // 设置缩放控件
      var zoomCtrl = new BMapGL.ZoomControl()
      // 添加比例尺控件
      map.addControl(scaleCtrl)
      // 添加缩放控件
      map.addControl(zoomCtrl)
      // 创建地址解析器
      var myGeo = new BMapGL.Geocoder()
      // 将地址解析结果显示在地图上
      myGeo.getPoint(
        cityLabel,
        async (point) => {
          if (point) {
            // 地图定位当前城市
            map.centerAndZoom(point, 11)
            // 渲染房源覆盖物
            renderOverLays(cityValue)
          }
        },
        cityLabel
      )
    }
    // 获取房源信息 覆盖物渲染函数
    const renderOverLays = async (value) => {
      //加载提示
      Toast.show({
        icon: 'loading',
        content: '加载中...'
      })
      // 获取房源信息
      const result = await axios.get(`/area/map?id=${value}`)
      // 获取缩放级别
      const { nextZoom, type } = getTypeAndZoom(map)
      // setHouseList(result.data.body)
      result.data.body.forEach((item) => {
        return createOverLays(item, nextZoom, type)
      })

      Toast.clear()
    }
    renderMap()
    // 覆盖物渲染函数  判断渲染级别
    const createOverLays = (item, nextZoom, type) => {
      const { label: areaName, count, coord, value } = item
      const { latitude, longitude } = coord
      // 设置房源信息覆盖物位置
      const areaPoint = new BMapGL.Point(longitude, latitude)
      // 按照类型判断是渲染区镇还是小区
      if (type === 'circle') {
        createCircle(count, value, areaName, areaPoint, nextZoom)
      } else {
        createRect(count, value, areaName, areaPoint)
      }
    }

    // 覆盖渲染物  绘制区镇信息
    const createCircle = (count, value, areaName, areaPoint, nextZoom) => {
      // 添加文本标注
      var opts = {
        position: areaPoint,
        offset: new BMapGL.Size(-35, -35)
      }
      // 创建覆盖物实例
      var label = new BMapGL.Label('', opts)
      // 设置覆盖物内容
      label.setContent(`<div class="bubble">
      <p class='name'>${areaName}</p>
      <p class='count'>${count}套</p>
      </div>`)
      // 设置覆盖物样式
      label.setStyle(labelStyle)
      // 设置覆盖物点击事件
      label.addEventListener('click', () => {
        // 放大被点击的覆盖物
        map.centerAndZoom(areaPoint, nextZoom)
        // 清空原有的覆盖物
        map.clearOverlays()
        // 寻找下一级覆盖物
        renderOverLays(value)
      })
      // 添加覆盖物
      map.addOverlay(label)
    }
    // 覆盖渲染物 绘制小区房源信息
    const createRect = (count, value, areaName, areaPoint) => {
      //添加文本标注
      console.log('ok')
      var opts = {
        position: areaPoint,
        offset: new BMapGL.Size(-35, -35)
      }
      // 创建覆盖物实例
      var label = new BMapGL.Label('', opts)
      // 设置覆盖物内容
      label.setContent(`
        <div class='desc'>
          <p class='name'>${areaName}</p>
          <p class='count'>${count}套</p>
        </div>
      `)
      label.setStyle(labelStyle)
      // 添加点击事件
      label.addEventListener('click', async () => {
        // 加载提示
        Toast.show({
          icon: 'loading',
          content: '加载中...'
        })
        const result = await axios.get(`/houses?cityId=${value}`)
        setHouseList(result.data.body.list)
        setIsShowHouseList(true)

        // 清除加载提示
        Toast.clear()
      })
      map.addOverlay(label)
    }
  })
  return (
    <div className="map">
      <Navbar
        title={'地图找房'}
        onBack={() => {
          window.history.go(-1)
        }}
      />
      {/* 地图容器 */}
      <div id="container"></div>
      {/* 房屋列表 */}
      <HouseList hList={houseList} isShow={isShowHouseList} />
    </div>
  )
}
// 房屋列表
const HouseList = ({ hList, isShow }) => {
  // const history = useNavigate()
  return (
    <div className={isShow ? 'houseList' : ''}>
      <div className="titleWrap">
        <h1>房屋列表</h1>
        <Link to="/home/search" className="moreHouseList">
          更多房源
        </Link>
      </div>
      <div className="houseItem">
        {hList.map((item, index) => {
          // console.log(item.houseCode)
          return (
           <Link to='/home/search'>
             <HouseItem
              key={item.houseCode}
              src={item.houseImg}
              title={item.title}
              desc={item.desc}
              tags={item.tags}
              price={item.price}
            />
           </Link>
          )
        })}
      </div>
    </div>
  )
}
// 地图覆盖物样式
const labelStyle = {
  width: '70px',
  height: '70px',
  cursor: 'pointer',
  backgroundColor: '',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center'
}
// 设置缩放级别函数
const getTypeAndZoom = (map) => {
  const zoom = map.getZoom()
  let nextZoom, type
  if (zoom >= 10 && zoom < 11) {
    nextZoom = 13
    type = 'circle'
  } else if (zoom >= 11 && zoom < 15) {
    nextZoom = 15
    type = 'circle'
  } else if (zoom >= 14 && zoom < 16) {
    type = 'rect'
  }

  return { nextZoom, type }
}
