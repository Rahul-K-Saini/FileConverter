import React from 'react'
import {LinkedinLogo,GithubLogo, XLogo} from '@phosphor-icons/react'
function Contact() {
  return (
    <div className='w-[90%] mx-auto'>
      <h2 className='text-4xl '>Contact:-</h2>
      <div className='mt-10 flex sm:justify-around flex-col sm:flex-row cursor-pointer gap-5 items-center'>
        <a target='_blank' href="https://www.linkedin.com/in/rahulksaini987/"><LinkedinLogo className='hover:text-blue-800' size={128}/></a>
        <a target='_blank' href='https://github.com/Rahul-K-Saini'><GithubLogo className='hover:text-blue-800' size={128}/></a>
        <a target='_blank' href='https://twitter.com/rahul_s_twts'><XLogo className='hover:text-blue-800' size={128}/></a>
      </div>
    </div>
  )
}

export default Contact