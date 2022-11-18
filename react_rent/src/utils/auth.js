const TOKEN_NAME = 'hkzf_token'

//获取token
const getToken = ()=>{localStorage.getItem(TOKEN_NAME)}
//删除token
const removeToken = ()=>{localStorage.removeToken(TOKEN_NAME)}
//设置token
const setToken = (value)=>{localStorage.setItem(TOKEN_NAME,value)}
//是否登录(有权限)
const isAuth = () => !!getToken()

export {getToken,removeToken,setToken,isAuth}