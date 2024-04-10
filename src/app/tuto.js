import React, { useState, useEffect } from "react";

const Tutorial = ({ currentIndex, data }) => {
  return (
    <>
      <div className="flex flex-col align-center justify-center p-5 md:w-4/5 lg:w-3/5">
        {currentIndex == 0 && (
          <p className="text-justify">
            Pirmais tests būs izmēģinājums un otrajā testā tiks fiksēts
            rezultāts. Testa sākumā divas sekundes tiks parādīts{" "}
            <b>&lsquo;+&rsquo;</b> simbols. Tad automātiski, ļoti ātrā tempā
            sāks mainīties burti. Mērķis ir pēc iespējas ātrāk nospiest pogu{" "}
            <b>&quot;Spied šeit&quot;</b> brīdī, kad redzi burtu{" "}
            <b>&lsquo;T&rsquo;</b>. Nospiežot pogu tests neapstāsies, tādēļ
            nespied to vairākas reizes, ja burts <b>&lsquo;T&rsquo;</b> vairāk
            neparādās. Kad visi burti būs parādīti, tests automātiski beigsies.
            <br></br>
            Ja visi ir nosacījumi ir skaidri un esi gatavs/-a, tad spied uz{" "}
            <b>&quot;Sākt izmēģinājuma testu&quot;</b>.
          </p>
        )}
        {(currentIndex == 1 || currentIndex == 2) && (
          <>
            <p className="text-center">
              Izmēģinājuma rezultāts:{" "}
              {data.test1.result != null
                ? `${Math.round(data.test1.result)} ms (milisekundes)`
                : "Nav fiksēts"}
            </p>
            <p className="text-center mt-5">
              Spied <b>&quot;Sākt testu&quot;</b>, lai sāktu testu.
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Tutorial;
