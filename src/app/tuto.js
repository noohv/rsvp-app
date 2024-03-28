import React, { useState, useEffect } from "react";

const Tutorial = ({ currentIndex }) => {
  return (
    <>
      {currentIndex == 0 && (
        <div className="absolute top-[10%] md:top-[30%] p-5 md:w-4/5 lg:w-3/5">
          <p className="text-justify">
            Tālāk būs 3 testi. Testa sākumā divas sekundes tiks parādīts{" "}
            <b>&lsquo;+&rsquo;</b> simbols. Tad automātiski, ļoti ātrā tempā
            sāks mainīties burti. Mērķis ir pēc iespējas ātrāk nospiest pogu{" "}
            <b>&quot;Spied šeit&quot;</b> brīdī, kad redzi burtu{" "}
            <b>&lsquo;T&rsquo;</b>. Nospiežot pogu tests neapstāsies, tādēļ
            nespied to vairākas reizes, ja burts <b>&lsquo;T&rsquo;</b> vairāk
            neparādās. Kad visi burti būs parādīti, tests automātiski beigsies.
            <br></br>
            Ja visi ir nosacījumi ir skaidri un esi gatavs/-a, tad spied uz{" "}
            <b>&quot;Sākt testu&quot;</b>.
          </p>
        </div>
      )}
      {(currentIndex == 1 || currentIndex == 2) && (
        <div className="absolute">
          <p className="text-justify">
            Spied <b>&quot;Sākt testu&quot;</b>, lai sāktu nākamo testu.
          </p>
        </div>
      )}
    </>
  );
};

export default Tutorial;
