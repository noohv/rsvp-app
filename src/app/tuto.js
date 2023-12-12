import React, { useState, useEffect } from 'react'

const Tutorial = ({currentIndex}) => {
  return (
    <div className='absolute top-50 right-50 w-2/4'>
        {currentIndex == 0 && 
            <p className='text-justify'>
                Tālāk būs 3 testi. Katra testā sākumā aptuveni divas sekundes tiks rādīts '+' simbols, pēc tā ļoti ātri sāks mainīties burti.
                Brīdī, kad redzi burtu <b>'T'</b> pēc iespējas ātrāk nospied uz pogas <b>"Spied šeit"</b>.
                Ja viss ir skaidrs, tad spied uz <b>"Sākt testu"</b>.
            </p>
        }

        {(currentIndex == 1 || currentIndex == 2) && 
            <p className='text-justify'>
                Spied <b>"Sākt testu"</b>, lai sāktu nākamo testu.
            </p>
        }
    </div>
  )
}

export default Tutorial