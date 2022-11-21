import React,{useState,useEffect} from 'react'
import { axiosAPI as axios, BASE_URL } from '../../../utils'
import { useCity } from '../../../utils/city'
import { Grid } from 'antd-mobile'
import './index.css'
// import { BASE_URL } from '../../../utils'
// import { BASE_URL } from '../../../utils'
export default function News() {
  // 获取当前城市
  const [cityValue,cityLabel] = useCity()
  // 新闻列表
  const [newsList,setNewsList] = useState([])
  // 新闻列表数据加载
  const [loadNewsList,setLoadNewsList] = useState(false)
  useEffect(()=>{
    const getNewsList = async(id)=>{
      const result = await axios.get('/home/news',{
        params:{
          area:id
        }
      })
      // console.log(result.data.body)
      setNewsList(result.data.body)
      setLoadNewsList(true)
    }
    getNewsList(cityValue)
    return ()=>{
      setLoadNewsList(false)
    }
  },[cityValue,newsList,loadNewsList])

  const newsItems = newsList.map((item)=>(
    <Grid.Item key={item.id} className='newsItem'>
      <img src={`${BASE_URL}${item.imgSrc}`} alt=''/>
      <div className="newsItemDesc">
        <h3>{item.title}</h3>
        <span className='from'>{item.from}</span>
        <span className='date'>{item.date}</span>
      </div>
    </Grid.Item>
  ))
  return (
    <div className='newsContainer' style={{height:'100%'}}>
      {
        <Grid columns={1}>
          {newsItems}
        </Grid>
      }
    </div>
  )
}
