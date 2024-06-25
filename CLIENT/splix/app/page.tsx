import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <div className='text-3xl grid place-items-center h-screen'>
        <Link href='/groups'><button className='btn btn-info'>LOGIN</button></Link>
      </div>
    </>
  )
}

export default page
