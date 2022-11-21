import React, { useEffect, useState } from 'react'
import './index.css'
import { Grid, Button, Modal } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../utils'
import { axiosAPI as axios } from '../../../utils'
// import { getToken } from '../../../utils'
export default function Profile() {
  const history = useNavigate()
  const menus = [
    { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorite' },
    { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
    { id: 3, name: '看房记录', iconfont: 'icon-record' },
    { id: 4, name: '成为房主', iconfont: 'icon-identity' },
    { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
    { id: 6, name: '联系我们', iconfont: 'icon-cust' }
  ]
  // 用户信息
  const [userInfo, setUserInfo] = useState({
    avatar: '',
    nickname: ''
  })
  // 判断是否有用户登录
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    // 获取用户信息
    const getUserInfo = async () => {
      const result = await axios.get('/user')
      if(result.data.status===200){
        const {avatar,nickname} = result.data.body
        setUserInfo({
          avatar,
          nickname
        })
        setIsLogin(!!sessionStorage.getItem('hkzf_token'))
      }
      
    }
    getUserInfo()
  }, [isLogin])
  const Logout = () => {
    Modal.confirm({
      content: '确定退出吗 ?',
      onConfirm: () => {
        sessionStorage.removeItem('hkzf_token')
        setIsLogin(false)
        setUserInfo({
          avatar: '',
          nickname: ''
        })
      },
      bodyClassName: 'modal'
    })
  }
  const handleTo = (to)=>{
    console.log(to)
    if(isLogin){
      history(to)
    }else{
      Modal.confirm({
        content:'您还没有登录',
        cancelText:"取消",
        confirmText:"去登陆",
        onConfirm:()=>{
          history('/login')
        }
      })
    }
  }
  return (
    <>
      <div className="profile">
        <div className="profileTitle">
          <img src={`${BASE_URL}/img/profile/bg.png`} alt="" />
          <div className="userinfo">
            <div className="myIcon">
              {userInfo.avatar ? (
                <img src={`${BASE_URL}${userInfo.avatar}`} alt="icon" />
              ) : (
                <img src={`${BASE_URL}/img/avatar.png`} alt="icon" />
              )}
            </div>
            <div className="user">
              {userInfo.nickname ? (
                <div className="nickname">{userInfo.nickname}</div>
              ) : (
                <div className="nickname">游客</div>
              )}
              {isLogin ? (
                <>
                  <div className="logout">
                    <span onClick={Logout}>退出</span>
                  </div>
                  <div className="edit">
                    编辑个人资料
                    <i className="iconfont icon-arrow"></i>
                  </div>
                </>
              ) : (
                <Button
                  color={'success'}
                  size="small"
                  onClick={() => {
                    history('/login')
                  }}
                >
                  去登录
                </Button>
              )}
            </div>
          </div>
        </div>
        <Grid columns={3} gap={10} className="menuList">
          {menus.map((item) => {
            return (
              <>
                <Grid.Item key={item.id} className="menuItem" onClick={item.to ? ()=>{handleTo(item.to)}:null}>
                  <i className={`iconfont ${item.iconfont}`}></i>
                  <p>{item.name}</p>
                </Grid.Item>
              </>
            )
          })}
        </Grid>
        <div className="join">
          <img src={`${BASE_URL}/img/profile/join.png`} alt="" />
        </div>
      </div>
    </>
  )
}
