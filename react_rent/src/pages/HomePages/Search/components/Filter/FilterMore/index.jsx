import React, { useState } from 'react'
import './index.css'
import FilterFooter from '../../../../../../components/FilterFooter'
export default function FilterMore({
  openKeyType,
  onCancel,
  onConfirm,
  titleStatus,
  setTitleStatus,
  selectedValue,
  setSelectedValue,
  defaultValue,
  data: { roomType, oriented, floor, characteristic }
}) {
  // 设置被点击的Tag的state
  const [moreTagsState, setMoreTagsState] = useState(defaultValue)
  // 点击tag时触发的函数
  const onTagsClick = (value) => {
    // console.log(value)
    // 创建新的被点击Tag的备份
    const newMoreTagsState = [...moreTagsState]
    // 判断tag是否被点击，如果被点击则加入，如果没有则移除
    if (moreTagsState.indexOf(value) === -1) {
      newMoreTagsState.push(value)
    } else {
      const index = moreTagsState.indexOf(value)
      newMoreTagsState.splice(index, 1)
    }
    // console.log(newMoreTagsState)
    setMoreTagsState([...newMoreTagsState])
  }
  const onTagsCancel = () => {
    // 清除tag的值
    setMoreTagsState(()=>[])
    // 清除selecedValue的值
    setSelectedValue((preValue)=>{
      return {
        ...preValue,
        [openKeyType]:[]
      }
    })
    // 取消筛选标签选中
    setTitleStatus((preValue)=>{
      return {
        ...preValue,
        [openKeyType]:false
      }
    })

  }
  const renderMoreData = (data) => {
    return data.map((item) => {
      const isSelected = moreTagsState.indexOf(item.value)
      // console.log(isSelected)
      return (
        <span
          key={item.value}
          onClick={() => {
            onTagsClick(item.value)
            // console.log(moreTagsState)
          }}
          className={isSelected === -1 ? '' : 'tagActive'}
        >
          {item.label}
        </span>
      )
    })
  }
  return (
    <div className="filtermore">
      <div className="moretags">
        <div className="dt">户型</div>
        <div className="dd">{renderMoreData(roomType)}</div>
        <div className="dt">朝向</div>
        <div className="dd">{renderMoreData(oriented)}</div>
        <div className="dt">楼层</div>
        <div className="dd">{renderMoreData(floor)}</div>
        <div className="dt">房屋亮点</div>
        <div className="dd">{renderMoreData(characteristic)}</div>
      </div>
      <div className="filterfooter">
        <FilterFooter
          onConfirm={() => {
            onConfirm(moreTagsState)
          }}
          onCancel={() => {
            onCancel()
            onTagsCancel()
          }}
        />
      </div>
    </div>
  )
}
