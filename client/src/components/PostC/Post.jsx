import React from 'react'

const Post = () => {
  return (
    <div className='flex h-full w-full justify-center items-center'>
      <div className="Post Container relative h-40 w-40 rounded-xl bg-red-500">
          <div className="head relative flex items-center gap-4  h-8 w-full top-0 bg-green-300">
            <div className="dp relative h-6 w-6 rounded-full left-1 bg-black"></div>
            <div className="username">Pavan</div>
          </div>
          <div className="picture">asd</div>
          <div className="tail ">dasdw</div>
      </div>
    </div>
  )
}

export default Post