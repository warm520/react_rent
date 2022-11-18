import React,{useState,useEffect} from 'react'
import Navbar from '../../components/NavBar'
import { axiosAPI as axios } from '../../utils'
import { getCurrentCity } from '../../utils/city'
import { Space } from 'antd-mobile'
import { SearchOutline } from 'antd-mobile-icons'
// import { get } from 'store'
export default function CityLists() {
  console.log(useCityList())
  return (
    <div className="cityList">
      <Navbar title={'城市选择'} right={<div style={{fontSize:'18px'}}>
        <Space>
          <SearchOutline/>
        </Space>
      </div>}/>
      <AntList/>
    </div>
  )
}

// 自定义获取城市列表的hook
const useCityList = ()=>{
  const [List,setList] = useState([])
  const [Index,setIndex] = useState([])

  useEffect(()=>{
    const getCityData = async ()=>{
      // 获取一级城市数据
      const result = await axios.get('/area/city',{params:{level:1}})
      // console.log(result)
      // 获取热门城市数据
      const hotResult = await axios.get('/area/hot')
      // console.log(hotResult.data.body)
      // 获取城市列表的列表索引
      const {cityList,cityIndex} = formatData(result.data.body)
      // 获取热门城市，插入到城市列表前面
      cityList['hot'] = hotResult.data.body
      cityIndex.unshift('hot')
      // 获取当前城市
      const currentCity = await getCurrentCity()
      cityList['#'] = currentCity
      cityIndex.unshift('#')

      // 更新城市列表和城市索引
      setList(cityList)
      setIndex(cityIndex)
    }
    getCityData()
  },[])
  return {List,Index}
}

// 城市列表数据排序
const formatData = (list)=>{
  const cityList={}
  list.forEach((item)=>{
    // 获取当前城市的首字母
    const first = item.short.substr(0,1)
    // console.log(first)
    if(cityList[first]){
      cityList[first].push(item)
    }else{
      cityList[first] = [item]
    }
  })
  // 排序列表的索引字母
  const cityIndex = Object.keys(cityList).sort()

  return {cityList,cityIndex}
}


const AntList = ()=>{
  
}