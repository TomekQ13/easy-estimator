import React from 'react'

export default function Modal({ modalContents }) {
  return (
    <div className="modal">
        <div className="modal-content">
            { modalContents }
        </div>
    </div>
  )
}
