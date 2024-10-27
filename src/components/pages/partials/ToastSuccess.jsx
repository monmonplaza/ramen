import { CheckCircle, X } from 'lucide-react'
import React from 'react'

const ToastSuccess = () => {
  return (
    <div className='fixed top-5 left-1/2 -translate-x-1/2  bg-secondary max-w-[240px] w-full overflow-hidden rounded-md shadow-md border-success border'>
        <div className="flex items-center r">
            <div className='grid place-content-center bg-success basis-[34px] size-[34px]'>
                <CheckCircle size={18} className='text-white'/>
            </div>

            <p className='basis-[80%] p-2 mb-0'>Record Successfully Updated!</p>

            <button className='basis-[10%]'><X size={14}/></button>
        </div>

    </div>
  )
}

export default ToastSuccess