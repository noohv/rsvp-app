import React from "react";
import { useTranslations } from "next-intl";

export default function Result({ data, order }) {
  const t = useTranslations("Index");

  const displayResults = order.map((number, index) => (
    <li key={index + 1}>
      {index + 1}. {t("test")}:{" "}
      {data[`test${number}`].result != null
        ? `${Math.round(data[`test${number}`].result)} ${t("ms")}`
        : t("no-result")}
    </li>
  ));

  return (
    <div className="m-5">
      {t("your-results")}
      <ul className="list-disc">{displayResults}</ul>
    </div>
  );
}
