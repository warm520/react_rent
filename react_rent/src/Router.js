import React ,{lazy,Suspense} from "react";
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
// import { Skeleton } from "antd-mobile";

// 按需加载子页面
// const HomePages = lazy(()=>{import('./pages/HomePages')});
// 首页
import HomePages from "./pages/HomePages";
import Home from "./pages/HomePages/Home";
import News from "./pages/HomePages/News";
import Profile from "./pages/HomePages/Profile";
import Search from "./pages/HomePages/Search";

import CityLists from "./pages/CityList";
import Map from "./pages/Map";
// 注册路由
const Routers = ()=>{
  return (
    <BrowserRouter>
    {/* 设置加载指示器 */}
      {/* <Suspense fallback={<Loading/>}> */}
        <Routes>
          {/* 首页 */}
          <Route path='/' element={<Navigate to='/home'/>}/>
          {/* 首页 */}
          <Route path='/home' element={<HomePages/>}>
            <Route path='/home' element={<Home/>}/>
            <Route path='/home/search' element={<Search/>}/>
            <Route path='/home/news' element={<News/>}/>
            <Route path='/home/profile' element={<Profile/>}/>
          </Route>
          {/* 城市选择 */}
          <Route path='/citylist' element={<CityLists/>}/>
          <Route path="/map" element={<Map/>}/>
        </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  )
}

// const Loading = ()=>{
//   return(
//     <>
//       <Skeleton.Title animated={true} />
//       <Skeleton.Paragraph animated={true} />
//     </>
//   )
// }

export default Routers;