import {useState,useEffect} from 'react'
import {axiosAPI as axios} from './axios.js'

const TOKEN_NAME = 'hkzf_city'


const getCurrentCity = ()=>{
  // 获取本地存储的城市
  const localCity = JSON.parse(localStorage.getItem(TOKEN_NAME))
  if(!localCity){
    return new Promise((resolve,reject)=>{
      // 本地存储信息不存在时通过定位获取城市信息
      const currentCity = new window.BMapGL.LocalCity();
      currentCity.get(async (res)=>{
        try{
          const result = await axios.get(`/area/info?name=${res.name}`)
          localStorage.setItem(TOKEN_NAME,JSON.stringify(result.data.body))
          resolve(result.data.body)
        }catch(e){
          reject(e)
        }
      })
      // currentCity.get()
    })
  }else{
    return Promise.resolve(localCity)
  }
}
// 自定义获取当前城市的hook
const useCity = ()=>{
  // 设置当前城市的id和名字
  const [label,setLabel] = useState('') //名字
  const [value,setValue] = useState('') //id
  // 挂载时获取当前的城市
  useEffect(()=>{
    const getCity = async ()=>{
      const res = await getCurrentCity()
      setValue(res.value)
      setLabel(res.label)
    }
    getCity()
  },[])
  return [value,label]
}

const getCity = ()=>{JSON.parse(localStorage.getItem(TOKEN_NAME))}

const setCity = (value)=>{localStorage.setItem(TOKEN_NAME,value)}

export {getCurrentCity,useCity,getCity,setCity}