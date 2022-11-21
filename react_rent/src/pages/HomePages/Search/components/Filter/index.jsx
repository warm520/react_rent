import React, { useState, useEffect } from 'react'
import { useCity } from '../../../../../utils/city'
import { axiosAPI as axios } from '../../../../../utils'
import FilterTitle from './FilterTitle'
import FilterPicker from './FilterPicker'
import FilterMore from './FilterMore'
import './index.css'
import _ from 'lodash'
export default function Filter({ filters, setFilters }) {
  // 获取当前城市
  const [cityValue] = useCity()
  // 初始化标题选项高亮状态
  const initTitleValue = {
    area: false,
    mode: false,
    price: false,
    more: false
  }
  // 设置当前打开选项
  const [openKeyType, setOpenKeyType] = useState('')
  // 设置当前标题选项高亮状态
  const [titleStatus, setTitleStatus] = useState(initTitleValue)
  // 设置当前筛选数据
  const [filterData, setFilterData] = useState()
  // 当前选择器选项
  const defaultSelectedValue = {
    area: ['subway', 'null', null, null],
    mode: ['null'],
    price: ['null'],
    more: []
  }
  const [selectedValue, setSelectedValue] = useState(defaultSelectedValue)
  useEffect(() => {
    // console.log(cityValue)
    const getFilterData = async (id) => {
      const result = await axios.get(`/houses/condition?id=${id}`)
      setFilterData(result.data.body)
    }
    getFilterData(cityValue)
  }, [cityValue])
  // 点击选中标题后切换标题高亮状态的函数
  const onTitleClick = (type) => {
    const newTitleSelectedValue = { ...initTitleValue }
    // 遍历标题选中状态
    Object.keys(titleStatus).forEach((key) => {
      if (key === type) {
        newTitleSelectedValue[type] = true
        return
      }
      // 对比当前状态和默认状态是否相同，不同则选上，相同则不选
      if (key === 'area') {
        // console.log('okkkkk')
        selectedValue[key][0] === 'area'
          ? _.isEqual(selectedValue[key], defaultSelectedValue[key])
            ? (newTitleSelectedValue[key] = false)
            : (newTitleSelectedValue[key] = true)
          : selectedValue[key][1] === 'null'
          ? (newTitleSelectedValue[key] = false)
          : (newTitleSelectedValue[key] = true)
      } else {
        _.isEqual(selectedValue[key], defaultSelectedValue[key])
          ? (newTitleSelectedValue[key] = false)
          : (newTitleSelectedValue[key] = true)
      }
    })
    // 设置选中状态
    setTitleStatus({ ...newTitleSelectedValue })
    // 设置打开选项卡
    setOpenKeyType(type)
  }
  // 蒙层关闭的函数
  // const closeMask = () => {
  //   // console.log(filters)
  //   setTitleStatus((preValue) => {
  //     return {
  //       ...preValue,
  //       [openKeyType]: false
  //     }
  //   })
  //   setOpenKeyType('')
  // }
  // 确认的函数
  const onConfirm = (value) => {
    // console.log(value)
    setSelectedValue((preValue) => {
      // 创建最新选中筛选值状态
      const tempAreaValue = {
        ...preValue,
        [openKeyType]: value
      }
      // console.log(tempAreaValue)
      // 结构最新状态的筛选值
      const { area, mode, price, more } = tempAreaValue
      // console.log(area, mode, price, more)
      const areaKey = area[0]
      let areaValue = null
      if (area[0] === 'area') {
        area[3] === null
          ? (areaValue = area[1])
          : area[3] === 'null'
          ? (areaValue = area[2])
          : (areaValue = area[3])
      } else if (area[0] === 'subway') {
        area[2] === null
          ? (areaValue = null)
          : area[2] === 'null'
          ? (areaValue = area[1])
          : (areaValue = area[2])
      }
      // 组装筛选条件
      filters = {
        [areaKey]: areaValue,
        rentType: mode[0],
        price: price[0],
        more: more.join(',')
      }
      // 上传筛选条件给父组件
      setFilters(filters)
      // 判断并更新选中状态
      setTitleStatus((preValue) => {
        console.log(preValue + '#')
        // 点击确认时标题是否继续高亮
        let flag
        if (openKeyType === 'area') {
          tempAreaValue[openKeyType][0] === 'area'
            ? _.isEqual(
                tempAreaValue[openKeyType],
                defaultSelectedValue[openKeyType]
              )
              ? (flag = false)
              : (flag = true)
            : tempAreaValue[openKeyType][1] === 'null'
            ? (flag = false)
            : (flag = true)
        } else {
          _.isEqual(
            tempAreaValue[openKeyType],
            defaultSelectedValue[openKeyType]
          )
            ? (flag = false)
            : (flag = true)
        }
        return {
          ...preValue,
          [openKeyType]: flag
        }
      })
      return { ...tempAreaValue }
    })

    setOpenKeyType('')
  }
  // 取消的函数 点击清空筛选
  const onCancel = () => {
    // 创建父元素备份筛选数据
    const tempFilters = { ...filters }
    // 设置筛选数据的条件
    if (openKeyType === 'area') {
      tempFilters['subway']
        ? (tempFilters['subway'] = null)
        : (tempFilters['area'] = null)
    } else if (openKeyType === 'mode') {
      tempFilters['rentType'] = null
    } else {
      tempFilters[openKeyType] = null
    }
    setFilters(tempFilters)
    // 设置筛选数据器选中数据
    setSelectedValue((preValue) => {
      return {
        ...preValue,
        [openKeyType]: defaultSelectedValue[openKeyType]
      }
    })
    // 设置标题高亮状态
    setTitleStatus((preValue) => {
      return {
        ...preValue,
        [openKeyType]: false
      }
    })
    setOpenKeyType('')
  }
  return (
    <div>
      <div className="content">
        {/* 标题 */}
        <FilterTitle
          titleStatus={titleStatus}
          onTitleClick={onTitleClick}
          openKeyType={openKeyType}
        />
        <div
          className="mask"
          style={{ display: openKeyType === '' ? 'none' : 'block' }}
          // onClick={closeMask}
        >
          {/* 前三个菜单对应的内容 */}
          {openKeyType === 'area' ||
          openKeyType === 'mode' ||
          openKeyType === 'price' ? (
            <FilterPicker
              openKeyType={openKeyType}
              onConfirm={onConfirm}
              onCancel={onCancel}
              data={filterData}
              selectedValue={selectedValue}
            />
          ) : null}
          {
            openKeyType === 'more' ?

            (<FilterMore
              openKeyType={openKeyType}
              onCancel={onCancel}
              onConfirm={onConfirm}
              titleStatus={titleStatus}
              setTitleStatus={setTitleStatus}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              defaultValue={selectedValue.more}
              data={filterData}
            />):null
          }

          

        </div>
        {/* <Mask
          visible={openKeyType ? true : false}
          opacity={0.5}
          onMaskClick={closeMask}
        >
          {openKeyType === 'area' ||
          openKeyType === 'mode' ||
          openKeyType === 'price' ? (
            
              <FilterPicker
                openKeyType={openKeyType}
                onConfirm={onConfirm}
                onCancel={onCancel}
                data={filterData}
              />
              
          ) : null}
          <FilterMore />
        </Mask> */}
      </div>
    </div>
  )
}
