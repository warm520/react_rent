## 基础路由

## 技术点（学习到的）
```
1.懒加载
2.大量数据序列加载 react-virtualized
3.index.module. 解决样式冲突问题
4.localStorageItem,sessionStorageItem,Cookie的区别 token的解析
5.百度地图API(阅读文档的能力)
6.axios拦截器的问题
7.自定义useHook
8.对于路由的鉴权
```
### 复习()
```
  1.常见钩子函数的使用(useState,useEffect,useLocation...)
  2.组件之间的通信方法
  3.根据本项目对组件的模块化有了新的认识
```

### 代码结构
```
component(非路由组件)

pages(路由组件)
  HomePage{
    Home
    Search
    News
    Profile
  }
  Favorite{

  }
  HouseDetail{

  }
  Login,Register{

  }
  Map{

  }
  HouseDetail:
  {
    NavBar
    轮播图 Swiper
    房源信息:Info:
      info
      标签
      价钱
      简介
      地图
      房屋配套
      房屋概况
    猜你喜欢:Like
    按钮：收藏 在线咨询 电话预约
  }
```