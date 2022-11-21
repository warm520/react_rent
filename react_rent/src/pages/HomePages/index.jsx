import React from 'react'
import './index.css'
import { TabBar } from 'antd-mobile'
import { useNavigate,useLocation,Outlet } from 'react-router-dom'
export default function HomePages() {

  return (
    <>
      <div className="homePage">
        {/* 二级路由位置 */}
        <Outlet/>
      </div>
      <Bottom/>
    </>
  )
}
const Bottom = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const {pathname} = location;
  const tabs = [
    {
      key:'/home',
      title:'首页',
      icon:<i className='iconfont icon-ind'></i>
    },
    {
      key:'/home/search',
      title:'找房',
      icon:<i className='iconfont icon-findHouse'></i>
    },
    {
      key:'/home/news',
      title:'资讯',
      icon:<i className='iconfont icon-infom'></i>
    },
    {
      key:'/home/profile',
      title:'我的',
      icon:<i className='iconfont icon-my'></i>
    }
  ]
  const setActiveKey = (value)=>{
    navigate(value)
  }
  return(
    <TabBar activeKey={pathname} onChange={setActiveKey}>
      {
        tabs.map((tab) => {
          return <TabBar.Item key={tab.key} icon={tab.icon} title={tab.title}/>
        })
      }
    </TabBar>
  )
}
