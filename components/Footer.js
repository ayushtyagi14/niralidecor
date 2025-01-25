import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#f4c7ffca] w-full py-8 flex flex-col lg:flex-row gap-10 lg:gap-0'>
      <div className='flex lg:flex-row flex-col items-center lg:w-[60%] w-[95%] gap-5 lg:gap-0 mx-auto justify-between'>
        <img
          src="https://www.maharaniweddings.com/images/Badges/MW_Badge_2013.png"
          alt="maharani wedding badge nirali decor"
          className='lg:w-[100px] lg:h-[100px] w-[80px] h-[80px]'
        />
        <h1 className='text-center text-[#96034f] lg:block hidden'>&copy; {new Date().getFullYear()} Nirali Decor. All Rights Reserved.</h1>
        <div className='flex flex-row gap-4 items-center'>
          <img
            src="https://cdn1.weddingwire.com/img/badges/2025/badge-weddingawards_en_US.png"
            alt="wedding wire nirali decor 2018 award"
            className='lg:w-[100px] lg:h-[100px] w-[80px] h-[80px]'

          />
          <img
            src="https://cdn1.weddingwire.com/img/badges/2023/badge-weddingawards_en_US.png"
            alt="wedding wire nirali decor 2018 award"
            className='lg:w-[100px] lg:h-[100px] w-[80px] h-[80px]'

          />
          <img
            src="https://cdn1.weddingwire.com/img/badges/2018/badge-weddingawards_en_US.png"
            alt="wedding wire nirali decor 2018 award"
            className='lg:w-[100px] lg:h-[100px] w-[80px] h-[80px]'

          />
        </div>
      </div>
      <h1 className='text-center text-[#96034f] lg:hidden block'>&copy; {new Date().getFullYear()} Nirali Decor. All Rights Reserved.</h1>
    </div>
  )
}

export default Footer
