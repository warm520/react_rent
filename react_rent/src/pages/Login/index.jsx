import React from 'react'
import Navbar from '../../components/NavBar'
import { Form, Input, Button, Grid, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { axiosAPI as axios } from '../../utils'
import './index.css'
export default function Login() {
  const history = useNavigate()
  // const formRef = useRef()
  const handleLogin = async (e) => {
    const result = await axios.post('/user/login', {
      username: e.username,
      password: e.password
    })
    const token = result.data.body.token
    if (result.data.status === 200) {
      localStorage.setItem('hkzf_token',JSON.stringify(token))
      sessionStorage.setItem('hkzf_token',token)
      history('/home/profile')
    } else {
      Toast.show({
        icon: 'fail',
        content: result.data.description
      })
    }
  }
  return (
    <div className="login-container">
      <Navbar title={'用户登录'} />
      <Form
        onFinish={(e) => {
          handleLogin(e)
        }}
      >
        <Form.Item
          name="username"
          className="formItem"
          rules={[{ required: true, message: '用户名为必填项' }]}
        >
          <Input placeholder="请输入账号" />
        </Form.Item>
        <Form.Item
          name="password"
          className="formItem"
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
        <Form.Item>
          <Button
            type="submit"
            style={{ backgroundColor: '#21b97a', color: '#fff', width: '100%' }}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
      <Grid columns={1} className="backHome">
        <Grid.Item>
          <Link to="/register">还没有账号,去注册</Link>
        </Grid.Item>
      </Grid>
    </div>
  )
}
