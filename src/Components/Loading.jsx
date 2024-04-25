import React from 'react'
import './loading.scss'
export default function Loading() {
    return (
        <div className='flex justify-center items-center h-[100vh] flex-col'>
            <div className="loader"></div>
            <div>Loading ...</div>
        </div>
    )
}
