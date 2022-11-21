import React from 'react'
import './index.css'
export default function FilterFooter({
  cancelText = '取消',
  confirmText = '确认',
  onCancel,
  onConfirm
}) {
  return (
    <div className="filterfoot">
      <span className={'btn cancel'} onClick={onCancel}>
        {cancelText}
      </span>
      <span className={'btn confirm'} onClick={onConfirm}>
        {confirmText}
      </span>
    </div>
  )
}
