import React, { useState, useEffect } from 'react'

const Tutorial = ({currentIndex}) => {
    console.log("Tutorial")
  return (
    <div className='absolute top-50 right-50 w-2/4'>
        {currentIndex == 0 && 
            <p className='text-justify'>
                Tālāk būs 3 testi. Katra testā sākumā aptuveni sekundi tiks rādīts "+" simbols, pēc tā ļoti ātri sāks mainīties burti.
                Brīdī, kad redzi burtu "T" pēc iespējas ātrāk spied pogu.
                Ja viss ir skaidrs, tad spied uz "Sākt testu"
            </p>
        }

        {(currentIndex == 1 || currentIndex == 2) && 
            <p className='text-justify'>
                Spied "Sākt testu", lai sāktu nākamo testu
            </p>
        }
    </div>
  )
}

export default Tutorial