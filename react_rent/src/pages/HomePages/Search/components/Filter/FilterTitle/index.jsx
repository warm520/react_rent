import React from 'react'
import './index.css'
import { Grid } from 'antd-mobile'
export default function FilterTitle({
  titleStatus,
  onTitleClick,
  openKeyType
}) {
  const filterTitles = [
    { title: '区域', type: 'area' },
    { title: '方式', type: 'mode' },
    { title: '租金', type: 'price' },
    { title: '筛选', type: 'more' }
  ]
  // console.log(openKeyType)
  return (
    <div
      className="root"
      // id="filterTitle"
      style={{
        zIndex: (openKeyType === '' || openKeyType === 'more' )? '1' : '10000',
      }}
    >
      <Grid columns={filterTitles.length} gap={10} className="filterTitleGrid">
        {filterTitles.map((item) => {
          const isSelected = titleStatus
          // console.log(isSelected)
          return (
            <Grid.Item
              className={isSelected[item.type] ? 'selected' : ''}
              key={item.type}
              onClick={() => {
                onTitleClick(item.type)
              }}
            >
              <span>{item.title}</span>
              <i className="iconfont icon-arrow"></i>
            </Grid.Item>
          )
        })}
      </Grid>
    </div>
  )
}
