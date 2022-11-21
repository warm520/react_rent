import React from "react";
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";

// 首页
import HomePages from "./pages/HomePages";
import Home from "./pages/HomePages/Home";
import News from "./pages/HomePages/News";
import Profile from "./pages/HomePages/Profile";
import Search from "./pages/HomePages/Search";

import CityLists from "./pages/CityList";
import Map from "./pages/Map";
import HouseDetails from "./pages/HouseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorite from "./pages/Favorite";

// 房源发布模块
import Rent from "./pages/Rent";
import RentAdd from "./pages/Rent/ReactAdd";
import RentSearch from "./pages/Rent/ReactSearch";


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
          <Route path='/detail/:id' element={<HouseDetails/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/favorite' element={<Favorite/>}/>
          {/* 房源发布模块 */}
          <Route path='/rent' element={<Rent/>}/>
          <Route path='/rent/add' element={<RentAdd/>}/>
          <Route path='/rent/search' element={<RentSearch/>}/>
        </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  )
}
export default Routers;