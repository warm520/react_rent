import React from 'react'
import './index.css'
import { Form, Input, Button, Grid,Toast } from 'antd-mobile'
import { axiosAPI as axios } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { setToken } from '../../utils'
import Navbar from '../../components/NavBar'
export default function Register() {
  const history = useNavigate()
  const handleRegister = async(e)=>{
    console.log(e)
    const {username,password,vpassword} = e
    if(password !== vpassword){
      Toast.show({
        icon:'fail',
        content:'两次输入密码不一致'
      })
    }else{
      const result = await axios.post('/user/registered',{
        username,
        password
      })
      if(result.data.status!==200){
        Toast.show({
          icon:'fail',
          content:result.data.description
        })
      }else{
        console.log(result.data.body)
        setToken(result.data.body.toke)
        history('/home/profile')
      }
    }
  }
  return (
    <div classsName="registerContainer">
      <Navbar title={'用户注册'} />
      <Form onFinish={(e)=>{handleRegister(e)}}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '用户名为必填项' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: '密码为必填项' },
            {
              pattern: /^\w{5,15}$/,
              message: '长度为5-15位,只能出数字，字母，下划线'
            }
          ]}
        >
          <Input placeholder="请输入密码" type="password" />
        </Form.Item>
        <Form.Item
          name="vpassword"
          rules={[
            { required: true, message: '请再次输入密码' },
            {
              pattern: /^\w{5,15}$/,
              message: '长度为5-15位,只能出数字，字母，下划线'
            }
          ]}
        >
          <Input placeholder="请再次输入密码" type="password" />
        </Form.Item>
        <Form.Item>
          <Button
            type="submit"
            style={{ backgroundColor: '#21b97a', color: '#fff', width: '100%' }}
          >
            注册
          </Button>
        </Form.Item>
      </Form>
      <Grid columns={1} className="backLogin">
        <Grid.Item>
          <Link to="/login">已有账号，去登录</Link>
        </Grid.Item>
      </Grid>
    </div>
  )
}
