import React, { useState, useEffect } from 'react'

const Tutorial = ({currentIndex}) => {
  return (
    <div className='absolute top-50 right-50 w-2/4'>
        {currentIndex == 0 && 
            <p className='text-justify'>
                Tālāk būs 3 testi. Katra testā sākumā aptuveni divas sekundes tiks rādīts <b>&lsquo;+&rsquo;</b> simbols, pēc tā ļoti ātri sāks mainīties burti.
                Brīdī, kad redzi burtu <b>&lsquo;T&rsquo;</b> pēc iespējas ātrāk nospied uz pogas <b>&quot;Spied šeit&quot;</b>.
                Ja viss ir skaidrs, tad spied uz <b>&quot;Sākt testu&quot;</b>.
            </p>
        }

        {(currentIndex == 1 || currentIndex == 2) && 
            <p className='text-justify'>
                Spied <b>&quot;Sākt testu&quot;</b>, lai sāktu nākamo testu.
            </p>
        }
    </div>
  )
}

export default Tutorial