import React, { useState, useEffect } from 'react'

const Tutorial = ({currentIndex}) => {
    console.log("Tutorial")
  return (
    <div className='absolute top-50 right-50 w-2/4'>
        {currentIndex == 0 && 
            <div className='flex '>
                Tālāk būs 3 testi. Katra testā sākumā aptuveni sekundi tiks rādīts "+" simbols, pēc tā ļoti ātri sāks mainīties burti.
                Brīdī, kad redzi burtu "T" pēc iespējas ātrāk spied pogu.
                Ja viss ir skaidrs, tad spied uz "Sākt testu"
            </div>
        }

        {(currentIndex == 1 || currentIndex == 2) && 
            <div className='flex '>
                Spied "Sākt testu", lai sāktu nākamo testu
            </div>
        }
    </div>
  )
}

export default Tutorial