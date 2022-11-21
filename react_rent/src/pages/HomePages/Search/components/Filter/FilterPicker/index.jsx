import React, { useState } from 'react'
import './index.css'
import FilterFooter from '../../../../../../components/FilterFooter'
import { CascadePickerView } from 'antd-mobile'
export default function FilterPicker({
  openKeyType,
  onCancel,
  onConfirm,
  data,
  selectedValue
}) {
  // 设置筛选条件
  const [filterValue,setFilterValue] = useState([])
  // 设置并筛选数据源
  let options = []
  switch (openKeyType) {
    case 'area':
      options = [data.area, data.subway]
      break
    case 'mode':
      options = [data.rentType][0]
      break
    case 'price':
      options = [data.price][0]
      break
    default:
      break
  }
  // console.log(options)
  return (
    <div className="root" style={{ marginTop: '86px' }}>
      <CascadePickerView
        key={openKeyType}
        options={options}
        defaultValue={selectedValue[openKeyType]}
        onChange={(val) => {
          // console.log(val)
          setFilterValue(val)
          // console.log(selectedValue)
        }}
      />
      <FilterFooter onCancel={onCancel} onConfirm={()=>{onConfirm(filterValue)}} />
    </div>
  )
}
