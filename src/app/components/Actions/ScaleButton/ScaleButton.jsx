import React from 'react'
import { useRef } from 'react'
import WenPlusIcon from '../../../assets/images/wen-plus-icon.svg'
import WenMinusIcon from '../../../assets/images/wen-minus-icon.svg'

export default function ScaleButton({handleScale, isScaled}) {
  
  const WenMinusRef = useRef()
  const WenPlusRef = useRef()

  const handleChangeWen = () => {
    handleScale()
    if (isScaled) {
      WenMinusRef.current.style.display = "block"
      WenPlusRef.current.style.display = "none"
    }
    else {
      WenMinusRef.current.style.display = "none"
      WenPlusRef.current.style.display = "block"
    }

  }

  return (
    <>
      <div className='scale-button' onClick={handleChangeWen}>
        <img ref={WenMinusRef} src={WenMinusIcon} className='scale-button-image-minus' alt="" />
        <img ref={WenPlusRef} src={WenPlusIcon} className='scale-button-image-plus' alt="" />
      </div>
     </>
  )
}
