import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const Tutorial = ({ currentIndex, data }) => {
  const t = useTranslations("Index");

  return (
    <>
      <div className="flex flex-col align-center justify-center p-5 md:w-4/5 lg:w-3/5">
        {currentIndex == 0 && (
          <p className="text-justify">
            {t("tutorial")}
            <br></br>
            {t("tutorial2")}
            <b>{t("start-trial-text")}</b>.
          </p>
        )}
        {(currentIndex == 1 || currentIndex == 2) && (
          <>
            <p className="text-center">
              {t("trial-result")}
              {data.test1.result != null
                ? `${Math.round(data.test1.result)} ${t("ms")}`
                : t("no-input")}
            </p>
            <p className="text-center mt-5">
              <b>&quot;{t("start-test")}&quot;</b>
              {t("to-start")}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Tutorial;
