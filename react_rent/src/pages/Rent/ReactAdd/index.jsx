import React, { useEffect, useState } from 'react'
import styles from './index.moudle.css'
import { sleep } from '../../../../node_modules/antd-mobile/es/utils/sleep.js'
import {
  Form,
  Input,
  CascadePicker,
  TextArea,
  ImageUploader,
  Toast
} from 'antd-mobile'
import { useNavigate, useLocation } from 'react-router-dom'
import { axiosAPI as axios } from '../../../utils'
import HousePackage from '../../../components/HousePackage'
import Navbar from '../../../components/NavBar'
export default function RentAdd() {
  const history = useNavigate()
  const location = useLocation()
  // console.log(location)
  const roomTypeData = [
    { label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
    { label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
    { label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
    { label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
    { label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' }
  ]

  const floorData = [
    { label: '高楼层', value: 'FLOOR|1' },
    { label: '中楼层', value: 'FLOOR|2' },
    { label: '低楼层', value: 'FLOOR|3' }
  ]

  const orientedData = [
    { label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
    { label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
    { label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
    { label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
    { label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
    { label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
    { label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
    { label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' }
  ]
  // 设置房源信息state
  const initHouseValue = {
    title: '',
    description: '',
    houseImg: '',
    oriented: '',
    supporting: '',
    price: '',
    roomType: '',
    size: '',
    floor: '',
    community: ''
  }
  const [houseValue, setHouseValue] = useState(initHouseValue)
  // 图片队列
  const [fileList, setFileList] = useState([])
  useEffect(()=>{
    setHouseValue((preValue)=>(
      {
        ...preValue,
        community:location.state? location.state.id:''
      }
    ))
  },[location])
    
  async function mockUpload(file: File) {
    await sleep(3000)
    return {
      url: URL.createObjectURL(file),
      file
    }
  }
  // 点击取消 
  const onCancel = ()=>{
    location.state = null
    setHouseValue(initHouseValue)
    // 刷新页面
    history('/rent/add',{replace:true})
  }
  const onConfirm = async()=>{
    if(!houseValue.price || !houseValue.size){
      Toast.show({
        icon:'fail',
        content:'租金和房屋面积不能为空'
      })
    }else{
      let houseImg = ''
      // 判断是否有图片队列
      if(fileList.length>0){
        const form = new FormData()
        fileList.forEach((item)=>{
          form.append('file',item.file)
        })
        // 先上传图片
        const result = await axios.post('/houses/image',form,{
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        })
        if(result.data.status===200){
          houseImg = result.data.body.join('|')
        }
        setHouseValue((preValue)=>(
          {
            ...preValue,
          houseImg:houseImg
          }
        ))
        console.log(houseValue)
        // 发布房源
        const res = await axios.post('/user/houses',houseValue)
        if(res.data.status === 200){
          Toast.show({
            icon:'success',
            content:'发布房源成功'
          })
        }else{
          Toast.show({
            icon:'fail',
            content:'发布房源失败'
          })
        }
      }
    }
    
  }
  return (
    <>
      <Navbar title="发布房源" color="#f5f6f5" />
      <div className="rentAddHouse" style={styles.rentAddHouse}>
        <Form layout="horizontal">
          <Form.Header>
            <span className="header">房源信息</span>
          </Form.Header>
          <Form.Item
            label="小区名称"
            onClick={() => {
              history('/rent/search',{replace:true})
            }}
          >
            <span style={{ marginBottom: '20px' }}>
              {location.state?  location.state.name:'请输入小区地址'}
            </span>
          </Form.Item>
          <Form.Item
            name="price"
            label="租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金"
            extra={'￥/月'}
            type="number"
            required
          >
            <Input
              placeholder="请输入租金/月"
              clearable
              value={houseValue.price}
              onChange={(val) => {
                setHouseValue((preValue) => ({
                  ...preValue,
                  price: val
                }))
              }}
            />
          </Form.Item>
          <Form.Item name="size" label="建筑面积" extra={'㎡'} required>
            <Input
              placeholder="请输建筑面积"
              clearable
              value={houseValue.size}
              onChange={(val) => {
                setHouseValue((preValue) => ({
                  ...preValue,
                  size: val
                }))
              }}
            />
          </Form.Item>
          <Form.Item
            name="roomType"
            label="户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型"
            onClick={(e, pickRef) => {
              pickRef.current?.open()
            }}
          >
            <CascadePicker
              options={roomTypeData}
              value={houseValue.roomType}
              onConfirm={(val) => {
                // console.log(val)
                setHouseValue((preValue) => ({
                  ...preValue,
                  roomType: val[0]
                }))
              }}
            >
              {(value) => (value.length === 0 ? '请选择' : value[0].label)}
            </CascadePicker>
            {/* 请选择 */}
          </Form.Item>
          <Form.Item
            name="floor"
            label="所在楼层"
            onClick={(e, pickRef) => {
              pickRef.current?.open()
            }}
          >
            <CascadePicker
              options={floorData}
              value={houseValue.floor}
              onConfirm={(val) => {
                setHouseValue((preValue) => ({
                  ...preValue,
                  floor: val[0]
                }))
              }}
            >
              {(value) => (value.length === 0 ? '请选择' : value[0].label)}
            </CascadePicker>
          </Form.Item>
          <Form.Item
            name="oriented"
            label="朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向"
            onClick={(e, pickRef) => {
              pickRef.current?.open()
            }}
          >
            <CascadePicker
              options={orientedData}
              value={houseValue.oriented}
              onConfirm={(val) => {
                // console.log(val)
                setHouseValue((preValue) => ({
                  ...preValue,
                  oriented: val[0]
                }))
              }}
            >
              {(value) => (value.length === 0 ? '请选择' : value[0].label)}
            </CascadePicker>
          </Form.Item>
        </Form>
        <Form>
          <Form.Header>
            <span className="header">房屋标题</span>
          </Form.Header>
          <Form.Item name="title">
            <TextArea
              placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
              value={houseValue.title}
              onChange={(val) => {
                setHouseValue((preValue) => ({
                  ...preValue,
                  title: val
                }))
              }}
            />
          </Form.Item>
        </Form>
        <Form>
          <Form.Header>
            <span className="header">房屋图像</span>
          </Form.Header>
          <Form.Item>
            <ImageUploader
              value={fileList}
              onChange={(files) => {
                setFileList(files)
              }}
              upload={mockUpload}
            />
          </Form.Item>
        </Form>
        <Form>
          <Form.Header>
            <span className="header">房屋配置</span>
          </Form.Header>
          <Form.Item>
            <HousePackage select={1} onSelect={(val)=>{
              setHouseValue((preValue)=>(
                {
                  ...preValue,
                  supporting:val.join('|')
                }
              ))
            }}/>
          </Form.Item>
        </Form>
        <Form>
          <Form.Header>
            <span className="header">房屋描述</span>
          </Form.Header>
          <Form.Item name="description">
            <TextArea
              rows={5}
              placeholder="请输入房屋描述信息"
              value={houseValue.description}
              onChange={(val) => {
                setHouseValue((preValue) => ({
                  ...preValue,
                  description: val
                }))
              }}
            />
          </Form.Item>
        </Form>
        <div className="rendAddBottom">
          <span className="onCancel" onClick={onCancel}>取消</span>
          <span className="onConfirm" onClick={onConfirm}>提交</span>
        </div>
      </div>
    </>
  )
}
// const parseFile = (file) => {
//   return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       console.log(reader)
//       reader.onload = (e) => {
//         console.log(e)
//           const dataURL = e.target.result;

//           if (!dataURL) {
//               reject('Fail to get the image')

//               return;
//           }
//           resolve({
//               url: dataURL,
//               file
//           });
//           console.log('ok')
//       };
//       reader.readAsDataURL(file);
//   });
// };
